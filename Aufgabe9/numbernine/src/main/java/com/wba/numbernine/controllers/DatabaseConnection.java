package com.wba.numbernine.controllers;

import com.wba.numbernine.DataStruktures.Artefact;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@Repository
public class DatabaseConnection {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseConnection(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public Artefact findminArtefacttime(){

        String sql = "SELECT id, titel, planedtime FROM artefakt ORDER BY planedtime ASC LIMIT 1";

        RowMapper<Artefact> artefactRowMapper = (rs, rowNum) -> new Artefact(
                rs.getString("id"),
                rs.getString("titel"),
                rs.getInt("planedtime")
        );

        return jdbcTemplate.queryForObject(sql, artefactRowMapper);
    }
    public Artefact findmaxArtefacttime(){

        String sql = "SELECT id, titel, planedtime FROM artefakt ORDER BY planedtime DESC LIMIT 1";

        RowMapper<Artefact> artefactRowMapper = (rs, rowNum) -> new Artefact(
                rs.getString("id"),
                rs.getString("titel"),
                rs.getInt("planedtime")
        );

        return jdbcTemplate.queryForObject(sql, artefactRowMapper);
    }

    public int calcSpanInJava(){
        Artefact max = findmaxArtefacttime();
        Artefact min = findminArtefacttime();

        return max.getPlanedtime() - min.getPlanedtime();
    }

    public Map<String, Object> calcMinMaxSpanSQL(){

        String sql = "SELECT MIN(planedtime) as min_val, MAX(planedtime) AS max_val, MAX(planedtime) - MIN(planedtime) as span_val FROM artefakt";

        return jdbcTemplate.queryForMap(sql);
    }

    public Map<String, Object> getProject(String id){
        String sql = "SELECT * FROM project WHERE id = ?";

        return jdbcTemplate.queryForMap(sql, id);
    }
}
