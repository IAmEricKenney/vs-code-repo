public class Program_Plan_Print_PDF {
    Id programPlanId;
    public SemesterWrapper[] semesters {get;set;}
    public static Decimal totalCredits {get;set;}
    
    public Program_Plan_Print_PDF(ApexPages.StandardController sc){
        this.programPlanId = sc.getId();
        
        getRequirements();
    }
    
    public void getRequirements(){
        semesters = buildWrappers([
            SELECT Id
            , Term__c, Term__r.Name, Term__r.Term_Code__c
            , hed__Course__c, hed__Course__r.Name, hed__Course__r.Credits_Min__c
            , hed__Course__r.hed__Course_ID__c
            FROM hed__Plan_Requirement__c
            WHERE hed__Program_Plan__c = :programPlanId
            AND hed__Course__r.Status__c = 'Active'
            AND Term__r.Term_Code__c != null
            ORDER BY Term__r.Term_Code__c ASC, hed__Course__r.Name
        ]);
    }
    
    public static SemesterWrapper[] buildWrappers( hed__Plan_Requirement__c[] reqs ){
        SemesterWrapper[] semWraps = new SemesterWrapper[0];
        
        //used to track the previous value so I can tell when we switch terms
        String termCode;
        //held outside of loop to add multiple courses to it before adding it to the semWraps var
        SemesterWrapper semWrap;
        for( hed__Plan_Requirement__c req : reqs ){
            
            system.debug('make new sem wrap? ' + termCode + ' != ' + req.Term__r.Term_Code__c );
            if( termCode != req.Term__r.Term_Code__c ){
                //set term code to compare against next iteration
                termCode = req.Term__r.Term_Code__c;
                
                //add sem wrap after each new Term or Semester
                if( semWrap != null ) semWraps.add(semWrap);
                semWrap = new SemesterWrapper(req);
            }
            
            semWrap.addCourse(req);
        }
        //add sem wrap after adding the last req
        if( semWrap != null && !semWrap.courses.isEmpty() ){
            semWraps.add(semWrap);
        }
        
        totalCredits = 0;
        for( SemesterWrapper semester : semWraps ){
            totalCredits += semester.ttlCredits;
        }
        
        return semWraps;
    }
    
}