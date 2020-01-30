@isTest
private class SuperCloneServiceTest{
    @testSetup static void createData(){
        // Test assumes that admin has already created the object entries in Custom Metadata Object need to run the SuperClone class    
        // Create one test records for program plan and plan requirements objects
        
        hed__Program_Plan__c programPlan = New hed__Program_Plan__c(Name = 'Sample_Program_Plan');
        insert programPlan;
        System.Debug('Added hed__Program_Plan__C file with Id: ' + programPlan.Id);
        
        hed__Plan_Requirement__c planRequirement = New hed__Plan_Requirement__c(Name = 'Sample_Plan_Requirement', hed__Program_Plan__c = programPlan.Id);  
        // ToDo: verify that hed__Plan_Requirement__c.hed__Program_Plan__c is proper api name
        insert planRequirement;
        System.Debug('Added hed__Plan_Requirement__c record with id: ' + planRequirement.Id);
    }


    @isTest static void doCloneTest() {
    
        hed__Program_Plan__c recordToClone = [Select Name, Id from hed__Program_Plan__c where Name = 'Sample_Program_Plan' LIMIT 1]; 
        Id cloneId = recordToClone.Id;
        System.Debug('Test will clone hed_Program_Plan__c record with Id ' + cloneId);

        // ToDo: Add a check to ensure cloneId value is not null before starting the test.
       
        Integer planCount = 0;
        Integer reqCount = 0;
        
        // SuperCloneService
        SuperCloneService scs = new SuperCloneService();
        
        Test.StartTest();
            scs.doClone(cloneId);
        Test.StopTest();
        
        List<hed__Program_Plan__c> programPlans = [Select Name from hed__Program_Plan__c where Name = 'Sample_Program_Plan'];
        planCount = programPlans.size();
        system.debug('Program Plan Record Count: ' + planCount);
        System.assertEquals(2, planCount);
        
        List<hed__Plan_Requirement__c> planRequirements  = [Select Name from hed__Plan_Requirement__c where Name = 'Sample_Plan_Requirement' ];
        reqCount = planRequirements.size();
        system.debug('Plan Requirement Count: ' + reqCount);
        system.assertEquals(2, reqCount);
        
    }
}