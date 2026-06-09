import Types "../types/contact";
import ContactLib "../lib/contact";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  submissions : List.List<Types.ContactSubmission>,
  accessControlState : AccessControl.AccessControlState,
) {
  /// Public — submits a contact form and stores it in canister state.
  public shared func submitContactForm(input : Types.SubmitContactInput) : async Types.SubmitContactResult {
    let (id, _) = ContactLib.submitContact(submissions, input);
    #ok(id);
  };

  /// Admin-only — returns all stored contact submissions.
  public shared query ({ caller }) func getContactSubmissions() : async [Types.ContactSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return [];
    };
    ContactLib.getAllSubmissions(submissions);
  };
};
