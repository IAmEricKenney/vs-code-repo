// import LWC frameworks
import { LightningElement, api, track, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

//next two added to support pubsub component communication
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";

// import apex class to display data
import getRelatedContactsByFilter from "@salesforce/apex/ContactController.getRelatedContactsByFilter";

// constructs the in line action button to view record
const actions = [{ label: "View", name: "show_details" }];

//creates data structure for lightning datatable
const COLUMNS = [
  { label: "Name", fieldName: "Name_and_Credentials__c", sortable: true },
  { label: "Title", fieldName: "Title" },
  { label: "Career Line", fieldName: "Career_Line__c", sortable: true },
  { type: "action", typeAttributes: { rowActions: actions } }
];
export default class RelatedContactsWithFilter extends NavigationMixin(
  LightningElement
) {
  @wire(CurrentPageReference) pageRef; //added to support pubsub component communication
  @api recordId; //Inherits Account Record Id from Account Record Page

  @track columns = COLUMNS;
  @track data = [];
  // @track loadMoreStatus; (Not used, maybe not necessary)

  //Lifecycle hook which fires when a component is inserted into the DOM
  connectedCallback() {
    registerListener("filterValueSubmit", this.handleFilterValueSubmit, this); //register listener for pubsub event
    this.loadRelatedContacts("");
  }

  //added to support pubsub events
  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  // Event to loads datatable
  loadRelatedContacts(filterKey) {
    getRelatedContactsByFilter({ accountId: this.recordId, key: filterKey })
      .then(results => {
        this.data = results;
      })
      .catch(error => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error",
            message: error.body.message,
            variant: "error"
          })
        );
      });
  }

  // handler for pubsub event initiated by sibling component
  // incoming value will be an array of search terms.
  // need to include logic to split array values before passing to APEX
  handleFilterValueSubmit(searchValue) {
    this.filterValues = JSON.stringify(searchValue);
    this.loadRelatedContacts(JSON.stringify(searchValue));
  }

  // Event to make columns sortable
  handleSortdata(event) {
    // field name
    this.sortBy = event.detail.fieldName;

    // sort direction
    this.sortDirection = event.detail.sortDirection;

    // calling sortdata function to sort the data based on direction and selected field
    this.sortData(event.detail.fieldName, event.detail.sortDirection);
  }

  sortData(fieldname, direction) {
    // serialize the data before calling sort function
    let parseData = JSON.parse(JSON.stringify(this.data));

    // Return the value stored in the field
    let keyValue = a => {
      return a[fieldname];
    };

    // cheking reverse direction
    let isReverse = direction === "asc" ? 1 : -1;

    // sorting data
    parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : ""; // handling null values
      y = keyValue(y) ? keyValue(y) : "";

      // sorting values based on direction
      return isReverse * ((x > y) - (y > x));
    });

    // set the sorted data to data table data
    this.data = parseData;
  }
    // Event to open record page from datatable
    navigateToRecordViewPage(event) {
      this.record = event.detail.row;
      // View a custom object record.
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          recordId: this.record.Id,
          objectApiName: "Contact",
          actionName: "view"
        }
      });
    }
}
