@isTest
private class ConfigSelfReg_Test{
@testSetup
  static void setupTestData(){
    test.startTest();
    Contact contact_Obj = new Contact(LastName = 'LastName555', Email = 'Email42@test.com');
    Insert contact_Obj; 
    User user_Obj = new User(Username = 'TestUser7771720200217100354@codecoverage.com', LastName = 'LastName787', Email = 'Email24@test.com', 
                             EmailPreferencesAutoBcc = false, EmailPreferencesAutoBccStayInTouch = false, EmailPreferencesStayInTouchReminder = false, 
                             Alias = 'Alias612', CommunityNickname = 'cNickName63447', IsActive = true, TimeZoneSidKey = 'Pacific/Kiritimati', LocaleSidKey = 'sq_AL', 
                             EmailEncodingKey = 'UTF-8', ProfileId = '00e0B000000uLLv', LanguageLocaleKey = 'en_US', ContactId = contact_Obj.id
                             );
    Insert user_Obj; 
    test.stopTest();
  }
  static testMethod void test_createUser_UseCase1(){
    List<Contact> contact_Obj  =  [SELECT Id,LastName,Email from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    List<User> user_Obj  =  [SELECT Username,LastName,Email,Alias,CommunityNickname,IsActive,TimeZoneSidKey,
                             LocaleSidKey,EmailEncodingKey,ProfileId,LanguageLocaleKey,ContactId from User];
    System.assertEquals(true,user_Obj.size()>0);
    AutocreatedConfigSelfReg1581097351244 obj01 = new AutocreatedConfigSelfReg1581097351244();
    obj01.createUser('01p90000006uk2w','01p90000006uk2w',new Map<SObjectField,String>(),'T3st_D@t@');
  }

    static testMethod void test_createUser_UseCase2(){
    List<Contact> contact_Obj  =  [SELECT Id,LastName,Email from Contact];
    System.assertEquals(true,contact_Obj.size()>0);
    List<User> user_Obj  =  [SELECT Username,LastName,Email,Alias,CommunityNickname,IsActive,TimeZoneSidKey,
                             LocaleSidKey,EmailEncodingKey,ProfileId,LanguageLocaleKey,ContactId from User];
    System.assertEquals(true,user_Obj.size()>0);
    AutocreatedConfigSelfReg1581097351244 obj01 = new AutocreatedConfigSelfReg1581097351244();
    contact_Obj[0].LastName='LastName743';
    contact_Obj[0].Email = 'tsteml@tgenbooster.com';
    Update contact_Obj[0];
    user_Obj[0].Username='TestUser9267620200217100354@tgenbooster.com';
    user_Obj[0].LastName='LastName386';
    user_Obj[0].Email = 'tsteml@tgenbooster.com';
    user_Obj[0].Alias='Alias775';
    user_Obj[0].CommunityNickname='NckName39471';
    user_Obj[0].IsActive=false;
    user_Obj[0].TimeZoneSidKey='Pacific/Kiritimati';
    user_Obj[0].LocaleSidKey='sq_AL';
    user_Obj[0].EmailEncodingKey='UTF-8';
    user_Obj[0].ProfileId = '00e0B000000uLLv';
    user_Obj[0].LanguageLocaleKey='en_US';
    user_Obj[0].ContactId = contact_Obj[0].Id;
    //user_Obj[0].Type not recognized;
    Update user_Obj[0];
    obj01.createUser('01p90000006uk2w','01p90000006uk2w',new Map<SObjectField,String>(),'test data');
  }
}