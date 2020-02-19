@isTest
private class ContactController_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Account account_Obj = new Account(Name = 'Name619', RecordTypeId = '0120B000000apZwQAI');
    Insert account_Obj; 
    Contact contact_Obj = new Contact(LastName = 'LastName517', RecordTypeId = '0120B000000t6OeQAI', 
                                      hed__Primary_Organization__c = account_Obj.id);
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