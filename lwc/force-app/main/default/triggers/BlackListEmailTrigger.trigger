trigger BlackListEmailTrigger on Case (after insert, after update) {
Case cs = [select SuppliedEmail from Case where id =:trigger.new[0].id];
    String supEmail = cs.suppliedemail;
        if (supEmail != NULL && (supEmail.contains('zamudiospaintings.com') || supEmail.contains('mail.careermd.com'))) {
            delete [select id from Case where id in : Trigger.new];
        } 
    }