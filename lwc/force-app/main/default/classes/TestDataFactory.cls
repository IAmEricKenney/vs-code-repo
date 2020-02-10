public class TestDataFactory {
	
    public static Account getAccount(){
        return new Account(
        	Name = 'Test'
        );
    }
    public static Account getOrganization(){
        return new Account(
            Name = 'Acute and Chronic Care',
            RecordTypeId = '0120B000000apZxQAI'
        );
    }
    public static Contact getFaculty(Id accountId){
        return new Contact(
            LastName = 'Faculty',
            FirstName = 'Test',
            hed__AlternateEmail__c = 'noemail@noemail.com',
            hed__Preferred_Email__c = 'Alternate',
            hed__Primary_Organization__c = accountId,
            Credentials__c = 'ABC',
            Employment_Status__c = 'Full-Time',
            Career_Line__c = 'Adjunct',
            Title ='Fake Title',
            RecordTypeId = '0120d000000Q914AAC'
        );
    }
    
    // HED namespace
    public static hed__Term__c getProgTerm( Id accountId ){
        return new hed__Term__c(
        	Name = 'Test'
            , hed__Account__c = accountId
            , Term_Code__c = 'fall1'
        );
    }
    
    public static hed__Course__c getCourse( Id accountId ){
        return new hed__Course__c(
        	Name = 'Test'
            , hed__Account__c = accountId
            , Status__c = 'Active'
            , Course_Type__c = 'Elective'
        );
    }
    
    public static hed__Course_Enrollment__c getCourseEnroll( Id enrollId, Id termId, Id courseOfferId ){
        return new hed__Course_Enrollment__c(
            hed__Program_Enrollment__c = enrollId
            , Term__c = termId
            , hed__Course_Offering__c = courseOfferId
            , hed__Status__c = 'Enrolled'
        );
    }
    
    public static hed__Course_Offering__c getCourseOffer( Id courseId, Id termId ){
        return new hed__Course_Offering__c(
        	Name = 'test'
            , hed__Course__c = courseId
            , hed__Term__c = termId
        );
    }
    
    public static hed__Program_Enrollment__c getProgEnroll(){
        return new hed__Program_Enrollment__c(
        	//Name = 'Test'
        );
    }
    
    public static hed__Plan_Requirement__c getPlanReq( Id planId ){
        return new hed__Plan_Requirement__c(
        	Name = 'Test'
            , hed__Program_Plan__c = planId
        );
    }
    
    public static hed__Program_Plan__c getProgPlan(){
        return new hed__Program_Plan__c(
        	Name = 'Test'
        );
    }
    
}