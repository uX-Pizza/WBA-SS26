class SumWorkTime{
    tasks = []
    constructor(...tasks){
        this.tasks = tasks;
    }


    calc_overallworktime(tasks) {
    time = 0;
        for (let estimetedWork in tasks) {
           time += tasks[estimetedWork]
        }
        return time;
    }
}