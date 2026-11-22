# Experiment 7 - Task Management System: MoSCoW and Kano in Jira
**CO2** | Tool: Jira

## Steps in Jira
1. Create a Scrum (or Kanban) project `TMS`.
2. Import `jira-import.csv` (*Settings > System > External System Import > CSV*), mapping `Labels` -> Labels and `Priority` -> Priority.
   Or create the stories manually and add the labels shown in the table.
3. Add a **Quick filter** per label (Board settings > Quick filters), e.g. `labels = MoSCoW-Must`.
4. Order the backlog: Must -> Should -> Could; within a group put Basic -> Performance -> Attractive.
5. Screenshot the backlog and the filtered views.

## Prioritisation table
| ID | Requirement | MoSCoW | Kano | Rationale |
|---|---|---|---|---|
| 1 | User login and role assignment | Must | Basic | Without authentication and roles no team can use the system safely; users assume it exists |
| 2 | Task creation and assignment | Must | Basic | The core purpose of the product; absence = unusable |
| 3 | Task prioritization and deadlines | Should | Performance | Greatly improves planning; better priority/deadline handling = higher satisfaction |
| 4 | Progress tracking and reporting | Should | Attractive | Dashboards and reports delight managers; basic status tracking can come first |

Full sheet: [`prioritization.xlsx`](prioritization.xlsx)

## Evidence to attach
`screenshots/backlog.png`, `screenshots/must-filter.png`, `screenshots/kano-labels.png`
