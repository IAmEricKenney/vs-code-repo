@IsTest
public class ContactController_Test {

    @IsTest
    static void createContact() {
        Account a = new Account();
        a.RecordTypeId = '0120B000000apZxQAI';
        a.Name = 'Acute and Chronic Care';
        insert a;

        Contact c = new Contact();
        c.LastName = 'Test';
        c.hed__Primary_Organization__c = a.id;
        c.RecordTypeId = '0120d000000Q914AAC';
        c.Credentials__c = 'ABC';
        c.Employment_Status__c = 'Full-Time';
        c.Career_Line__c = 'Adjunct';
        c.Title = 'Fake Title';
        c.hed__AlternateEmail__c = 'noemail@noemail.com';
        c.hed__Preferred_Email__c = 'Alternate';
        insert c;
    }
}
