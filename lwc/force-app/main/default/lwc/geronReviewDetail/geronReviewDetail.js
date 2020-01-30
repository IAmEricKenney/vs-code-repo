import { LightningElement, api } from "lwc";
import APP from "@salesforce/schema/Application_Review__c.Application__c";
import WORK_EXP_SCORE from "@salesforce/schema/Application_Review__c.GR_Work_Experience_Score__c";
import WORK_EXP_NOTE from "@salesforce/schema/Application_Review__c.GR_Work_Experience_Notes__c";
import SPEC_TRACK_SCORE from "@salesforce/schema/Application_Review__c.GR_Specialty_Track_Experience_Score__c";
import SPEC_TRACK_NOTE from "@salesforce/schema/Application_Review__c.GR_Specialty_Track_Experience_Notes__c";
import LEADER_SCORE from "@salesforce/schema/Application_Review__c.GR_Leadership__c";
import LEADER_NOTE from "@salesforce/schema/Application_Review__c.GR_Leadership_Notes__c";
import LOR_1 from "@salesforce/schema/Application_Review__c.GR_LOR_1_Letter_Strength__c";
import LOR_2 from "@salesforce/schema/Application_Review__c.GR_LOR_2_Letter_Strength__c";
import LOR_3 from "@salesforce/schema/Application_Review__c.GR_LOR_3_Letter_Strength__c";
import REC_NOTE from "@salesforce/schema/Application_Review__c.GR_Recommendation_Notes__c";
import INTERVIEW from "@salesforce/schema/Application_Review__c.GR_Interview_Invite__c";
import OVR_IMP from "@salesforce/schema/Application_Review__c.Overall_Impression__c";
import REV_STAT from "@salesforce/schema/Application_Review__c.Review_Status__c";
import COMB_SCORE from "@salesforce/schema/Application_Review__c.GR_Combined_Score__c";
import REV_NAME from "@salesforce/schema/Application_Review__c.Reviewer_Name__c";

export default class GeronReviewDetail extends LightningElement {
  @api recordId;

  rev = [APP, REV_STAT, COMB_SCORE, REV_NAME];
  wrkexp = [WORK_EXP_SCORE, WORK_EXP_NOTE];
  spctrk = [SPEC_TRACK_SCORE, SPEC_TRACK_NOTE];
  ldrshp = [LEADER_SCORE, LEADER_NOTE];
  recs = [LOR_1, LOR_2, LOR_3, REC_NOTE];
  intv = [INTERVIEW, OVR_IMP];
}