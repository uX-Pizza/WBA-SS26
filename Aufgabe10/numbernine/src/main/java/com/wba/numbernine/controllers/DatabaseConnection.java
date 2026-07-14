package com.wba.numbernine.controllers;

import com.wba.numbernine.DataStruktures.Artefact;
import com.wba.numbernine.DataStruktures.Project;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.Date;
import java.util.List;
import java.util.Map;


@Repository
public class DatabaseConnection {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseConnection(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public Artefact findminArtefacttime() throws Exception {

        try {
            String sql = "SELECT id, titel, planedtime FROM artefakt ORDER BY planedtime ASC LIMIT 1";

            RowMapper<Artefact> artefactRowMapper = (rs, rowNum) -> new Artefact(
                    rs.getString("id"),
                    rs.getString("titel"),
                    rs.getInt("planedtime")
            );

            return jdbcTemplate.queryForObject(sql, artefactRowMapper);
        } catch (DataAccessException e){
            throw new Exception("Database Connection faild");
        }
    }
    public Artefact findmaxArtefacttime() throws Exception {

        try {
            String sql = "SELECT id, titel, planedtime FROM artefakt ORDER BY planedtime DESC LIMIT 1";

            RowMapper<Artefact> artefactRowMapper = (rs, rowNum) -> new Artefact(
                    rs.getString("id"),
                    rs.getString("titel"),
                    rs.getInt("planedtime")
            );

            return jdbcTemplate.queryForObject(sql, artefactRowMapper);
        }
        catch (DataAccessException e){
            throw new Exception("Database Error");
        }



    }

    public int calcSpanInJava() throws Exception {
        Artefact max = findmaxArtefacttime();
        Artefact min = findminArtefacttime();

        return max.getPlanedtime() - min.getPlanedtime();
    }

    public Map<String, Object> calcMinMaxSpanSQL(){

        try {
            String sql = "SELECT MIN(planedtime) as min_val, MAX(planedtime) AS max_val, MAX(planedtime) - MIN(planedtime) as span_val FROM artefakt";

            return jdbcTemplate.queryForMap(sql);
        }
        catch (DataAccessException e){

            return Map.of(
                    "error", "Database accsess faild"
            );
        }
    }

    public Map<String, Object> getProject(String id){
        try {
            String sql = "SELECT * FROM project WHERE id = ?";

            return jdbcTemplate.queryForMap(sql, id);
        }
        catch (DataAccessException e){
            return Map.of("error", "Project not found"
                );
        }
    }

    public List<Map<String, Object>> getAllProject() {
        try {
            String sql = "SELECT * FROM project";


            return jdbcTemplate.queryForList(sql);
        }
        catch (DataAccessException e) {

            System.err.println("Datenbankfehler: " + e.getMessage());
            return List.of();
        }
    }

    public List<Map<String, Object>> getNewest(){
        try {
            String sql = "SELECT * FROM project ORDER BY id DESC LIMIT 3";
            //System.out.println(jdbcTemplate.queryForList(sql));
            return jdbcTemplate.queryForList(sql);
        }
        catch (DataAccessException e){
            System.err.println(("Datenbankfehler " + e.getMessage()));
            return List.of();
        }

    }

    public String generateNextId() {
        // 1. Suche die höchste ID in der Tabelle
        String sql = "SELECT MAX(id) FROM project";
        String maxId = jdbcTemplate.queryForObject(sql, String.class);

        int nextNumber = 1; // Default, falls Tabelle leer ist

        if (maxId != null && maxId.startsWith("proj-")) {
            try {
                // Extrahiere den Teil nach "proj-"
                String numberPart = maxId.substring(5);
                nextNumber = Integer.parseInt(numberPart) + 1;
            } catch (NumberFormatException e) {
                // Fallback, falls ID-Format nicht passt
            }
        }

        // 2. Formatierung auf "proj-01" (z.B. %02d sorgt für führende Null)
        return String.format("proj-%02d", nextNumber);
    }

    public String insertProject(String name, String shortdesc, String longdesc,
                              String logourl, String maintainer, String start_date, String end_date) {

        String newId = generateNextId();

        String sql = "INSERT INTO project (id, name, shortdesc, longdesc, logourl, maintainer, start_date, end_date) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        Date startDate = null;
        Date endDate = null;

        try {
            if (start_date != null && !start_date.isBlank()) {
                startDate = Date.valueOf(start_date);
            }
            if (end_date != null && !end_date.isBlank()) {
                endDate = Date.valueOf(end_date);
            }
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Ungültiges Datumsformat: " + e.getMessage(), e);
        }

        jdbcTemplate.update(sql, newId, name, shortdesc, longdesc, logourl, maintainer, startDate, endDate);

        return newId;
    }
}