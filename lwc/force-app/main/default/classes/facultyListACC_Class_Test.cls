@IsTest
public class facultyListACC_Class_Test {

    @IsTest
    static void createFacACCTest() {
        String acc = 'Acute and Chronic Care';
        String a;
        Id idRecordId = Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Faculty_Staff').
           getRecordTypeId();
        Account[] acct = [SELECT Id from Account WHERE Name = :acc];
        If (acct.size() > 0) 
           a = acct[0].Id;
        Contact c = new Contact();
        c.FirstName = 'Test';
        c.LastName = 'Faculty';
        c.hed__AlternateEmail__c = 'email@noemail.com';
        c.hed__Preferred_Email__c = 'Alternate';
        insert c;
        
        c.RecordTypeId = idRecordId;
        c.hed__Primary_Organization__c = a;
        c.Credentials__c = 'ABC';
        c.Employment_Status__c = 'Full-Time';
        update c;

    }
}