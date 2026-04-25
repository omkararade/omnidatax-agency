import Types "../types/caseStudy";
import CaseStudyLib "../lib/caseStudy";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import Time "mo:core/Time";

mixin (
  caseStudies : List.List<Types.CaseStudy>,
  nextCaseStudyId : { var value : Nat },
  accessControlState : AccessControl.AccessControlState,
) {
  /// Public query — returns all case studies.
  public query func getAllCaseStudies() : async [Types.CaseStudy] {
    CaseStudyLib.getAllCaseStudies(caseStudies);
  };

  /// Public query — returns a single case study by id.
  public query func getCaseStudyById(id : Types.CaseStudyId) : async ?Types.CaseStudy {
    CaseStudyLib.getCaseStudyById(caseStudies, id);
  };

  /// Admin update — creates a new case study.
  public shared ({ caller }) func createCaseStudy(
    input : Types.CreateCaseStudyInput
  ) : async Types.CreateCaseStudyResult {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: admin access required");
    };
    let now = Time.now();
    let (newId, _) = CaseStudyLib.addCaseStudy(caseStudies, nextCaseStudyId.value, input, now);
    nextCaseStudyId.value += 1;
    #ok(newId);
  };

  /// Admin update — updates an existing case study by id.
  public shared ({ caller }) func updateCaseStudy(
    id : Types.CaseStudyId,
    input : Types.UpdateCaseStudyInput,
  ) : async Types.UpdateCaseStudyResult {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: admin access required");
    };
    let now = Time.now();
    CaseStudyLib.updateCaseStudy(caseStudies, id, input, now);
  };

  /// Admin update — deletes a case study by id. Returns true if deleted.
  public shared ({ caller }) func deleteCaseStudy(
    id : Types.CaseStudyId
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return false;
    };
    CaseStudyLib.deleteCaseStudy(caseStudies, id);
  };
};
