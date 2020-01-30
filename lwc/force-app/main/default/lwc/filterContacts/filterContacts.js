import { LightningElement, track, api, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import CAREER_LINE from "@salesforce/schema/Contact.Career_Line__c";

export default class FilterContacts extends LightningElement {
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
  //@api filterLabel;//Input from parent component

  handleChange(event) {
    this.filterValue = event.target.checked;
  }

  handleClick() {
    /**
     * Don’t use the window or document global properties to query for DOM elements
     * Don’t use ID selectors with querySelector. The IDs that you define in HTML templates
     *  may be transformed into globally unique values when the template is rendered.
     */

    let filterBox = this.template.querySelector("lightning-input");
    let filterKeyValue = filterBox.checked;
    this.submittedFilterValue = filterKeyValue;

    this.dispatchEvent(
      new ShowToastEvent({
        title: "Submitted Filter Value",
        message: this.submittedFilterValue,
        variant: "success"
      })
    );

    /*Creates the event with the contact ID data.
        To pass data up to a receiving component, set a detail property in the CustomEvent constructor.
        Receiving components access the data in the detail property in the event listener’s handler function*/
    const selectedEvent = new CustomEvent("filterkeysubmit", {
      detail: filterKeyValue
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }
}
