@IsTest
public class SelfRegister_Test {
    @IsTest
    static void createUser_Test() {
		Contact c = new Contact(
            FirstName = 'first',
		    LastName = 'last',
		    hed__AlternateEmail__c = 'puser000@amamama.com',
		    hed__Preferred_Email__c = 'Alternate'
        );
        insert c;
        User u = new User(ProfileId = [SELECT Id FROM Profile WHERE Name = 'Student Portal User'].Id, 
        LastName = 'last', 
        Email = 'puser000@amamama.com', 
        Username = 'puser000@amamama.com' + System.currentTimeMillis(), 
        CompanyName = 'TEST', 
        Title = 'title', 
        Alias = 'alias', 
        TimeZoneSidKey = 'America/Los_Angeles', 
        EmailEncodingKey = 'UTF-8', 
        LanguageLocaleKey = 'en_US', 
        LocaleSidKey = 'en_US', 
        ContactId = c.Id);
        insert u;
    }
}


