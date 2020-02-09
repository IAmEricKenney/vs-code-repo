// import LWC frameworks
import { LightningElement, track, api, wire } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";

// mbw - next two lines added for sibling component communication
import { CurrentPageReference } from "lightning/navigation";
import { fireEvent } from "c/pubsub";

// imports the Career Line picklist value to be used in the filter
import CAREER_LINE from "@salesforce/schema/Contact.Career_Line__c";

export default class FilterContacts extends LightningElement {
  // added to support sibling component communication
  @wire(CurrentPageReference) pageRef;

  //@track filterValue;
  @wire(getPicklistValues, {
    recordTypeId: "0120d000000Q914AAC",
    fieldApiName: CAREER_LINE
  })
  filterValue;
  @track submittedFilterValue;

  /**
   * Input from Design parameters in Lightning App Builder.
   * Name should match the property name given in meta.xml file
   */
  @api componentLabel;
  //@api filterLabel; //Input from parent component

  // Method not used
  // handleChange(event) {
  //   this.filterValue = event.target.checked;
  // }

  // Method to activate the filter changes and update datatable
  handleClick() {
    let filterSelect = this.template.querySelectorAll("lightning-input");
    this.submittedFilterValues = [];
    for (let i = 0; i < filterSelect.length; i++) {
      let item = filterSelect[i];
      if (item.checked) {
        this.submittedFilterValues.push(item.value);
      }
    }
    fireEvent(this.pageRef, "filterValueSubmit", this.submittedFilterValues);
  }

  // Method called when Reset button is clicked to return values to default
  handleResetClick() {
    let filterSelect = this.template.querySelectorAll("lightning-input");
    filterSelect.forEach(fs => {
      fs.checked = true;
    });
    this.submittedFilterValues = [];
    for (let i = 0; i < filterSelect.length; i++) {
      let item = filterSelect[i];
      if (item.checked) {
        this.submittedFilterValues.push(item.value);
      }
    }
    this.handleClick();
    fireEvent(this.pageRef, "filterValueSubmit", this.submittedFilterValues);
  }
}
