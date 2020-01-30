import { LightningElement, api } from "lwc";
import APP from "@salesforce/schema/Application_Review__c.Application__c";
import WORK_EXP_SCORE from "@salesforce/schema/Application_Review__c.GR_Work_Experience_Score__c";
import LIFE_LEARN from "@salesforce/schema/Application_Review__c.GR_Lifelong_Learning__c";
import KNOW_ROLE from "@salesforce/schema/Application_Review__c.GR_Understands_NP_Role__c";
import STMT_FIT from "@salesforce/schema/Application_Review__c.GR_Statement_of_Fit__c";
import LEADER_SCORE from "@salesforce/schema/Application_Review__c.GR_Leadership__c";
import CAREER_GOALS from "@salesforce/schema/Application_Review__c.GR_Career_goals_align__c";
import LOR_1 from "@salesforce/schema/Application_Review__c.GR_LOR_1_Evaluation_Profile__c";
import LOR_2 from "@salesforce/schema/Application_Review__c.GR_LOR_2_Evaluation_Profile__c";
import LOR_3 from "@salesforce/schema/Application_Review__c.GR_LOR_3_Evaluation_Profile__c";
import COMMIT_PROF from "@salesforce/schema/Application_Review__c.GR_Commitment_to_furthering_the_profess__c";
import OVR_IMP from "@salesforce/schema/Application_Review__c.Overall_Impression__c";
import REV_STAT from "@salesforce/schema/Application_Review__c.Review_Status__c";
import COMB_SCORE from "@salesforce/schema/Application_Review__c.GR_Combined_Score__c";
import REV_NAME from "@salesforce/schema/Application_Review__c.Reviewer_Name__c";

export default class NursEducationReviewDetail extends LightningElement {
  @api recordId;
  
  rev = [APP, REV_STAT, COMB_SCORE, REV_NAME];
  wrkexp = [WORK_EXP_SCORE];
  lifelrn = [LIFE_LEARN];
  ldrshp = [LEADER_SCORE];
  knwrl = [KNOW_ROLE];
  stmfit = [STMT_FIT];
  crgls = [CAREER_GOALS];
  cmtprof = [COMMIT_PROF];
  recs = [LOR_1, LOR_2, LOR_3];
  imp = [OVR_IMP];
}