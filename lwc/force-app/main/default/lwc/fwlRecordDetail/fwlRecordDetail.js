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
  "Faculty_Workload__c.Simulation_total__c",
  "Faculty_Workload__c.APRIL_ADMIN__C",
  "Faculty_Workload__c.April_Admin__c",
  "Faculty_Workload__c.April_Course_Dev__c",
  "Faculty_Workload__c.April_Fellowship__c",
  "Faculty_Workload__c.April_Grant__c",
  "Faculty_Workload__c.April_Other__c",
  "Faculty_Workload__c.April_Practice_Admin__c",
  "Faculty_Workload__c.April_Practice__c",
  "Faculty_Workload__c.April_Scholarship__c",
  "Faculty_Workload__c.April_Service__c",
  "Faculty_Workload__c.April_Sim__c",
  "Faculty_Workload__c.August_Admin__c",
  "Faculty_Workload__c.August_Course_Dev__c",
  "Faculty_Workload__c.August_Fellowship__c",
  "Faculty_Workload__c.August_Grant__c",
  "Faculty_Workload__c.August_Other__c",
  "Faculty_Workload__c.August_Practice_Admin__c",
  "Faculty_Workload__c.August_Practice__c",
  "Faculty_Workload__c.August_Scholarship__c",
  "Faculty_Workload__c.August_Service__c",
  "Faculty_Workload__c.August_Sim__c",
  "Faculty_Workload__c.December_Admin__c",
  "Faculty_Workload__c.December_Course_Dev__c",
  "Faculty_Workload__c.December_Fellowship__c",
  "Faculty_Workload__c.December_Grant__c",
  "Faculty_Workload__c.December_Other__c",
  "Faculty_Workload__c.December_Practice_Admin__c",
  "Faculty_Workload__c.December_Practice__c",
  "Faculty_Workload__c.December_Scholarship__c",
  "Faculty_Workload__c.December_Service__c",
  "Faculty_Workload__c.December_Sim__c",
  "Faculty_Workload__c.February_Admin_Sum__c",
  "Faculty_Workload__c.February_Course_Dev__c",
  "Faculty_Workload__c.February_Fellowship__c",
  "Faculty_Workload__c.February_Grant__c",
  "Faculty_Workload__c.February_Other__c",
  "Faculty_Workload__c.February_Practice_Admin__c",
  "Faculty_Workload__c.February_Practice__c",
  "Faculty_Workload__c.February_Scholarship__c",
  "Faculty_Workload__c.February_Service__c",
  "Faculty_Workload__c.February_Sim__c",
  "Faculty_Workload__c.January_Admin_Sum__c",
  "Faculty_Workload__c.January_Course_Dev__c",
  "Faculty_Workload__c.January_Fellowship__c",
  "Faculty_Workload__c.January_Grant__c",
  "Faculty_Workload__c.January_Other__c",
  "Faculty_Workload__c.January_Practice_Admin__c",
  "Faculty_Workload__c.January_Practice__c",
  "Faculty_Workload__c.January_Scholarship__c",
  "Faculty_Workload__c.January_Service__c",
  "Faculty_Workload__c.January_Sim__c",
  "Faculty_Workload__c.July_Admin__c",
  "Faculty_Workload__c.July_Course_Dev__c",
  "Faculty_Workload__c.July_Fellowship__c",
  "Faculty_Workload__c.July_Grant__c",
  "Faculty_Workload__c.July_Other__c",
  "Faculty_Workload__c.July_Practice_Admin__c",
  "Faculty_Workload__c.July_Practice__c",
  "Faculty_Workload__c.July_Scholarship__c",
  "Faculty_Workload__c.July_Service__c",
  "Faculty_Workload__c.July_Sim__c",
  "Faculty_Workload__c.June_Admin__c",
  "Faculty_Workload__c.June_Course_Dev__c",
  "Faculty_Workload__c.June_Fellowship__c",
  "Faculty_Workload__c.June_Grant__c",
  "Faculty_Workload__c.June_Other__c",
  "Faculty_Workload__c.June_Practice_Admin__c",
  "Faculty_Workload__c.June_Practice__c",
  "Faculty_Workload__c.June_Scholarship__c",
  "Faculty_Workload__c.June_Service__c",
  "Faculty_Workload__c.June_Sim__c",
  "Faculty_Workload__c.March_Admin_Sum__c",
  "Faculty_Workload__c.March_Course_Dev__c",
  "Faculty_Workload__c.March_Fellowship__c",
  "Faculty_Workload__c.March_Grant__c",
  "Faculty_Workload__c.March_Other__c",
  "Faculty_Workload__c.March_Practice_Admin__c",
  "Faculty_Workload__c.March_Practice__c",
  "Faculty_Workload__c.March_Scholarship__c",
  "Faculty_Workload__c.March_Service__c",
  "Faculty_Workload__c.March_Sim__c",
  "Faculty_Workload__c.May_Admin__c",
  "Faculty_Workload__c.May_Course_Dev__c",
  "Faculty_Workload__c.May_Fellowship__c",
  "Faculty_Workload__c.May_Grant__c",
  "Faculty_Workload__c.May_Other__c",
  "Faculty_Workload__c.May_Practice_Admin__c",
  "Faculty_Workload__c.May_Practice__c",
  "Faculty_Workload__c.May_Scholarship__c",
  "Faculty_Workload__c.May_Service__c",
  "Faculty_Workload__c.May_Sim__c",
  "Faculty_Workload__c.November_Admin__c",
  "Faculty_Workload__c.November_Course_Dev__c",
  "Faculty_Workload__c.November_Fellowship__c",
  "Faculty_Workload__c.November_Grant__c",
  "Faculty_Workload__c.November_Other__c",
  "Faculty_Workload__c.November_Practice_Admin__c",
  "Faculty_Workload__c.November_Practice__c",
  "Faculty_Workload__c.November_Scholarship__c",
  "Faculty_Workload__c.November_Service__c",
  "Faculty_Workload__c.November_Sim__c",
  "Faculty_Workload__c.October_Admin__c",
  "Faculty_Workload__c.October_Course_Dev__c",
  "Faculty_Workload__c.October_Fellowship__c",
  "Faculty_Workload__c.October_Grant__c",
  "Faculty_Workload__c.October_Other__c",
  "Faculty_Workload__c.October_Practice_Admin__c",
  "Faculty_Workload__c.October_Practice__c",
  "Faculty_Workload__c.October_Scholarship__c",
  "Faculty_Workload__c.October_Service__c",
  "Faculty_Workload__c.October_Sim__c",
  "Faculty_Workload__c.Other_Monthly_Total_FTE__c",
  "Faculty_Workload__c.September_Admin__c",
  "Faculty_Workload__c.September_Course_Dev__c",
  "Faculty_Workload__c.September_Fellowship__c",
  "Faculty_Workload__c.September_Grant__c",
  "Faculty_Workload__c.September_Other__c",
  "Faculty_Workload__c.September_Practice_Admin__c",
  "Faculty_Workload__c.September_Practice__c",
  "Faculty_Workload__c.September_Scholarship__c",
  "Faculty_Workload__c.September_Service__c",
  "Faculty_Workload__c.September_Sim__c"
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
  get April_Admin() {
    return this.fwl.data.fields.April_Admin__c.value;
  }
  get April_Course_Dev() {
    return this.fwl.data.fields.April_Course_Dev__c.value;
  }
  get April_Fellowship() {
    return this.fwl.data.fields.April_Fellowship__c.value;
  }
  get April_Grant() {
    return this.fwl.data.fields.April_Grant__c.value;
  }
  get April_Other() {
    return this.fwl.data.fields.April_Other__c.value;
  }
  get April_Practice_Admin() {
    return this.fwl.data.fields.April_Practice_Admin__c.value;
  }
  get April_Practice() {
    return this.fwl.data.fields.April_Practice__c.value;
  }
  get April_Scholarship() {
    return this.fwl.data.fields.April_Scholarship__c.value;
  }
  get April_Service() {
    return this.fwl.data.fields.April_Service__c.value;
  }
  get April_Sim() {
    return this.fwl.data.fields.April_Sim__c.value;
  }
  get August_Admin() {
    return this.fwl.data.fields.August_Admin__c.value;
  }
  get August_Course_Dev() {
    return this.fwl.data.fields.August_Course_Dev__c.value;
  }
  get August_Fellowship() {
    return this.fwl.data.fields.August_Fellowship__c.value;
  }
  get August_Grant() {
    return this.fwl.data.fields.August_Grant__c.value;
  }
  get August_Other() {
    return this.fwl.data.fields.August_Other__c.value;
  }
  get August_Practice_Admin() {
    return this.fwl.data.fields.August_Practice_Admin__c.value;
  }
  get August_Practice() {
    return this.fwl.data.fields.August_Practice__c.value;
  }
  get August_Scholarship() {
    return this.fwl.data.fields.August_Scholarship__c.value;
  }
  get August_Service() {
    return this.fwl.data.fields.August_Service__c.value;
  }
  get August_Sim() {
    return this.fwl.data.fields.August_Sim__c.value;
  }
  get December_Admin() {
    return this.fwl.data.fields.December_Admin__c.value;
  }
  get December_Course_Dev() {
    return this.fwl.data.fields.December_Course_Dev__c.value;
  }
  get December_Fellowship() {
    return this.fwl.data.fields.December_Fellowship__c.value;
  }
  get December_Grant() {
    return this.fwl.data.fields.December_Grant__c.value;
  }
  get December_Other() {
    return this.fwl.data.fields.December_Other__c.value;
  }
  get December_Practice_Admin() {
    return this.fwl.data.fields.December_Practice_Admin__c.value;
  }
  get December_Practice() {
    return this.fwl.data.fields.December_Practice__c.value;
  }
  get December_Scholarship() {
    return this.fwl.data.fields.December_Scholarship__c.value;
  }
  get December_Service() {
    return this.fwl.data.fields.December_Service__c.value;
  }
  get December_Sim() {
    return this.fwl.data.fields.December_Sim__c.value;
  }
  get February_Admin() {
    return this.fwl.data.fields.February_Admin_Sum__c.value;
  }
  get February_Course_Dev() {
    return this.fwl.data.fields.February_Course_Dev__c.value;
  }
  get February_Fellowship() {
    return this.fwl.data.fields.February_Fellowship__c.value;
  }
  get February_Grant() {
    return this.fwl.data.fields.February_Grant__c.value;
  }
  get February_Other() {
    return this.fwl.data.fields.February_Other__c.value;
  }
  get February_Practice_Admin() {
    return this.fwl.data.fields.February_Practice_Admin__c.value;
  }
  get February_Practice() {
    return this.fwl.data.fields.February_Practice__c.value;
  }
  get February_Scholarship() {
    return this.fwl.data.fields.February_Scholarship__c.value;
  }
  get February_Service() {
    return this.fwl.data.fields.February_Service__c.value;
  }
  get February_Sim() {
    return this.fwl.data.fields.February_Sim__c.value;
  }
  get January_Admin() {
    return this.fwl.data.fields.January_Admin_Sum__c.value;
  }
  get January_Course_Dev() {
    return this.fwl.data.fields.January_Course_Dev__c.value;
  }
  get January_Fellowship() {
    return this.fwl.data.fields.January_Fellowship__c.value;
  }
  get January_Grant() {
    return this.fwl.data.fields.January_Grant__c.value;
  }
  get January_Other() {
    return this.fwl.data.fields.January_Other__c.value;
  }
  get January_Practice_Admin() {
    return this.fwl.data.fields.January_Practice_Admin__c.value;
  }
  get January_Practice() {
    return this.fwl.data.fields.January_Practice__c.value;
  }
  get January_Scholarship() {
    return this.fwl.data.fields.January_Scholarship__c.value;
  }
  get January_Service() {
    return this.fwl.data.fields.January_Service__c.value;
  }
  get January_Sim() {
    return this.fwl.data.fields.January_Sim__c.value;
  }
  get July_Admin() {
    return this.fwl.data.fields.July_Admin__c.value;
  }
  get July_Course_Dev() {
    return this.fwl.data.fields.July_Course_Dev__c.value;
  }
  get July_Fellowship() {
    return this.fwl.data.fields.July_Fellowship__c.value;
  }
  get July_Grant() {
    return this.fwl.data.fields.July_Grant__c.value;
  }
  get July_Other() {
    return this.fwl.data.fields.July_Other__c.value;
  }
  get July_Practice_Admin() {
    return this.fwl.data.fields.July_Practice_Admin__c.value;
  }
  get July_Practice() {
    return this.fwl.data.fields.July_Practice__c.value;
  }
  get July_Scholarship() {
    return this.fwl.data.fields.July_Scholarship__c.value;
  }
  get July_Service() {
    return this.fwl.data.fields.July_Service__c.value;
  }
  get July_Sim() {
    return this.fwl.data.fields.July_Sim__c.value;
  }
  get June_Admin() {
    return this.fwl.data.fields.June_Admin__c.value;
  }
  get June_Course_Dev() {
    return this.fwl.data.fields.June_Course_Dev__c.value;
  }
  get June_Fellowship() {
    return this.fwl.data.fields.June_Fellowship__c.value;
  }
  get June_Grant() {
    return this.fwl.data.fields.June_Grant__c.value;
  }
  get June_Other() {
    return this.fwl.data.fields.June_Other__c.value;
  }
  get June_Practice_Admin() {
    return this.fwl.data.fields.June_Practice_Admin__c.value;
  }
  get June_Practice() {
    return this.fwl.data.fields.June_Practice__c.value;
  }
  get June_Scholarship() {
    return this.fwl.data.fields.June_Scholarship__c.value;
  }
  get June_Service() {
    return this.fwl.data.fields.June_Service__c.value;
  }
  get June_Sim() {
    return this.fwl.data.fields.June_Sim__c.value;
  }
  get March_Admin() {
    return this.fwl.data.fields.March_Admin_Sum__c.value;
  }
  get March_Course_Dev() {
    return this.fwl.data.fields.March_Course_Dev__c.value;
  }
  get March_Fellowship() {
    return this.fwl.data.fields.March_Fellowship__c.value;
  }
  get March_Grant() {
    return this.fwl.data.fields.March_Grant__c.value;
  }
  get March_Other() {
    return this.fwl.data.fields.March_Other__c.value;
  }
  get March_Practice_Admin() {
    return this.fwl.data.fields.March_Practice_Admin__c.value;
  }
  get March_Practice() {
    return this.fwl.data.fields.March_Practice__c.value;
  }
  get March_Scholarship() {
    return this.fwl.data.fields.March_Scholarship__c.value;
  }
  get March_Service() {
    return this.fwl.data.fields.March_Service__c.value;
  }
  get March_Sim() {
    return this.fwl.data.fields.March_Sim__c.value;
  }
  get May_Admin() {
    return this.fwl.data.fields.May_Admin__c.value;
  }
  get May_Course_Dev() {
    return this.fwl.data.fields.May_Course_Dev__c.value;
  }
  get May_Fellowship() {
    return this.fwl.data.fields.May_Fellowship__c.value;
  }
  get May_Grant() {
    return this.fwl.data.fields.May_Grant__c.value;
  }
  get May_Other() {
    return this.fwl.data.fields.May_Other__c.value;
  }
  get May_Practice_Admin() {
    return this.fwl.data.fields.May_Practice_Admin__c.value;
  }
  get May_Practice() {
    return this.fwl.data.fields.May_Practice__c.value;
  }
  get May_Scholarship() {
    return this.fwl.data.fields.May_Scholarship__c.value;
  }
  get May_Service() {
    return this.fwl.data.fields.May_Service__c.value;
  }
  get May_Sim() {
    return this.fwl.data.fields.May_Sim__c.value;
  }
  get November_Admin() {
    return this.fwl.data.fields.November_Admin__c.value;
  }
  get November_Course_Dev() {
    return this.fwl.data.fields.November_Course_Dev__c.value;
  }
  get November_Fellowship() {
    return this.fwl.data.fields.November_Fellowship__c.value;
  }
  get November_Grant() {
    return this.fwl.data.fields.November_Grant__c.value;
  }
  get November_Other() {
    return this.fwl.data.fields.November_Other__c.value;
  }
  get November_Practice_Admin() {
    return this.fwl.data.fields.November_Practice_Admin__c.value;
  }
  get November_Practice() {
    return this.fwl.data.fields.November_Practice__c.value;
  }
  get November_Scholarship() {
    return this.fwl.data.fields.November_Scholarship__c.value;
  }
  get November_Service() {
    return this.fwl.data.fields.November_Service__c.value;
  }
  get November_Sim() {
    return this.fwl.data.fields.November_Sim__c.value;
  }
  get October_Admin() {
    return this.fwl.data.fields.October_Admin__c.value;
  }
  get October_Course_Dev() {
    return this.fwl.data.fields.October_Course_Dev__c.value;
  }
  get October_Fellowship() {
    return this.fwl.data.fields.October_Fellowship__c.value;
  }
  get October_Grant() {
    return this.fwl.data.fields.October_Grant__c.value;
  }
  get October_Other() {
    return this.fwl.data.fields.October_Other__c.value;
  }
  get October_Practice_Admin() {
    return this.fwl.data.fields.October_Practice_Admin__c.value;
  }
  get October_Practice() {
    return this.fwl.data.fields.October_Practice__c.value;
  }
  get October_Scholarship() {
    return this.fwl.data.fields.October_Scholarship__c.value;
  }
  get October_Service() {
    return this.fwl.data.fields.October_Service__c.value;
  }
  get October_Sim() {
    return this.fwl.data.fields.October_Sim__c.value;
  }
  get Other_Monthly_Total_FTE() {
    return this.fwl.data.fields.Other_Monthly_Total_FTE__c.value;
  }
  get September_Admin() {
    return this.fwl.data.fields.September_Admin__c.value;
  }
  get September_Course_Dev() {
    return this.fwl.data.fields.September_Course_Dev__c.value;
  }
  get September_Fellowship() {
    return this.fwl.data.fields.September_Fellowship__c.value;
  }
  get September_Grant() {
    return this.fwl.data.fields.September_Grant__c.value;
  }
  get September_Other() {
    return this.fwl.data.fields.September_Other__c.value;
  }
  get September_Practice_Admin() {
    return this.fwl.data.fields.September_Practice_Admin__c.value;
  }
  get September_Practice() {
    return this.fwl.data.fields.September_Practice__c.value;
  }
  get September_Scholarship() {
    return this.fwl.data.fields.September_Scholarship__c.value;
  }
  get September_Service() {
    return this.fwl.data.fields.September_Service__c.value;
  }
  get September_Sim() {
    return this.fwl.data.fields.September_Sim__c.value;
  }
}
