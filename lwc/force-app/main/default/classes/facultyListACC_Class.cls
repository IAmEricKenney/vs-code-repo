public with sharing class facultyListACC_Class {

    @AuraEnabled(cacheable=true)

    public static List<Contact> getACCFaculty(String carLine) 
    {
        List<Contact> accList = [SELECT Id, Name_and_Credentials__c, Title, Career_Line__c FROM Contact 
        WHERE hed__Primary_Organization__r.Name = 'Acute and Chronic Care'
        AND Employment_Status__c != 'Inactive' AND Employment_Status__c != 'Retired'
        ORDER BY Name_and_Credentials__c ASC];
        return accList;
    }
}

/*
AND Career_Line__c = :carLine
    public static List<User> getMktUsers(String usrId) {
        System.debug('theuserid:'+usrId);
        User ThisUser = [SELECT Id, Name, Office__c FROM User WHERE Id = :usrId LIMIT 1];
        System.debug('TheUserOfficeis: ' + ThisUser.Office__c);
        return [SELECT Id, Name FROM User WHERE Office__c = :ThisUser.Office__c and IsActive = True];
    }
*/