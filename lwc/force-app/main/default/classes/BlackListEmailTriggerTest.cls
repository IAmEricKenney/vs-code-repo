@isTest
public class BlackListEmailTriggerTest {
    @isTest static void createSpamCase() {
    	Case cs = new Case();
    	cs.First_Name__c = 'Christmas';
        cs.Last_Name__c = 'Paintings';
    	cs.SuppliedEmail = 'christmas@zamudiospaintings.com';
    	insert cs;
        }
}