@IsTest
public class ProgramEnrollmentPrintPDF_Test {
    
    @TestSetup
    public static void setup(){
        
        Account acct = TestDataFactory.getAccount();
        insert acct;
        
        hed__Course__c course = TestDataFactory.getCourse(acct.Id);
        insert course;        
        
        hed__Program_Plan__c plan = TestDataFactory.getProgPlan();
        insert plan;
        
        hed__Term__c term = TestDataFactory.getProgTerm(acct.Id);
        insert term;
        
        hed__Plan_Requirement__c planReq = TestDataFactory.getPlanReq(plan.Id);
        planReq.hed__Course__c = course.Id;
        planReq.Term__c = term.Id;
        insert planReq;
        
        hed__Program_Enrollment__c enroll = TestDataFactory.getProgEnroll();
        insert enroll;
        
        hed__Course_Offering__c courseOffer = TestDataFactory.getCourseOffer(course.Id, term.Id);
        insert courseOffer;
        
        hed__Course_Enrollment__c courseEnroll = TestDataFactory.getCourseEnroll(enroll.Id, term.Id, courseOffer.Id);
        insert courseEnroll;
        
    }
    
    @IsTest
    public static void pageLoadTest(){
        hed__Program_Enrollment__c plan = [Select Id FROM hed__Program_Enrollment__c LIMIT 1];
        
        ApexPages.StandardController sc = new ApexPages.StandardController(plan);
        Test.setCurrentPage(Page.ProgramEnrollmentPrintPDF);
        
        Test.startTest();
        
        ProgramEnrollmentPrintPDF pdfPage = new ProgramEnrollmentPrintPDF(sc);
        
        Test.stopTest();
    }
}