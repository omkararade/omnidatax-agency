module {
  public type CaseStudyId = Nat;
  public type Timestamp = Int;

  public type CaseStudyResult = {
    metric : Text;
    description : Text;
  };

  public type CaseStudy = {
    id : CaseStudyId;
    title : Text;
    clientType : Text;
    industry : Text;
    keyMetric : Text;
    keyMetricLabel : Text;
    problem : Text;
    approach : Text;
    tools : [Text];
    results : [CaseStudyResult];
    iconName : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type CreateCaseStudyInput = {
    title : Text;
    clientType : Text;
    industry : Text;
    keyMetric : Text;
    keyMetricLabel : Text;
    problem : Text;
    approach : Text;
    tools : [Text];
    results : [CaseStudyResult];
    iconName : Text;
  };

  public type UpdateCaseStudyInput = {
    title : Text;
    clientType : Text;
    industry : Text;
    keyMetric : Text;
    keyMetricLabel : Text;
    problem : Text;
    approach : Text;
    tools : [Text];
    results : [CaseStudyResult];
    iconName : Text;
  };

  public type CreateCaseStudyResult = {
    #ok : CaseStudyId;
    #err : Text;
  };

  public type UpdateCaseStudyResult = {
    #ok : CaseStudy;
    #err : Text;
  };
};
