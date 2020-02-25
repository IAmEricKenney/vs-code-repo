trigger updateCCOwner on hed__Course_Enrollment__c (before insert) {
    User us = new User();
        us = [SELECT Id from User where Id = :UserInfo.getUserId()];
    for (hed__Course_Enrollment__c cc : Trigger.new) {
        If(cc.OwnerId != us.Id) {
            cc.OwnerId = us.Id;
        }
    }
}