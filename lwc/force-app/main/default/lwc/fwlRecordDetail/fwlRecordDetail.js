import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

const fields = [
  "Faculty_Workload__c.Teaching_Summer__c",
  "Faculty_Workload__c.Teaching_Fall__c",
  "Faculty_Workload__c.Teaching_Spring__c",
  "Faculty_Workload__c.Teaching_Total_FTE__c",
  "Faculty_Workload__c.Dissertation_Chair_Summer__c",
  "Faculty_Workload__c.Dissertation_Chair_Fall__c",
  "Faculty_Workload__c.Dissertation_Chair_Spring__c",
  "Faculty_Workload__c.Dissertation_Chair_Total_FTE__c",
  "Faculty_Workload__c.Thesis_Chair_Summer__c",
  "Faculty_Workload__c.Thesis_Chair_Fall__c",
  "Faculty_Workload__c.Thesis_Chair_Spring__c",
  "Faculty_Workload__c.Thesis_Chair_Total_FTE__c",
  "Faculty_Workload__c.Other_Summer__c",
  "Faculty_Workload__c.Other_Fall__c",
  "Faculty_Workload__c.Other_Spring__c",
  "Faculty_Workload__c.Other_Semester_Total_FTE__c",
  "Faculty_Workload__c.Administration_Total__c",
  "Faculty_Workload__c.Course_Development_Total__c",
  "Faculty_Workload__c.Faculty_Fellowship_Total__c",
  "Faculty_Workload__c.Grant_Funded_Effort_Total__c",
  "Faculty_Workload__c.Practice_total__c",
  "Faculty_Workload__c.Practice_Funded_Administration__c",
  "Faculty_Workload__c.State_Funded_Scholarship__c",
  "Faculty_Workload__c.Service_Total__c",
  "Faculty_Workload__c.Simulation_total__c"
];

export default class FwlRecordDetail extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: "$recordId", fields })
  fwl;

  get Teaching_Summer() {
    return this.fwl.data.fields.Teaching_Summer__c.value;
  }
  get Teaching_Fall() {
    return this.fwl.data.fields.Teaching_Fall__c.value;
  }
  get Teaching_Spring() {
    return this.fwl.data.fields.Teaching_Spring__c.value;
  }
  get Teaching_Total_FTE() {
    return this.fwl.data.fields.Teaching_Total_FTE__c.value;
  }
  get Dissertation_Chair_Summer() {
    return this.fwl.data.fields.Dissertation_Chair_Summer__c.value;
  }
  get Dissertation_Chair_Fall() {
    return this.fwl.data.fields.Dissertation_Chair_Fall__c.value;
  }
  get Dissertation_Chair_Spring() {
    return this.fwl.data.fields.Dissertation_Chair_Spring__c.value;
  }
  get Dissertation_Chair_Total_FTE() {
    return this.fwl.data.fields.Dissertation_Chair_Total_FTE__c.value;
  }
  get Thesis_Chair_Summer() {
    return this.fwl.data.fields.Thesis_Chair_Summer__c.value;
  }
  get Thesis_Chair_Fall() {
    return this.fwl.data.fields.Thesis_Chair_Fall__c.value;
  }
  get Thesis_Chair_Spring() {
    return this.fwl.data.fields.Thesis_Chair_Spring__c.value;
  }
  get Thesis_Chair_Total_FTE() {
    return this.fwl.data.fields.Thesis_Chair_Total_FTE__c.value;
  }
  get Other_Summer() {
    return this.fwl.data.fields.Other_Summer__c.value;
  }
  get Other_Fall() {
    return this.fwl.data.fields.Other_Fall__c.value;
  }
  get Other_Spring() {
    return this.fwl.data.fields.Other_Spring__c.value;
  }
  get Other_Semester_Total_FTE() {
    return this.fwl.data.fields.Other_Semester_Total_FTE__c.value;
  }
  get Administration_Total() {
    return this.fwl.data.fields.Administration_Total__c.value;
  }
  get Course_Development_Total() {
    return this.fwl.data.fields.Course_Development_Total__c.value;
  }
  get Faculty_Fellowship_Total() {
    return this.fwl.data.fields.Faculty_Fellowship_Total__c.value;
  }
  get Grant_Funded_Effort_Total() {
    return this.fwl.data.fields.Grant_Funded_Effort_Total__c.value;
  }
  get Practice_total() {
    return this.fwl.data.fields.Practice_total__c.value;
  }
  get Practice_Funded_Administration() {
    return this.fwl.data.fields.Practice_Funded_Administration__c.value;
  }
  get State_Funded_Scholarship() {
    return this.fwl.data.fields.State_Funded_Scholarship__c.value;
  }
  get Service_Total() {
    return this.fwl.data.fields.Service_Total__c.value;
  }
  get Simulation_total() {
    return this.fwl.data.fields.Simulation_total__c.value;
  }
}
