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
/**
 * @File Name          : BulkRecordUpdaterController.cls
 * @Description        : 
 * @Author             : Rahul
 * @Group              : 
 * @Last Modified By   : Rahul
 * @Last Modified On   : 1/8/2020, 12:52:09 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
* 1.0    12/19/2019          Rahul                  Initial Version
**/
public with sharing class BulkRecordUpdaterController {

    
    public String GuestUserId{get;set;}
    public String selectedObject{get;set;}
    public String newOwner{get;set;}
    public String newOwnerName{get;set;}
    public Boolean runAgain{get;set;}
    public Boolean hasError{get;set;}
    public String errorMessage{get;set;}
    public String selectUserName{get;set;}
    public List<User> users{get;set;}
    
    public BulkRecordUpdaterController() {
    	users = new List<User>();
    }
    /**
    * @description 
    * @author Rahul | 12/19/2019 
    * @return List<User> 
    **/
    public List<SelectOption> getSiteGuestUsers(){
        List<User> guestUsers = [Select Id, Name from User where userType = 'Guest' and isActive = true];
        List<SelectOption> options = new List<SelectOption>();
        for(User u: guestUsers){
            options.add(new SelectOption(String.valueOf(u.Id), u.Name));
        }
        return options;
    }

    /**
    * @description 
    * @author Rahul | 12/19/2019 
    * @return void 
    **/
    public List<SelectOption> getAllSobjects(){
        Map <String, Schema.SObjectType> describedMap = Schema.getGlobalDescribe();
        List<SelectOption> options = new List<SelectOption>();
        Set<String> customSettingStdObjectListToInclude = new Set<String>{'Account', 'Lead', 'Contact', 'Opportunity', 'Product', 'Campaign'};
        Set<String> defaultStdObjectListToInclude = Std_object_Api_Name__c.getAll().keySet();
        Set<String> stdObjectListToInclude = new Set<String>();
        stdObjectListToInclude.addAll(customSettingStdObjectListToInclude);
        stdObjectListToInclude.addAll(defaultStdObjectListToInclude);
        for(String apiName : describedMap.keySet()){
            Schema.DescribeSObjectResult objDescribe =  describedMap.get(apiName).getDescribe();
            if(stdObjectListToInclude.contains(objDescribe.getName()) || objDescribe.isCustom()){
                options.add(new SelectOption(objDescribe.getName(), objDescribe.getLabel()));
            }
			 
		}
        return options;
    }

    /**
    * @description 
    * @author Rahul | 12/21/2019 
    * @return pageReference
    **/
    public pageReference getStandardUsers(){
        if(String.IsBlank(selectUserName)) {
        	selectUserName = '';
		} else {
			selectUserName = String.escapeSingleQuotes(selectUserName.trim());
			selectUserName = selectUserName.replace('%','\\%').replace('_','\\_');
		}
        String query = 'SELECT Id, Name, Username, Profile.Name FROM User WHERE isActive = true AND Profile.Name != Null AND (Name LIKE \'%' + selectUserName + '%\' OR Username LIKE \'%' + selectUserName + '%\' ) LIMIT 100';
        users = Database.query(query);
        return null;
    }
    
    /**
    * @description To clear user list.
    * @author Rahul
    * @return pageReference 
    **/
    public pageReference setNewOwnerId() {
    	users.clear();
    	return null;
    }
    
    /**
    * @description 
    * @author Rahul | 12/21/2019 
    * @return void 
    **/
    public Pagereference applyChanges(){
        try{
            runAgain = false;
            hasError = false;
            errorMessage='';
            Guest_package_setting__c setting = Guest_package_setting__c.getOrgDefaults();
            Integer maxRecordSize = 200;
            if(setting!=null && setting.Records_Size__c!=null && setting.Records_Size__c > 0){
                maxRecordSize = Integer.valueOf(setting.Records_Size__c);
            }
            String query = 'Select Id, OwnerId from '+ selectedObject +' where ownerId=:GuestUserId  Limit 50000';
            List<sObject> records = Database.query(query);
            List<sObject> recordsToUpdate = new List<sObject>();
            Integer recordCount = 0;
            for(sObject record: records){
                if(recordCount < maxRecordSize){
                    record.put('ownerId', newOwner);
                    recordsToUpdate.add(record);
                    recordCount++;
                }else{
                    runAgain = true;
                    break;
                }
            }
            if(recordsToUpdate.size()>0){
                update records;
            }
        }catch(Exception e){
            hasError = true;
            errorMessage = e.getMessage();
        }
        return null;
    }
}