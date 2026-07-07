package com.wba.numbernine;

import com.wba.numbernine.DataStruktures.Artefact;
import com.wba.numbernine.controllers.DatabaseConnection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class DatabseConnectionTest {

    @Autowired
    private DatabaseConnection databaseConnection;

    @Test
    void testFindMaxArtefact(){

        Artefact maxArtefact = databaseConnection.findmaxArtefacttime();

        assertThat(maxArtefact).isNotNull();
        System.out.println("Artefakt: " + maxArtefact);
    }
}
