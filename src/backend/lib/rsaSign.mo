/// RSA PKCS#1 v1.5 SHA-256 signing for Google OAuth2 JWT authentication.
/// Uses the ASN.1, sha2, base-x-encoder, and xtended-numbers packages.
import ASN1 "mo:asn1@3";
import Sha256 "mo:sha2@0/Sha256";
import BaseX "mo:base-x-encoder@2";
import NatX "mo:xtended-numbers@2/NatX";
import Iter "mo:core@1/Iter";
import Array "mo:core@1/Array";
import Text "mo:core@1/Text";
import Nat "mo:core@1/Nat";
import Nat8 "mo:core@1/Nat8";
import Result "mo:core@1/Result";
import Int "mo:core@1/Int";

module {

  /// Extracts RSA private key (n, d) from a PKCS#8 PEM string.
  /// Returns (modulus, privateExponent) as Nat values.
  public func parsePrivateKey(pem : Text) : Result.Result<(Nat, Nat), Text> {
    // Strip PEM header/footer and newlines
    let header = "-----BEGIN PRIVATE KEY-----";
    let footer = "-----END PRIVATE KEY-----";
    let stripped = switch (Text.stripStart(pem, #text(header))) {
      case (null) return #err("Missing PEM header");
      case (?s) s;
    };
    let stripped2 = switch (Text.stripEnd(stripped, #text(footer))) {
      case (null) switch (Text.stripEnd(stripped, #text(footer # "\n"))) {
        case (null) stripped;
        case (?s) s;
      };
      case (?s) s;
    };
    // Remove all whitespace/newlines
    let b64 = Text.join("", Text.tokens(stripped2, #predicate(func(c) { c == '\n' or c == '\r' or c == ' ' })));
    // Decode base64
    let derBytes = switch (BaseX.fromBase64(b64)) {
      case (#err(e)) return #err("Base64 decode failed: " # e);
      case (#ok(bytes)) bytes;
    };
    // Parse PKCS#8 DER: SEQUENCE { SEQUENCE { OID, NULL }, OCTET_STRING { pkcs1 } }
    let asn1 = switch (ASN1.fromBytes(derBytes.vals(), #der)) {
      case (#err(e)) return #err("ASN1 parse failed: " # e);
      case (#ok(v)) v;
    };
    let #sequence(outer) = asn1 else return #err("Expected outer SEQUENCE");
    if (outer.size() < 2) return #err("PKCS8 outer SEQUENCE too short");
    // outer[0] = AlgorithmIdentifier SEQUENCE
    // outer[1] = OCTET STRING containing the inner PKCS#1 private key
    let #octetString(innerBytes) = outer[1] else return #err("Expected OCTET STRING for private key");
    // Parse inner PKCS#1 RSAPrivateKey:
    // SEQUENCE { version, n, e, d, p, q, dp, dq, qInv }
    let innerAsn1 = switch (ASN1.fromBytes(innerBytes.vals(), #der)) {
      case (#err(e)) return #err("Inner ASN1 parse failed: " # e);
      case (#ok(v)) v;
    };
    let #sequence(inner) = innerAsn1 else return #err("Expected inner SEQUENCE for RSA key");
    if (inner.size() < 4) return #err("RSA key SEQUENCE too short");
    // inner[1] = modulus n, inner[3] = private exponent d
    let #integer(nInt) = inner[1] else return #err("Expected INTEGER for modulus");
    let #integer(dInt) = inner[3] else return #err("Expected INTEGER for private exponent");
    #ok((Int.abs(nInt), Int.abs(dInt)));
  };

  /// Computes modular exponentiation: base^exp mod modulus (square-and-multiply).
  public func modExp(base : Nat, exp : Nat, modulus : Nat) : Nat {
    var result : Nat = 1;
    var b : Nat = base % modulus;
    var e : Nat = exp;
    while (e > 0) {
      if (e % 2 == 1) {
        result := (result * b) % modulus;
      };
      e := e / 2;
      b := (b * b) % modulus;
    };
    result;
  };

  /// Encodes a SHA-256 hash with PKCS#1 v1.5 DigestInfo prefix.
  /// Returns the full DER-encoded DigestInfo [Nat8].
  let sha256DigestInfoPrefix : [Nat8] = [
    0x30, 0x31, 0x30, 0x0D, 0x06, 0x09,
    0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x01,
    0x05, 0x00, 0x04, 0x20,
  ];

  /// Applies PKCS#1 v1.5 padding to a DigestInfo-encoded hash for an `emLen`-byte modulus.
  /// EM = 0x00 || 0x01 || PS (0xFF...) || 0x00 || DigestInfo
  public func pkcs1Pad(digestInfo : [Nat8], emLen : Nat) : Result.Result<[Nat8], Text> {
    let tLen = digestInfo.size();
    if (emLen < tLen + 11) return #err("Key modulus too small for PKCS#1 v1.5 padding");
    let psLen = emLen - tLen - 3;
    let em = Array.tabulate<Nat8>(emLen, func(i) {
      if (i == 0) 0x00
      else if (i == 1) 0x01
      else if (i < 2 + psLen) 0xFF
      else if (i == 2 + psLen) 0x00
      else digestInfo[i - (3 + psLen)];
    });
    #ok(em);
  };

  /// Signs a message (as bytes iterator) using RSA PKCS#1 v1.5 SHA-256.
  /// Returns the signature as a [Nat8] array.
  public func sign(msgBytes : Iter.Iter<Nat8>, n : Nat, d : Nat) : Result.Result<[Nat8], Text> {
    // SHA-256 hash
    let hashBlob = Sha256.fromIter(#sha256, msgBytes);
    let hash = Array.fromIter(hashBlob.vals());
    // Build DigestInfo = sha256DigestInfoPrefix || hash
    let digestInfo = Array.concat(sha256DigestInfoPrefix, hash);
    // Compute emLen = ceil(bitLen(n) / 8)
    let nBytes = NatX.toNatBytes(n, #msb);
    let emLen = nBytes.size();
    // Apply PKCS#1 v1.5 padding
    let em = switch (pkcs1Pad(digestInfo, emLen)) {
      case (#err(e)) return #err(e);
      case (#ok(v)) v;
    };
    // Convert EM to Nat
    let ?emNat = NatX.fromNatBytes(em.vals(), #msb) else return #err("Failed to convert EM to Nat");
    // Compute signature = em^d mod n
    let sigNat = modExp(emNat, d, n);
    // Convert to fixed-size bytes (same length as modulus)
    var sigBytes = NatX.toNatBytes(sigNat, #msb);
    // Pad with leading zeros if shorter than emLen
    if (sigBytes.size() < emLen) {
      let padding = Array.tabulate<Nat8>(emLen - sigBytes.size(), func(_) { 0x00 });
      sigBytes := Array.concat(padding, sigBytes);
    };
    #ok(sigBytes);
  };

  /// Signs a Text message and returns base64url-encoded signature (no padding).
  public func signBase64Url(msg : Text, n : Nat, d : Nat) : Result.Result<Text, Text> {
    let msgIter = msg.encodeUtf8().vals();
    switch (sign(msgIter, n, d)) {
      case (#err(e)) #err(e);
      case (#ok(sigBytes)) {
        let b64 = BaseX.toBase64(sigBytes.vals(), #url({ includePadding = false }));
        #ok(b64);
      };
    };
  };
};
