import { LightningElement, track, api, wire } from "lwc";
//import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValues } from "lightning/uiObjectInfoApi";

// mbw - next two lines added for sibling component communication
import { CurrentPageReference } from "lightning/navigation";
import { fireEvent } from "c/pubsub";

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

  handleChange(event) {
    this.filterValue = event.target.checked;
  }

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

// this.dispatchEvent(
//   new ShowToastEvent({
//     title: "Checkbox Selections",
//     message: JSON.stringify(this.submittedFilterValues),
//     variant: "success"
//   })
// );

//item below can be removed -- only used to validate the array has values
//console.log( fake );
//   'number of boxes selected: ' + this.submittedFilterValues.length
// );
// for (let n = 0; n < this.submittedFilterValues.length; n++) {
//   console.log('Item # ' + this.submittedFilterValues[n]);
// }

//fire toast event

// removed this action to add support for pubsub communication between components
//  const selectedEvent = new CustomEvent("filterKeySubmit",{
//    detail: this.submittedFilterValues
//  });
//  this.dispatchEvent(selectedEvent);
