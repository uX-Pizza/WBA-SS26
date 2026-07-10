-- ==================== PROJEKT 1 ====================
INSERT INTO project (id, name, shortdesc, longdesc, logourl, maintainer, start_date, end_date)
VALUES ('proj-01', 'Spacestation', 'Mein Uniprojekt', 'Eine ausführliche Beschreibung...', 'http://logo.de', 'Michael', '2026-04-01', '2026-07-31');

INSERT INTO task (id, name, shortdesc, project_id)
VALUES ('task-01', 'Treibstoff', 'Treibstoff besorgen', 'proj-01'); -- 'proj-01' korrigiert!

INSERT INTO artefakt (id, titel, shortdesc, longdesc, planedtime, realtime, task_id)
VALUES ('art-01', 'Spaceartefakt', 'Short Spaceartefakt', 'Longdescription artefact', 120, 90, 'task-01');


-- ==================== PROJEKT 2 ====================
INSERT INTO project (id, name, shortdesc, longdesc, logourl, maintainer, start_date, end_date)
VALUES ('proj-02', 'Bildverarbeitung', 'Letztes Blatt', 'Das letzte Blatt...', 'http://logo.de', 'Michael', '2026-04-01', '2026-07-31');

INSERT INTO task (id, name, shortdesc, project_id)
VALUES ('task-02', 'Aufgabe1', 'Algorithmen', 'proj-02'); -- Eigene ID 'task-02' und Verweis auf 'proj-02'

INSERT INTO artefakt (id, titel, shortdesc, longdesc, planedtime, realtime, task_id)
VALUES ('art-02', 'Artefakt1', 'Artefakt1', 'Longdescription Artefakt', 120, 90, 'task-02'); -- Eigene ID 'art-02' und Verweis auf 'task-02'


INSERT INTO artefakt (id, titel, shortdesc, longdesc, planedtime, realtime, task_id)
VALUES ('art-04', 'ArtefaktNew', 'ArtefaktNEw', 'Longdescription Artefakt', 50, 55, 'task-03'); -- Eigene ID 'art-02' und Verweis auf 'task-02'

-- ==================== PROJEKT 3 ====================
INSERT INTO project (id, name, shortdesc, longdesc, logourl, maintainer, start_date, end_date)
VALUES ('proj-03', 'Webseite', 'Eigene Webseite', 'Hier soll eine Webseite erstellen', 'http://logo.de', 'Michael', '2026-04-01', '2026-07-31');

INSERT INTO task (id, name, shortdesc, project_id)
VALUES ('task-03', 'Framework', 'Framework auswaehlen', 'proj-03'); -- Eigene ID 'task-03' und Verweis auf 'proj-03'

INSERT INTO artefakt (id, titel, shortdesc, longdesc, planedtime, realtime, task_id)
VALUES ('art-03', 'Framework artefact', 'Framework wahl', 'Hier eine lange beschreibung', 120, 90, 'task-03'); -- Eigene ID 'art-03' und Verweis auf 'task-03'