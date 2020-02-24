public without sharing class updateCourseConnectionOwner {
    public updateCourseConnectionOwner(hed__Course_Enrollment__c cc, User us) {
                 cc.OwnerId = us.Id;
                 update cc;
            }
      }