@isTest
private class ContactController_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Account account_Obj = new Account(Name = 'Name619', RecordTypeId = '0120B000000apZwQAI');
    Insert account_Obj; 
    Contact contact_Obj = new Contact(LastName = 'LastName517', RecordTypeId = '0120B000000t6OeQAI',HasOptedOutOfEmail = false, DoNotCall = false, EnrollmentrxRx__Create_Touch_Point__c = false, EnrollmentrxRx__Has_EO_Check__c = false, Faculty_Practice__c = false, ERx_Forms__Create_Portal_User__c = false, Gerontology_Faculty__c = false, hed__Deceased__c = false, hed__Do_Not_Contact__c = false, hed__Exclude_from_Household_Formal_Greeting__c = false, hed__Exclude_from_Household_Informal_Greeting__c = false, hed__Exclude_from_Household_Name__c = false, hed__FERPA__c = false, hed__Financial_Aid_Applicant__c = false, hed__HIPAA__c = false, hed__Military_Service__c = false, hed__Primary_Organization__c = account_Obj.id, hed__is_Address_Override__c = false, New_Application__c = false);
    Insert contact_Obj; 
    test.stopTest();
  }
  static testMethod void test_getRelatedContactsByFilter_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,RecordTypeId from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Contact> contact_Obj  =  [SELECT LastName,RecordTypeId,hed__Primary_Organization__c from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    ContactController obj01 = new ContactController();
    ContactController.getRelatedContactsByFilter('01p90000006uk2w','test data');
  }
  static testMethod void test_getInactiveContactsByFilter_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,RecordTypeId from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Contact> contact_Obj  =  [SELECT LastName,RecordTypeId,hed__Primary_Organization__c from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    ContactController obj01 = new ContactController();
    ContactController.getInactiveContactsByFilter('01p90000006uk2w','test data');
  }
}