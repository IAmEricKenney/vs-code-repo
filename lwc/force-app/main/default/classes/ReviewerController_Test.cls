@ IsTest
public class ReviewerController_Test {
	@IsTest
	static void ReviewerController_Test() {
		Id idRecordId = Schema.SObjectType.Application_Review__c.getRecordTypeInfosByDeveloperName().get('Graduate').
		getRecordTypeId();
		Contact c = new Contact(
            FirstName = 'first',
		    LastName = 'last',
		    hed__AlternateEmail__c = 'puser000@amamama.com',
		    hed__Preferred_Email__c = 'Alternate'
        );
        insert c;

		User u = new User(ProfileId = [SELECT Id FROM Profile WHERE Name = 'Application Reviewer'].Id, 
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
    EnrollmentrxRx__Enrollment_Opportunity__c app = new EnrollmentrxRx__Enrollment_Opportunity__c(
        EnrollmentrxRx__Applicant__c = c.Id);
    Application_Review__c rev = new Application_Review__c(
        Application__c = app.Id,
        Reviewer_Name__c = u.Id,
        RecordTypeId = idRecordId);
}
}