# Experiment 6 - Linking Jira with Confluence
**CO2** | Tools: Jira + Confluence

## Steps
1. In Confluence create a page titled **Library Management System Project Overview**.
2. Insert `/Jira issues` macro -> choose *Advanced search* -> JQL:
   ```
   project = LMS AND sprint = "LMS Sprint 1" ORDER BY status
   ```
   Show columns: Key, Summary, Status, Assignee. Include at least 5 issues (use those from Experiment 4).
3. Add `/Jira issues` macro in **Count** mode (or *Jira Chart: Pie*) grouped by status to show To Do / In Progress / Done.
4. Add a progress bar: use the **Status** or **Progress** macro / a table with the *Jira Chart* macro. For a manual bar insert a table:

   | Task | Status | Progress |
   |---|---|---|
   | Create user registration page | Done | 100% |
   | Develop API for login | In Progress | 50% |
   | Create user login page | In Progress | 50% |
   | Develop book search functionality | To Do | 0% |
   | Design database schema | Done | 100% |

   Overall progress = completed / total issues.
5. Screenshot the page (`screenshots/confluence-page.png`).

## Evidence
![confluence](screenshots/confluence-page.png)
