package com.wba.numbernine.controllers;

import com.wba.numbernine.DataStruktures.Artefact;
import com.wba.numbernine.DataStruktures.Project;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
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

            // queryForList(sql) liefert direkt List<Map<String, Object>> zurück!
            return jdbcTemplate.queryForList(sql);
        }
        catch (DataAccessException e) {
            // Logge den Fehler auf der Konsole, damit du siehst, WAS schiefgeht!
            System.err.println("Datenbankfehler: " + e.getMessage());
            return List.of(); // Besser eine leere Liste statt null zurückgeben
        }
    }
}
