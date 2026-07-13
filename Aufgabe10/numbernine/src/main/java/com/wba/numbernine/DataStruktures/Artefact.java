package com.wba.numbernine.DataStruktures;

public class Artefact {
    String id;
    String name;
    String shortdesc;
    String longdesc;
    int planedtime;
    int realtime;
    int task_id;

    public Artefact(String id, String name, String shortdesc, String longdesc, int planedtime, int realtime, int task_id){
        this.id = id;
        this.name = name;
        this.shortdesc = shortdesc;
        this.longdesc = longdesc;
        this.planedtime = planedtime;
        this.realtime = realtime;
        this.task_id = task_id;
    }
    public Artefact(String id, String name, int planedtime){
        this.id = id;
        this.name = name;
        this.planedtime = planedtime;
    }

    public int getPlanedtime(){
        return planedtime;
    }

}
