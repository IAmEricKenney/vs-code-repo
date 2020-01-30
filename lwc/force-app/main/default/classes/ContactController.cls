public without sharing class ContactController {
	@AuraEnabled(cacheable = true) public static List<Contact> getRelatedContacts(Id accountId) {
		return [select Id, Name_and_Credentials__c, Title, Career_Line__c from Contact where
			    hed__Primary_Organization__c = :accountId and
				(Career_Line__c = 'Adjunct' OR Career_Line__c = 'Clinical' OR Career_Line__c = 'Research' 
				OR Career_Line__c = 'Tenure Track')ORDER BY Name_and_Credentials__c ASC];
	}

	@AuraEnabled(cacheable = true) public static List<Contact> getRelatedContactsByFilter(Id accountId, String key) {
		// system.debug('Key is: ' + key);
		String query = 'select Id, Name_and_Credentials__c, Title, Career_Line__c from Contact where ' +
		'hed__Primary_Organization__c=:accountId and Career_Line__c like \'%' + key + '%\'';
		return Database.query(query);
	}
}