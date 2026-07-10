-- 1. Tabelle für die Projekte erstellen
CREATE TABLE project (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    shortdesc TEXT,
    longdesc TEXT,
    logourl VARCHAR(2048),
    maintainer VARCHAR(100),
    start_date DATE,
    end_date DATE
);

-- 2. Tabelle für die Tasks erstellen (Hat eine Beziehung zu Project)
CREATE TABLE task (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    shortdesc TEXT,
    project_id VARCHAR(50),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

-- 3. Tabelle für die Artefakte erstellen (Hat eine Beziehung zu Task)
CREATE TABLE artefakt (
    id VARCHAR(50) PRIMARY KEY,
    titel VARCHAR(255) NOT NULL,
    shortdesc TEXT,
    longdesc TEXT,
    planedtime INT, -- Zeit in Minuten oder Stunden abspeichern
    realtime INT,
    task_id VARCHAR(50),
    CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE SET NULL
);