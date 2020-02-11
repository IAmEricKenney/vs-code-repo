@ IsTest
public class ContactController_Test {
	@IsTest
	static void createContact() {
		Account a = new Account();
		a.RecordTypeId = '0120B000000apZxQAI';
		a.Name = 'Acute and Chronic Care';
		insert a;

		Test.startTest();
		List<Contact> con = new List<Contact>();
		for (Integer count = 0; count < 10; count ++) {
			Contact c = new Contact();
			String ln = count + 'Frost' + count;
			c.LastName = ln;
			String fn = count + 'Jack' + count;
			c.FirstName = fn;
			c.hed__AlternateEmail__c = ln + count + '@' + fn + count + '.com';
			c.hed__Primary_Organization__c = a.id;
			c.RecordTypeId = '0120d000000Q914AAC';
			c.Credentials__c = 'ABC' + count;
			c.Employment_Status__c = 'Full-Time';
			c.Title = 'Fake Title' + count;
			c.hed__Preferred_Email__c = 'Alternate';
			c.Career_Line__c = 'Adjunct';
			con.Add(c);
		}
		insert con;

		con = [SELECT Id, FirstName, LastName, Career_Line__c FROM Contact
				   WHERE Career_Line__c = 'Adjunct'];

		for (Contact c :con) {
			Integer conCount = con.size();
			System.assertEquals(10, conCount);

        }

		List<Contact> con2 = new List<Contact>();
		for (Integer count = 0; count < 10; count ++) {
			Contact c = new Contact();
			String ln = count + 'Disney' + count;
			c.LastName = ln;
			String fn = count + 'Walt' + count;
			c.FirstName = fn;
			c.hed__AlternateEmail__c = ln + count + '@' + fn + count + '.com';
			c.hed__Primary_Organization__c = a.id;
			c.RecordTypeId = '0120d000000Q914AAC';
			c.Credentials__c = 'ABC' + count;
			c.Employment_Status__c = 'Retired';
			c.Title = 'Fake Title' + count;
			c.hed__Preferred_Email__c = 'Alternate';
			c.Career_Line__c = 'Clinical';
			con2.Add(c);
		}
		insert con2;

		con2 = [SELECT Id, FirstName, LastName, Career_Line__c FROM Contact
				   WHERE Career_Line__c = 'Clinical'];

		for (Contact c :con2) {
			Integer conCount = con2.size();
			System.assertEquals(10, conCount);
        }
        Test.stopTest();
	}
}