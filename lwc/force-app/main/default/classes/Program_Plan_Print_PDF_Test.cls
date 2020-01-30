@IsTest
public class Program_Plan_Print_PDF_Test {

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
        
    }
    
    @IsTest
    public static void pageLoadTest(){
        hed__Program_Plan__c plan = [Select Id FROM hed__Program_Plan__c LIMIT 1];
        
        ApexPages.StandardController sc = new ApexPages.StandardController(plan);
        Test.setCurrentPage(Page.Program_Plan_Print_PDF);
        
        Test.startTest();
        
        Program_Plan_Print_PDF pdfPage = new Program_Plan_Print_PDF(sc);
        
        Test.stopTest();
    }
}