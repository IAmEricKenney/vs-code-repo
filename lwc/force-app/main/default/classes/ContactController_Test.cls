@isTest
private class ContactController_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();

    Account account_Obj = new Account(Name = 'TestAccount', RecordTypeId = '0120B000000apZwQAI');
    Insert account_Obj; 
      
    Contact contact_Tenure = new Contact(LastName = 'TenureContact', 
                                      RecordTypeId = '0120B000000t6OeQAI', 
                                      hed__Primary_Organization__c = account_Obj.id,
                                      Career_Line__c = 'Tenure Track');
    Insert contact_Tenure; 
      
    Contact contact_Adjunct = new Contact(LastName = 'AdjunctContact', 
                                        RecordTypeId = '0120B000000t6OeQAI', 
                                        hed__Primary_Organization__c = account_Obj.id,
                                        Career_Line__c = 'Adjunct');  
    Insert contact_Adjunct;
      
    Contact contact_Research = new Contact(LastName = 'ResearchContact', 
                                        RecordTypeId = '0120B000000t6OeQAI', 
                                        hed__Primary_Organization__c = account_Obj.id,
										Career_Line__c = 'Research');  
    
    Insert contact_Research;
    Contact  contact_Clinical = new Contact(LastName = 'ClinicalContact', 
                                        RecordTypeId = '0120B000000t6OeQAI', 
                                        hed__Primary_Organization__c = account_Obj.id,
                                        Career_Line__c = 'Clinical');        
    Insert contact_Clinical;  
      
      
    test.stopTest();
  }
  static testMethod void test_getRelatedContactsByFilter_UseCase1(){
  	String strValidSearchKeyValue = '["Tenure Track","Adjunct","Research","Clinical"]';
  
    List<Account> account_Obj  =  [SELECT Name,RecordTypeId from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Contact> contact_Obj  =  [SELECT LastName,RecordTypeId,hed__Primary_Organization__c from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    ContactController obj01 = new ContactController();
    ContactController.getRelatedContactsByFilter('01p90000006uk2w',strValidSearchKeyValue);
      
  }
  static testMethod void test_getRelatedContactsByFilter_UseCase2(){
  	String strValidSearchKeyValue = ''; //pass empty value
  
    List<Account> account_Obj  =  [SELECT Name,RecordTypeId from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Contact> contact_Obj  =  [SELECT LastName,RecordTypeId,hed__Primary_Organization__c from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    ContactController obj01 = new ContactController();
    ContactController.getRelatedContactsByFilter('01p90000006uk2w',strValidSearchKeyValue);
  }    
  static testMethod void test_getInactiveContactsByFilter_UseCase1(){
  	String strValidSearchKeyValue = '["Tenure Track","Adjunct","Research","Clinical"]';
  
    List<Account> account_Obj  =  [SELECT Name,RecordTypeId from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Contact> contact_Obj  =  [SELECT LastName,RecordTypeId,hed__Primary_Organization__c from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    ContactController obj01 = new ContactController();
    ContactController.getInactiveContactsByFilter('01p90000006uk2w',strValidSearchKeyValue);
  }
  static testMethod void test_getInactiveContactsByFilter_UseCase2(){
  	String strValidSearchKeyValue = '';
    List<Account> account_Obj  =  [SELECT Name,RecordTypeId from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Contact> contact_Obj  =  [SELECT LastName,RecordTypeId,hed__Primary_Organization__c from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    ContactController obj01 = new ContactController();
    ContactController.getInactiveContactsByFilter('01p90000006uk2w',strValidSearchKeyValue);
  }
}