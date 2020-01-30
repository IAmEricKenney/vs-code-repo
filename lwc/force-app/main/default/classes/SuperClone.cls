public class SuperClone {
    private static SuperCloneService service = new SuperCloneService();
    @AuraEnabled
    public static Id doClone(Id Program_Plan) {
        Id clonedId = service.doClone(Program_Plan);
        return clonedId;
    }
}