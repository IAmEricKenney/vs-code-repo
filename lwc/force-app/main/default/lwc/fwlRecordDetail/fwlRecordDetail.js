import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const fields = [
    'Faculty_Workload__c.Name', 'Faculty_Workload__c.Division__c', 'Faculty_Workload__c.Teaching_Summer__c',
    'Faculty_Workload__c.Teaching_Fall__c', 'Faculty_Workload__c.Teaching_Spring__c', 
    'Faculty_Workload__c.Teaching_Total_FTE__c', 'Faculty_Workload__c.Dissertation_Chair_Summer__c',
    'Faculty_Workload__c.Dissertation_Chair_Fall__c', 'Faculty_Workload__c.Dissertation_Chair_Spring__c',
    'Faculty_Workload__c.Dissertation_Chair_Total_FTE__c', 'Faculty_Workload__c.Thesis_Chair_Summer__c',
    'Faculty_Workload__c.Thesis_Chair_Fall__c', 'Faculty_Workload__c.Thesis_Chair_Spring__c',
    'Faculty_Workload__c.Thesis_Chair_Total_FTE__c', 'Faculty_Workload__c.Other_Summer__c',
    'Faculty_Workload__c.Other_Fall__c', 'Faculty_Workload__c.Other_Spring__c',
    'Faculty_Workload__c.Other_Semester_Total_FTE__c'
];

export default class FwlRecordDetail extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    fwl;

    get Name() { 
        return this.fwl.data.fields.Name.value; 
    }
    get Division() { 
        return this.fwl.data.fields.Division__c.value; 
    }
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
}