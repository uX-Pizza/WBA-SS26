package com.wba.numbernine.controllers;

import com.wba.numbernine.DataStruktures.Project;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/getnewest")
    public List<Map<String, Object>> getNewest(){
        System.out.println(databaseConnection.getNewest());
        return databaseConnection.getNewest();
    }

    @PostMapping("/sendToDatabase")
    public ResponseEntity<String> sendProjectDatatoDatabase(
                                          @RequestParam String name,
                                          @RequestParam String shortdesc,
                                          @RequestParam String longdesc,
                                          @RequestParam String logourl,
                                          @RequestParam String maintainer,
                                          @RequestParam String start_date,
                                          @RequestParam String end_date){

        String newId =databaseConnection.insertProject(name, shortdesc, longdesc, logourl, maintainer, start_date, end_date);
        return ResponseEntity.ok(newId);
    }

}
