import List "mo:core/List";
import ContactTypes "types/contact";
import CaseStudyTypes "types/caseStudy";
import ContactMixin "mixins/contact-api";
import CaseStudyMixin "mixins/case-study-api";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import CaseStudyLib "lib/caseStudy";
import Time "mo:core/Time";



actor Main {
  let contactSubmissions = List.empty<ContactTypes.ContactSubmission>();

  let caseStudies = List.empty<CaseStudyTypes.CaseStudy>();
  var nextCaseStudyId : Nat = 0;
  let nextCaseStudyIdRef = { var value = nextCaseStudyId };

  let accessControlState = AccessControl.initState();

  // Seed initial case studies on first deployment
  CaseStudyLib.seedIfEmpty(caseStudies, nextCaseStudyIdRef, Time.now());
  nextCaseStudyId := nextCaseStudyIdRef.value;

  include ContactMixin(contactSubmissions, accessControlState);
  include CaseStudyMixin(caseStudies, nextCaseStudyIdRef, accessControlState);
  include MixinAuthorization(accessControlState);
};
