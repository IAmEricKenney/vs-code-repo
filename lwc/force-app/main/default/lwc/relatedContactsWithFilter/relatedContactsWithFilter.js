import { LightningElement, api, track } from "lwc";
import getRelatedContactsByFilter from "@salesforce/apex/ContactController.getRelatedContactsByFilter";
//import getRelatedContacts from "@salesforce/apex/ContactController.getRelatedContacts";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const COLUMNS = [
  { label: "Name", fieldName: "Name_and_Credentials__c", sortable: true },
  { label: "Title", fieldName: "Title" },
  { label: "Career Line", fieldName: "Career_Line__c", sortable: true }
];

export default class RelatedContactsWithFilter extends LightningElement {
  @api recordId; //Inherits Account Record Id from Account Record Page

  @track columns = COLUMNS;
  //@track data;
  @track data = [];
  @track loadMoreStatus;
  @api totalNumberOfRows;
  
/*   @wire (getRelatedContacts)
  contacts; */

  //Lifecycle hook which fires when a component is inserted into the DOM
  connectedCallback() {
    this.loadRelatedContacts("");
  }

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

  handleFilterKeySubmit(event) {
    let filterKey = event.detail;
    this.loadRelatedContacts(filterKey);
  }
  loadMoreData(event) {
    //Display a spinner to signal that data is being loaded
    event.target.isLoading = true;
    //Display "Loading" when more data is being loaded
    this.loadMoreStatus = 'Loading';
    getRelatedContactsByFilter(50)
        .then((data) => {
            if (data.length >= this.totalNumberOfRows) {
                event.target.enableInfiniteLoading = false;
                this.loadMoreStatus = 'No more data to load';
            } else {
                const currentData = this.data;
                //Appends new data to the end of the table
                const newData = currentData.concat(data);
                this.data = newData;
                this.loadMoreStatus = '';
            }
            event.target.isLoading = false;
        });
      }

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
        let keyValue = (a) => {
            return a[fieldname];
        };

        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1: -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        // set the sorted data to data table data
        this.data = parseData;

    }

}