public class ContactController {
  @AuraEnabled(cacheable = true) 
  public static List<Contact> getRelatedContactsByFilter(Id accountId, String key) {
		String inactive = '\'Inactive\'';
	 	String retired = '\'Retired\'';
	  	String query = 'SELECT Id, FirstName, Name_and_Credentials__c, Title, Career_Line__c,' +
	  			'Employment_Status__c ' +
		  		'FROM Contact WHERE hed__Primary_Organization__c=:accountId ';
		String status = 'AND (Employment_Status__c !=' + inactive + ' OR Employment_Status__c !=' + retired + ') ';
    	String order = 'ORDER BY FirstName ASC LIMIT 125';

		//when method called on initial page load  key will be blank - this avoid filtering on empty career line options
		if(key != null && key != '') {
			List<String> keyList = new List<String>(parseJSON(key));
			Set<String> keySet = new Set<String>(keyList);
			query = query + ' AND Career_Line__c IN :keySet ' + status + order;
		} else {
			query = query + status + order;
		}   
		return Database.query(query);
	}

  @AuraEnabled(cacheable = true) 
  public static List<Contact> getInactiveContactsByFilter(Id accountId, String key) {
	  	String inactive = '\'Inactive\'';
	  	String retired = '\'Retired\'';
	  	String query = 'SELECT Id, FirstName, Name_and_Credentials__c, Title, Career_Line__c, Employment_Status__c ' +
      		'FROM Contact WHERE hed__Primary_Organization__c=:accountId ';
    	String inacstat = 'AND (Employment_Status__c =' + inactive + ' OR Employment_Status__c =' + retired + ') ';
    	String order = 'ORDER BY FirstName ASC LIMIT 125';
	
		//when method called on initial page load  key will be blank - this avoid filtering on empty career line options
    if (key != null && key != '') 
    {
		List<String> keyList = new List<String>(parseJSON(key));
		Set<String> keySet = new Set<String>(keyList);
			query = query + ' AND Career_Line__c IN :keySet ' + inacstat + order;
    } else {
			query = query + inacstat + order;
		}   
		return Database.query(query);
	}

	private static List<String> parseJSON(String json) {
		return (List<String>) System.JSON.deserialize(json, List<String>.class);
	}
}
