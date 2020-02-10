public without sharing class ContactController {
  @AuraEnabled(cacheable = true) 
  public static List<Contact> getRelatedContacts(Id accountId) {
		return [select Id, FirstName, Name_and_Credentials__c, Title, Career_Line__c from Contact where
			    hed__Primary_Organization__c = :accountId and
				(Career_Line__c = 'Adjunct' OR Career_Line__c = 'Clinical' OR Career_Line__c = 'Research' 
				OR Career_Line__c = 'Tenure Track') ORDER BY FirstName ASC LIMIT 125];
	}

  @AuraEnabled(cacheable = true) 
  public static List<Contact> getRelatedContactsByFilter(Id accountId, String key) {
   // system.debug('Key is: ' + key);
   // orig query          
   //String query = 'select Id, Name_and_Credentials__c, Title, Career_Line__c from Contact where ' +
   //'hed__Primary_Organization__c=:accountId and Career_Line__c like \'%' + key + '%\'';
              
    String query = 'SELECT Id, FirstName, Name_and_Credentials__c, Title, Career_Line__c from Contact where ' +
    'hed__Primary_Organization__c=:accountId ORDER BY FirstName ASC LIMIT 125';
              
     //when method called on initial page load  key will be blank - this avoid filtering on empty career line options
    if (key != null && key != ''){ 
      List<String> keyList = new List<String>(parseJSON(key));
      Set<String> keySet = new Set<String>(keyList);
      query = query + ' AND Career_Line__c IN :keySet ORDER BY FirstName ASC LIMIT 125';
     }
		return Database.query(query);
	}
  
  
 private static List<String> parseJSON(String json) {
		return (List<String>) System.JSON.deserialize(json, List<String>.class);
	}
}
