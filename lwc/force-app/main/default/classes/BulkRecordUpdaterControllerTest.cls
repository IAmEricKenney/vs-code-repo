/**
	@company : Copyright © 2016, Enrollment Rx, LLC
	All rights reserved.
	Redistribution and use in source form, with or without modification, are prohibited without the express written consent of Enrollment Rx, LLC.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
	SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
	IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	@website : http://www.enrollmentrx.com/
	@author EnrollmentRx 
	@version 1.0
*/
@isTest(SeeAllData=false)
private class BulkRecordUpdaterControllerTest {
    @testSetup
    static void testSetup() {
        List<User> userList = new List<User>();
        //Guest User
        Profile guestProfile = [SELECT Id, Name FROM Profile WHERE UserType = 'Guest' LIMIT 1];
        User gUser = new User(firstname = 'guestUserTestERx',
                            lastName = 'guestUserLastname',
                            email = 'guestUser@erx.org',
                            Username = 'guestUser@erx.org',
                            EmailEncodingKey = 'ISO-8859-1',
                            Alias ='guser',
                            TimeZoneSidKey = 'America/Los_Angeles',
                            LocaleSidKey = 'en_US',
                            LanguageLocaleKey = 'en_US',
                            ProfileId = Id.valueOf(guestProfile.Id),
                            UserRoleId = NULL);
        userList.add(gUser);
        //Standard User
        Profile standardProfile = [SELECT Id, Name FROM Profile WHERE UserType = 'Standard' LIMIT 1];
        UserRole uRole = [SELECT Name, Id FROM UserRole WHERE Name = 'CEO'];
        User sUser = new User(firstname = 'standardUserTestERx',
                            lastName = 'standardUserLastname',
                            email = 'standardUser@erx.org',
                            Username = 'standardUser@erx.org',
                            EmailEncodingKey = 'ISO-8859-1',
                            Alias ='suser',
                            TimeZoneSidKey = 'America/Los_Angeles',
                            LocaleSidKey = 'en_US',
                            LanguageLocaleKey = 'en_US',
                            ProfileId = standardProfile.Id,
                            UserRoleId = uRole.Id);
        userList.add(sUser);
        //insert users
        insert userList;
        System.debug('usetup->' + userList);
    }
    
    @isTest
    static void testApplyChanges() {
        List<User> userList = [SELECT Id, Name, firstname FROM User WHERE FirstName = 'guestUserTestERx' OR FirstName = 'standardUserTestERx'];
        System.debug('userList' + userList);
        Id guestuserId, standardUserId;
        for(User userRecord : userList) {
            if(userRecord.firstname == 'guestUserTestERx') {
                guestuserId = userRecord.Id;
                System.debug('gId->' + guestuserId);
            } else if(userRecord.firstname == 'standardUserTestERx') {
                standardUserId = userRecord.Id;
                System.debug('sId->' + standardUserId);
            }
        }
        //test contact
        Contact testContact = new Contact(LastName='ErxSecurityTestContact', OwnerId=guestuserId);
        insert testContact;
        
        Test.startTest();
        BulkRecordUpdaterController controller = new BulkRecordUpdaterController();
        controller.GuestUserId = String.valueOf(guestuserId);
        controller.selectedObject = 'Contact';
        controller.newOwner = String.valueOf(standardUserId);
        controller.applyChanges();
        Test.stopTest();
        List<Contact> changedContact = [SELECT Name, OwnerId FROM Contact LIMIT 100];
        System.assertEquals(standardUserId, changedContact[0].OwnerId);
    }
    
    @isTest
    static void testGetSiteGuestUsers() {
        Test.startTest();
        BulkRecordUpdaterController controller = new BulkRecordUpdaterController();
        List<SelectOption> options = controller.getSiteGuestUsers();
        Test.stopTest();
        System.assertEquals(true, options.size() > 0);
    }
    
    @isTest
    static void testGetAllSobjects() {
        Test.startTest();
        BulkRecordUpdaterController controller = new BulkRecordUpdaterController();
        List<SelectOption> options = controller.getAllSobjects();
        Test.stopTest();
        System.assertEquals(true, options.size() > 0);
    }
    
    @isTest
    static void testGetStandardUsers() {
        Test.startTest();
        BulkRecordUpdaterController controller = new BulkRecordUpdaterController();
        controller.selectUserName = 'standardUserTestERx';
        controller.newOwnerName = 'standardUserTestERx standardUserLastname';
        controller.getStandardUsers();
        System.assertEquals(true, controller.users.size() > 0);
        controller.setNewOwnerId();
        System.assertEquals(true, controller.users.size() == 0);
        Test.stopTest();
    }
}