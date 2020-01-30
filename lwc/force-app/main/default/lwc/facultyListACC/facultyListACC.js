import { LightningElement, wire, track } from 'lwc';
import getACCFaculty from '@salesforce/apex/facultyListACC_Class.getACCFaculty';

const columns = [
    { label: 'Name and Credentials', fieldName: 'Name_and_Credentials__c', sortable: true},
    { label: 'Title', fieldName: 'Title'},
    { label: 'Career Line', fieldName: 'Career_Line__c'}
];

export default class facultyListACC extends LightningElement {
    @track error;
    @track columns = columns;
    @wire(getACCFaculty)
    contacts;

    @track careerLine;
    filterkeysubmit(event) {
        this.careerLine = event.detail;
        console.log ('career line event changed' + JSON.stringify(this.careerLine));
    } 

    /* loadMoreData(event) {
            //Display a spinner to signal that data is being loaded
            event.target.isLoading = true;
            //Display "Loading" when more data is being loaded
            this.loadMoreStatus = 'Loading';
            fetchData(50)
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
        updateColumnSorting(event) {
            var fieldName = event.detail.fieldname;
            var sortDirection = event.detail.sortDirection;
            // assign the latest attribute with the sorted column fieldName and sorted direction
            this.sortedBy = fieldName;
            this.sortedDirection = sortDirection;
            this.data = this.sortData(fieldName, sortDirection);
       }*/
}