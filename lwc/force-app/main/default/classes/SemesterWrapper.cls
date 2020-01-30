public class SemesterWrapper{
    public Decimal ttlCredits {
        get{
            if( courses == null || courses.isEmpty() ) return 0;
            
            ttlCredits = 0;
            for( CourseWrapper cw : courses ){
                ttlCredits += cw.credits == null ? 0 : cw.credits;
            }
            
            return ttlCredits;
        }
        private set;
    }
    public CourseWrapper[] courses {get;set;}
    public String name {get;set;}
    
    private SemesterWrapper(){}
    public SemesterWrapper( hed__Plan_Requirement__c req ){
        this();
        this.ttlCredits = 0;
        this.courses = new CourseWrapper[0];
        this.name = req.Term__r.Name;
    }
    public SemesterWrapper( hed__Course_Enrollment__c enr ){
        this.ttlCredits = 0;
        this.courses = new CourseWrapper[0];
        this.name = enr.Term__r.Name;
    }
    
    public void addCourse( hed__Plan_Requirement__c req ){
        if( courses == null ) courses = new CourseWrapper[0];
        
        courses.add(new CourseWrapper(req));
        this.ttlCredits += req.hed__Course__r.Credits_Min__c == null ? 0 : req.hed__Course__r.Credits_Min__c;
    }
    public void addCourse( hed__Course_Enrollment__c enr ){
        if( courses == null ) courses = new CourseWrapper[0];
        
        courses.add(new CourseWrapper(enr));
        this.ttlCredits += enr.hed__Course_Offering__r.Credit_Hours_Minimun__c == null ? 0 : enr.hed__Course_Offering__r.Credit_Hours_Minimun__c;
    }
    
    public class CourseWrapper{
        public String name {get;set;}
        public Decimal credits {get;set;}
        public String courseId {get;set;}
        
        private CourseWrapper(){}
        public CourseWrapper( hed__Plan_Requirement__c req ){
            this();
            this.name = req.hed__Course__r.Name;
            this.credits = req.hed__Course__r.Credits_Min__c;
            this.courseId = req.hed__Course__r.hed__Course_ID__c;
        }
        public CourseWrapper( hed__Course_Enrollment__c enr ){
            this();
            this.name = enr.hed__Course_Offering__r.hed__Course__r.Name;
            this.credits = enr.hed__Course_Offering__r.Credit_Hours_Minimun__c;
            this.courseId = enr.hed__Course_Offering__r.Name;
        }
    }
}