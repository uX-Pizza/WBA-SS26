package com.wba.numbernine.controllers;

import com.wba.numbernine.DataStruktures.Project;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projectsdata")
public class ProjectData {

    private final DatabaseConnection databaseConnection;

    public ProjectData(DatabaseConnection db){
        databaseConnection = db;
    }

    @GetMapping("/getProject")
    public Map<String, Object> getProject(@RequestParam String id){

        return databaseConnection.getProject(id);
    }

    @GetMapping("/getAllProjects")
    public List<Map<String, Object>> getAllProject(){

        return databaseConnection.getAllProject();
    }

    @PostMapping("/sendToDatabase")
    public void sendProjectDatatoDatabase(@RequestParam Project project){

    }

    @GetMapping("/getnewest")
    public List<Map<String, Object>> getNewest(){
        System.out.println(databaseConnection.getNewest());
        return databaseConnection.getNewest();
    }
}
