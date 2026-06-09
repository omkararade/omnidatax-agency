import Types "../types/contact";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  /// Stores a new contact submission. Returns (new id, submission).
  public func submitContact(
    submissions : List.List<Types.ContactSubmission>,
    input : Types.SubmitContactInput,
  ) : (Types.ContactId, Types.ContactSubmission) {
    let idNat = submissions.size();
    let submission : Types.ContactSubmission = {
      id = idNat;
      name = input.name;
      email = input.email;
      projectDescription = input.projectDescription;
      serviceInterest = input.serviceInterest;
      submittedAt = Time.now();
    };
    submissions.add(submission);
    (idNat, submission);
  };

  /// Returns all contact submissions as an immutable array.
  public func getAllSubmissions(
    submissions : List.List<Types.ContactSubmission>
  ) : [Types.ContactSubmission] {
    submissions.toArray();
  };

  public func serviceInterestToText(si : Types.ServiceInterest) : Text {
    switch (si) {
      case (#dataExtraction) "Data Extraction";
      case (#dataEngineering) "Data Engineering";
      case (#aiAnalytics) "AI Automations and Agents";
      case (#other) "Other";
    };
  };
};
