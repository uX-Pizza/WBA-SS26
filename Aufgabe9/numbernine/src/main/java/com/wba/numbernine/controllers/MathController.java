package com.wba.numbernine.controllers;

import com.wba.numbernine.DataStruktures.Artefact;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RestController
@RequestMapping("/api/statistic")
public class MathController {

    private final DatabaseConnection databaseConnection;

    public MathController(DatabaseConnection db){
        this.databaseConnection = db;
    }

    @GetMapping("/minmaxspanjava")
    public Map<String, Integer> minmaxspan(){

        Artefact minArtefact = databaseConnection.findminArtefacttime();
        Artefact maxArtefact = databaseConnection.findmaxArtefacttime();

        int min = minArtefact.getPlanedtime();
        int max = maxArtefact.getPlanedtime();
        int span = max- min;

        return Map.of("min", min, "max", max, "span", span);
    }

    @GetMapping("/minmaxspansql")
    public Map<String, Object> minmaxspansql(){

        return databaseConnection.calcMinMaxSpanSQL();
    }

    @GetMapping("/getProject")
    public Map<String, Object> getProject(@RequestParam String id){

        return databaseConnection.getProject(id);
    }
}
