module {
  public type ContactId = Nat;
  public type Timestamp = Int;

  public type ServiceInterest = {
    #dataExtraction;
    #dataEngineering;
    #aiAnalytics;
    #other;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    projectDescription : Text;
    serviceInterest : ServiceInterest;
    submittedAt : Timestamp;
  };

  public type SubmitContactInput = {
    name : Text;
    email : Text;
    projectDescription : Text;
    serviceInterest : ServiceInterest;
  };

  public type SubmitContactResult = {
    #ok : ContactId;
    #err : Text;
  };
};
