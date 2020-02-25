import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

const fields = [
  "Faculty_Workload__c.Admin_01_January__c",
  "Faculty_Workload__c.Admin_02_February__c",
  "Faculty_Workload__c.Admin_03_March__c",
  "Faculty_Workload__c.Admin_04_April__c",
  "Faculty_Workload__c.Admin_05_May__c",
  "Faculty_Workload__c.Admin_06_June__c",
  "Faculty_Workload__c.Admin_07_July__c",
  "Faculty_Workload__c.Admin_08_August__c",
  "Faculty_Workload__c.Admin_09_September__c",
  "Faculty_Workload__c.Admin_10_October__c",
  "Faculty_Workload__c.Admin_11_November__c",
  "Faculty_Workload__c.Admin_12_December__c",
  "Faculty_Workload__c.Admin_Total_FTE__c",
  "Faculty_Workload__c.Course_Dev_01_January__c",
  "Faculty_Workload__c.Course_Dev_02_February__c",
  "Faculty_Workload__c.Course_Dev_03_March__c",
  "Faculty_Workload__c.Course_Dev_04_April__c",
  "Faculty_Workload__c.Course_Dev_05_May__c",
  "Faculty_Workload__c.Course_Dev_06_June__c",
  "Faculty_Workload__c.Course_Dev_07_July__c",
  "Faculty_Workload__c.Course_Dev_08_August__c",
  "Faculty_Workload__c.Course_Dev_09_September__c",
  "Faculty_Workload__c.Course_Dev_10_October__c",
  "Faculty_Workload__c.Course_Dev_11_November__c",
  "Faculty_Workload__c.Course_Dev_12_December__c",
  "Faculty_Workload__c.Course_Dev_Total_FTE__c",
  "Faculty_Workload__c.Dissertation_Chair_Fall__c",
  "Faculty_Workload__c.Dissertation_Chair_Spring__c",
  "Faculty_Workload__c.Dissertation_Chair_Summer__c",
  "Faculty_Workload__c.Dissertation_Chair_Total_FTE__c",
  "Faculty_Workload__c.Fellowship_01_January__c",
  "Faculty_Workload__c.Fellowship_02_February__c",
  "Faculty_Workload__c.Fellowship_03_March__c",
  "Faculty_Workload__c.Fellowship_04_April__c",
  "Faculty_Workload__c.Fellowship_05_May__c",
  "Faculty_Workload__c.Fellowship_06_June__c",
  "Faculty_Workload__c.Fellowship_07_July__c",
  "Faculty_Workload__c.Fellowship_08_August__c",
  "Faculty_Workload__c.Fellowship_09_September__c",
  "Faculty_Workload__c.Fellowship_10_October__c",
  "Faculty_Workload__c.Fellowship_11_November__c",
  "Faculty_Workload__c.Fellowship_12_December__c",
  "Faculty_Workload__c.Fellowship_Total_FTE__c",
  "Faculty_Workload__c.Grant_01_January__c",
  "Faculty_Workload__c.Grant_02_February__c",
  "Faculty_Workload__c.Grant_03_March__c",
  "Faculty_Workload__c.Grant_04_April__c",
  "Faculty_Workload__c.Grant_05_May__c",
  "Faculty_Workload__c.Grant_06_June__c",
  "Faculty_Workload__c.Grant_07_July__c",
  "Faculty_Workload__c.Grant_08_August__c",
  "Faculty_Workload__c.Grant_09_September__c",
  "Faculty_Workload__c.Grant_10_October__c",
  "Faculty_Workload__c.Grant_11_November__c",
  "Faculty_Workload__c.Grant_12_December__c",
  "Faculty_Workload__c.Grant_Total_FTE__c",
  "Faculty_Workload__c.Other_01_January__c",
  "Faculty_Workload__c.Other_02_February__c",
  "Faculty_Workload__c.Other_03_March__c",
  "Faculty_Workload__c.Other_04_April__c",
  "Faculty_Workload__c.Other_05_May__c",
  "Faculty_Workload__c.Other_06_June__c",
  "Faculty_Workload__c.Other_07_July__c",
  "Faculty_Workload__c.Other_08_August__c",
  "Faculty_Workload__c.Other_09_September__c",
  "Faculty_Workload__c.Other_10_October__c",
  "Faculty_Workload__c.Other_11_November__c",
  "Faculty_Workload__c.Other_12_December__c",
  "Faculty_Workload__c.Other_Fall__c",
  "Faculty_Workload__c.Other_Monthly_Total_FTE__c",
  "Faculty_Workload__c.Other_Semester_Total_FTE__c",
  "Faculty_Workload__c.Other_Spring__c",
  "Faculty_Workload__c.Other_Summer__c",
  "Faculty_Workload__c.Practice_01_January__c",
  "Faculty_Workload__c.Practice_02_February__c",
  "Faculty_Workload__c.Practice_03_March__c",
  "Faculty_Workload__c.Practice_04_April__c",
  "Faculty_Workload__c.Practice_05_May__c",
  "Faculty_Workload__c.Practice_06_June__c",
  "Faculty_Workload__c.Practice_07_July__c",
  "Faculty_Workload__c.Practice_08_August__c",
  "Faculty_Workload__c.Practice_09_September__c",
  "Faculty_Workload__c.Practice_10_October__c",
  "Faculty_Workload__c.Practice_11_November__c",
  "Faculty_Workload__c.Practice_12_December__c",
  "Faculty_Workload__c.Practice_Admin_01_January__c",
  "Faculty_Workload__c.Practice_Admin_02_February__c",
  "Faculty_Workload__c.Practice_Admin_03_March__c",
  "Faculty_Workload__c.Practice_Admin_04_April__c",
  "Faculty_Workload__c.Practice_Admin_05_May__c",
  "Faculty_Workload__c.Practice_Admin_06_June__c",
  "Faculty_Workload__c.Practice_Admin_07_July__c",
  "Faculty_Workload__c.Practice_Admin_08_August__c",
  "Faculty_Workload__c.Practice_Admin_09_September__c",
  "Faculty_Workload__c.Practice_Admin_10_October__c",
  "Faculty_Workload__c.Practice_Admin_11_November__c",
  "Faculty_Workload__c.Practice_Admin_12_December__c",
  "Faculty_Workload__c.Practice_Admin_Total_FTE__c",
  "Faculty_Workload__c.Practice_Total_FTE__c",
  "Faculty_Workload__c.Scholarship_01_January__c",
  "Faculty_Workload__c.Scholarship_02_February__c",
  "Faculty_Workload__c.Scholarship_03_March__c",
  "Faculty_Workload__c.Scholarship_04_April__c",
  "Faculty_Workload__c.Scholarship_05_May__c",
  "Faculty_Workload__c.Scholarship_06_June__c",
  "Faculty_Workload__c.Scholarship_07_July__c",
  "Faculty_Workload__c.Scholarship_08_August__c",
  "Faculty_Workload__c.Scholarship_09_September__c",
  "Faculty_Workload__c.Scholarship_10_October__c",
  "Faculty_Workload__c.Scholarship_11_November__c",
  "Faculty_Workload__c.Scholarship_12_December__c",
  "Faculty_Workload__c.Scholarship_Total_FTE__c",
  "Faculty_Workload__c.Service_01_January__c",
  "Faculty_Workload__c.Service_02_February__c",
  "Faculty_Workload__c.Service_03_March__c",
  "Faculty_Workload__c.Service_04_April__c",
  "Faculty_Workload__c.Service_05_May__c",
  "Faculty_Workload__c.Service_06_June__c",
  "Faculty_Workload__c.Service_07_July__c",
  "Faculty_Workload__c.Service_08_August__c",
  "Faculty_Workload__c.Service_09_September__c",
  "Faculty_Workload__c.Service_10_October__c",
  "Faculty_Workload__c.Service_11_November__c",
  "Faculty_Workload__c.Service_12_December__c",
  "Faculty_Workload__c.Service_Total_FTE__c",
  "Faculty_Workload__c.Sim_01_January__c",
  "Faculty_Workload__c.Sim_02_February__c",
  "Faculty_Workload__c.Sim_03_March__c",
  "Faculty_Workload__c.Sim_04_April__c",
  "Faculty_Workload__c.Sim_05_May__c",
  "Faculty_Workload__c.Sim_06_June__c",
  "Faculty_Workload__c.Sim_07_July__c",
  "Faculty_Workload__c.Sim_08_August__c",
  "Faculty_Workload__c.Sim_09_September__c",
  "Faculty_Workload__c.Sim_10_October__c",
  "Faculty_Workload__c.Sim_11_November__c",
  "Faculty_Workload__c.Sim_12_December__c",
  "Faculty_Workload__c.Sim_Total_FTE__c",
  "Faculty_Workload__c.Teaching_Fall__c",
  "Faculty_Workload__c.Teaching_Spring__c",
  "Faculty_Workload__c.Teaching_Summer__c",
  "Faculty_Workload__c.Teaching_Total_FTE__c",
  "Faculty_Workload__c.Thesis_Chair_Fall__c",
  "Faculty_Workload__c.Thesis_Chair_Spring__c",
  "Faculty_Workload__c.Thesis_Chair_Summer__c",
  "Faculty_Workload__c.Thesis_Chair_Total_FTE__c"
];

export default class FwlRecordDetail extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: "$recordId", fields })
  fwl;

  get Admin_01_January() {
    return this.fwl.data.fields.Admin_01_January__c.value;
  }
  get Admin_02_February() {
    return this.fwl.data.fields.Admin_02_February__c.value;
  }
  get Admin_03_March() {
    return this.fwl.data.fields.Admin_03_March__c.value;
  }
  get Admin_04_April() {
    return this.fwl.data.fields.Admin_04_April__c.value;
  }
  get Admin_05_May() {
    return this.fwl.data.fields.Admin_05_May__c.value;
  }
  get Admin_06_June() {
    return this.fwl.data.fields.Admin_06_June__c.value;
  }
  get Admin_07_July() {
    return this.fwl.data.fields.Admin_07_July__c.value;
  }
  get Admin_08_August() {
    return this.fwl.data.fields.Admin_08_August__c.value;
  }
  get Admin_09_September() {
    return this.fwl.data.fields.Admin_09_September__c.value;
  }
  get Admin_10_October() {
    return this.fwl.data.fields.Admin_10_October__c.value;
  }
  get Admin_11_November() {
    return this.fwl.data.fields.Admin_11_November__c.value;
  }
  get Admin_12_December() {
    return this.fwl.data.fields.Admin_12_December__c.value;
  }
  get Admin_Total_FTE() {
    return this.fwl.data.fields.Admin_Total_FTE__c.value;
  }
  get Course_Dev_01_January() {
    return this.fwl.data.fields.Course_Dev_01_January__c.value;
  }
  get Course_Dev_02_February() {
    return this.fwl.data.fields.Course_Dev_02_February__c.value;
  }
  get Course_Dev_03_March() {
    return this.fwl.data.fields.Course_Dev_03_March__c.value;
  }
  get Course_Dev_04_April() {
    return this.fwl.data.fields.Course_Dev_04_April__c.value;
  }
  get Course_Dev_05_May() {
    return this.fwl.data.fields.Course_Dev_05_May__c.value;
  }
  get Course_Dev_06_June() {
    return this.fwl.data.fields.Course_Dev_06_June__c.value;
  }
  get Course_Dev_07_July() {
    return this.fwl.data.fields.Course_Dev_07_July__c.value;
  }
  get Course_Dev_08_August() {
    return this.fwl.data.fields.Course_Dev_08_August__c.value;
  }
  get Course_Dev_09_September() {
    return this.fwl.data.fields.Course_Dev_09_September__c.value;
  }
  get Course_Dev_10_October() {
    return this.fwl.data.fields.Course_Dev_10_October__c.value;
  }
  get Course_Dev_11_November() {
    return this.fwl.data.fields.Course_Dev_11_November__c.value;
  }
  get Course_Dev_12_December() {
    return this.fwl.data.fields.Course_Dev_12_December__c.value;
  }
  get Course_Dev_Total_FTE() {
    return this.fwl.data.fields.Course_Dev_Total_FTE__c.value;
  }
  get Dissertation_Chair_Fall() {
    return this.fwl.data.fields.Dissertation_Chair_Fall__c.value;
  }
  get Dissertation_Chair_Spring() {
    return this.fwl.data.fields.Dissertation_Chair_Spring__c.value;
  }
  get Dissertation_Chair_Summer() {
    return this.fwl.data.fields.Dissertation_Chair_Summer__c.value;
  }
  get Dissertation_Chair_Total_FTE() {
    return this.fwl.data.fields.Dissertation_Chair_Total_FTE__c.value;
  }
  get Fellowship_01_January() {
    return this.fwl.data.fields.Fellowship_01_January__c.value;
  }
  get Fellowship_02_February() {
    return this.fwl.data.fields.Fellowship_02_February__c.value;
  }
  get Fellowship_03_March() {
    return this.fwl.data.fields.Fellowship_03_March__c.value;
  }
  get Fellowship_04_April() {
    return this.fwl.data.fields.Fellowship_04_April__c.value;
  }
  get Fellowship_05_May() {
    return this.fwl.data.fields.Fellowship_05_May__c.value;
  }
  get Fellowship_06_June() {
    return this.fwl.data.fields.Fellowship_06_June__c.value;
  }
  get Fellowship_07_July() {
    return this.fwl.data.fields.Fellowship_07_July__c.value;
  }
  get Fellowship_08_August() {
    return this.fwl.data.fields.Fellowship_08_August__c.value;
  }
  get Fellowship_09_September() {
    return this.fwl.data.fields.Fellowship_09_September__c.value;
  }
  get Fellowship_10_October() {
    return this.fwl.data.fields.Fellowship_10_October__c.value;
  }
  get Fellowship_11_November() {
    return this.fwl.data.fields.Fellowship_11_November__c.value;
  }
  get Fellowship_12_December() {
    return this.fwl.data.fields.Fellowship_12_December__c.value;
  }
  get Fellowship_Total_FTE() {
    return this.fwl.data.fields.Fellowship_Total_FTE__c.value;
  }
  get Grant_01_January() {
    return this.fwl.data.fields.Grant_01_January__c.value;
  }
  get Grant_02_February() {
    return this.fwl.data.fields.Grant_02_February__c.value;
  }
  get Grant_03_March() {
    return this.fwl.data.fields.Grant_03_March__c.value;
  }
  get Grant_04_April() {
    return this.fwl.data.fields.Grant_04_April__c.value;
  }
  get Grant_05_May() {
    return this.fwl.data.fields.Grant_05_May__c.value;
  }
  get Grant_06_June() {
    return this.fwl.data.fields.Grant_06_June__c.value;
  }
  get Grant_07_July() {
    return this.fwl.data.fields.Grant_07_July__c.value;
  }
  get Grant_08_August() {
    return this.fwl.data.fields.Grant_08_August__c.value;
  }
  get Grant_09_September() {
    return this.fwl.data.fields.Grant_09_September__c.value;
  }
  get Grant_10_October() {
    return this.fwl.data.fields.Grant_10_October__c.value;
  }
  get Grant_11_November() {
    return this.fwl.data.fields.Grant_11_November__c.value;
  }
  get Grant_12_December() {
    return this.fwl.data.fields.Grant_12_December__c.value;
  }
  get Grant_Total_FTE() {
    return this.fwl.data.fields.Grant_Total_FTE__c.value;
  }
  get Other_01_January() {
    return this.fwl.data.fields.Other_01_January__c.value;
  }
  get Other_02_February() {
    return this.fwl.data.fields.Other_02_February__c.value;
  }
  get Other_03_March() {
    return this.fwl.data.fields.Other_03_March__c.value;
  }
  get Other_04_April() {
    return this.fwl.data.fields.Other_04_April__c.value;
  }
  get Other_05_May() {
    return this.fwl.data.fields.Other_05_May__c.value;
  }
  get Other_06_June() {
    return this.fwl.data.fields.Other_06_June__c.value;
  }
  get Other_07_July() {
    return this.fwl.data.fields.Other_07_July__c.value;
  }
  get Other_08_August() {
    return this.fwl.data.fields.Other_08_August__c.value;
  }
  get Other_09_September() {
    return this.fwl.data.fields.Other_09_September__c.value;
  }
  get Other_10_October() {
    return this.fwl.data.fields.Other_10_October__c.value;
  }
  get Other_11_November() {
    return this.fwl.data.fields.Other_11_November__c.value;
  }
  get Other_12_December() {
    return this.fwl.data.fields.Other_12_December__c.value;
  }
  get Other_Fall() {
    return this.fwl.data.fields.Other_Fall__c.value;
  }
  get Other_Monthly_Total_FTE() {
    return this.fwl.data.fields.Other_Monthly_Total_FTE__c.value;
  }
  get Other_Semester_Total_FTE() {
    return this.fwl.data.fields.Other_Semester_Total_FTE__c.value;
  }
  get Other_Spring() {
    return this.fwl.data.fields.Other_Spring__c.value;
  }
  get Other_Summer() {
    return this.fwl.data.fields.Other_Summer__c.value;
  }
  get Practice_01_January() {
    return this.fwl.data.fields.Practice_01_January__c.value;
  }
  get Practice_02_February() {
    return this.fwl.data.fields.Practice_02_February__c.value;
  }
  get Practice_03_March() {
    return this.fwl.data.fields.Practice_03_March__c.value;
  }
  get Practice_04_April() {
    return this.fwl.data.fields.Practice_04_April__c.value;
  }
  get Practice_05_May() {
    return this.fwl.data.fields.Practice_05_May__c.value;
  }
  get Practice_06_June() {
    return this.fwl.data.fields.Practice_06_June__c.value;
  }
  get Practice_07_July() {
    return this.fwl.data.fields.Practice_07_July__c.value;
  }
  get Practice_08_August() {
    return this.fwl.data.fields.Practice_08_August__c.value;
  }
  get Practice_09_September() {
    return this.fwl.data.fields.Practice_09_September__c.value;
  }
  get Practice_10_October() {
    return this.fwl.data.fields.Practice_10_October__c.value;
  }
  get Practice_11_November() {
    return this.fwl.data.fields.Practice_11_November__c.value;
  }
  get Practice_12_December() {
    return this.fwl.data.fields.Practice_12_December__c.value;
  }
  get Practice_Admin_01_January() {
    return this.fwl.data.fields.Practice_Admin_01_January__c.value;
  }
  get Practice_Admin_02_February() {
    return this.fwl.data.fields.Practice_Admin_02_February__c.value;
  }
  get Practice_Admin_03_March() {
    return this.fwl.data.fields.Practice_Admin_03_March__c.value;
  }
  get Practice_Admin_04_April() {
    return this.fwl.data.fields.Practice_Admin_04_April__c.value;
  }
  get Practice_Admin_05_May() {
    return this.fwl.data.fields.Practice_Admin_05_May__c.value;
  }
  get Practice_Admin_06_June() {
    return this.fwl.data.fields.Practice_Admin_06_June__c.value;
  }
  get Practice_Admin_07_July() {
    return this.fwl.data.fields.Practice_Admin_07_July__c.value;
  }
  get Practice_Admin_08_August() {
    return this.fwl.data.fields.Practice_Admin_08_August__c.value;
  }
  get Practice_Admin_09_September() {
    return this.fwl.data.fields.Practice_Admin_09_September__c.value;
  }
  get Practice_Admin_10_October() {
    return this.fwl.data.fields.Practice_Admin_10_October__c.value;
  }
  get Practice_Admin_11_November() {
    return this.fwl.data.fields.Practice_Admin_11_November__c.value;
  }
  get Practice_Admin_12_December() {
    return this.fwl.data.fields.Practice_Admin_12_December__c.value;
  }
  get Practice_Admin_Total_FTE() {
    return this.fwl.data.fields.Practice_Admin_Total_FTE__c.value;
  }
  get Practice_Total_FTE() {
    return this.fwl.data.fields.Practice_Total_FTE__c.value;
  }
  get Scholarship_01_January() {
    return this.fwl.data.fields.Scholarship_01_January__c.value;
  }
  get Scholarship_02_February() {
    return this.fwl.data.fields.Scholarship_02_February__c.value;
  }
  get Scholarship_03_March() {
    return this.fwl.data.fields.Scholarship_03_March__c.value;
  }
  get Scholarship_04_April() {
    return this.fwl.data.fields.Scholarship_04_April__c.value;
  }
  get Scholarship_05_May() {
    return this.fwl.data.fields.Scholarship_05_May__c.value;
  }
  get Scholarship_06_June() {
    return this.fwl.data.fields.Scholarship_06_June__c.value;
  }
  get Scholarship_07_July() {
    return this.fwl.data.fields.Scholarship_07_July__c.value;
  }
  get Scholarship_08_August() {
    return this.fwl.data.fields.Scholarship_08_August__c.value;
  }
  get Scholarship_09_September() {
    return this.fwl.data.fields.Scholarship_09_September__c.value;
  }
  get Scholarship_10_October() {
    return this.fwl.data.fields.Scholarship_10_October__c.value;
  }
  get Scholarship_11_November() {
    return this.fwl.data.fields.Scholarship_11_November__c.value;
  }
  get Scholarship_12_December() {
    return this.fwl.data.fields.Scholarship_12_December__c.value;
  }
  get Scholarship_Total_FTE() {
    return this.fwl.data.fields.Scholarship_Total_FTE__c.value;
  }
  get Service_01_January() {
    return this.fwl.data.fields.Service_01_January__c.value;
  }
  get Service_02_February() {
    return this.fwl.data.fields.Service_02_February__c.value;
  }
  get Service_03_March() {
    return this.fwl.data.fields.Service_03_March__c.value;
  }
  get Service_04_April() {
    return this.fwl.data.fields.Service_04_April__c.value;
  }
  get Service_05_May() {
    return this.fwl.data.fields.Service_05_May__c.value;
  }
  get Service_06_June() {
    return this.fwl.data.fields.Service_06_June__c.value;
  }
  get Service_07_July() {
    return this.fwl.data.fields.Service_07_July__c.value;
  }
  get Service_08_August() {
    return this.fwl.data.fields.Service_08_August__c.value;
  }
  get Service_09_September() {
    return this.fwl.data.fields.Service_09_September__c.value;
  }
  get Service_10_October() {
    return this.fwl.data.fields.Service_10_October__c.value;
  }
  get Service_11_November() {
    return this.fwl.data.fields.Service_11_November__c.value;
  }
  get Service_12_December() {
    return this.fwl.data.fields.Service_12_December__c.value;
  }
  get Service_Total_FTE() {
    return this.fwl.data.fields.Service_Total_FTE__c.value;
  }
  get Sim_01_January() {
    return this.fwl.data.fields.Sim_01_January__c.value;
  }
  get Sim_02_February() {
    return this.fwl.data.fields.Sim_02_February__c.value;
  }
  get Sim_03_March() {
    return this.fwl.data.fields.Sim_03_March__c.value;
  }
  get Sim_04_April() {
    return this.fwl.data.fields.Sim_04_April__c.value;
  }
  get Sim_05_May() {
    return this.fwl.data.fields.Sim_05_May__c.value;
  }
  get Sim_06_June() {
    return this.fwl.data.fields.Sim_06_June__c.value;
  }
  get Sim_07_July() {
    return this.fwl.data.fields.Sim_07_July__c.value;
  }
  get Sim_08_August() {
    return this.fwl.data.fields.Sim_08_August__c.value;
  }
  get Sim_09_September() {
    return this.fwl.data.fields.Sim_09_September__c.value;
  }
  get Sim_10_October() {
    return this.fwl.data.fields.Sim_10_October__c.value;
  }
  get Sim_11_November() {
    return this.fwl.data.fields.Sim_11_November__c.value;
  }
  get Sim_12_December() {
    return this.fwl.data.fields.Sim_12_December__c.value;
  }
  get Sim_Total_FTE() {
    return this.fwl.data.fields.Sim_Total_FTE__c.value;
  }
  get Teaching_Fall() {
    return this.fwl.data.fields.Teaching_Fall__c.value;
  }
  get Teaching_Spring() {
    return this.fwl.data.fields.Teaching_Spring__c.value;
  }
  get Teaching_Summer() {
    return this.fwl.data.fields.Teaching_Summer__c.value;
  }
  get Teaching_Total_FTE() {
    return this.fwl.data.fields.Teaching_Total_FTE__c.value;
  }
  get Thesis_Chair_Fall() {
    return this.fwl.data.fields.Thesis_Chair_Fall__c.value;
  }
  get Thesis_Chair_Spring() {
    return this.fwl.data.fields.Thesis_Chair_Spring__c.value;
  }
  get Thesis_Chair_Summer() {
    return this.fwl.data.fields.Thesis_Chair_Summer__c.value;
  }
  get Thesis_Chair_Total_FTE() {
    return this.fwl.data.fields.Thesis_Chair_Total_FTE__c.value;
  }
}
