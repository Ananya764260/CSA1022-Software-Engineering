# Experiment 8 - Online Learning Platform: MoSCoW and Kano in Jira
**CO2** | Tool: Jira

## Steps in Jira
1. Create a Scrum (or Kanban) project `OLP`.
2. Import `jira-import.csv` (*Settings > System > External System Import > CSV*), mapping `Labels` -> Labels and `Priority` -> Priority.
   Or create the stories manually and add the labels shown in the table.
3. Add a **Quick filter** per label (Board settings > Quick filters), e.g. `labels = MoSCoW-Must`.
4. Order the backlog: Must -> Should -> Could; within a group put Basic -> Performance -> Attractive.
5. Screenshot the backlog and the filtered views.

## Prioritisation table
| ID | Requirement | MoSCoW | Kano | Rationale |
|---|---|---|---|---|
| 1 | Course enrollment and registration | Must | Basic | Learners cannot access content without it |
| 2 | Video lecture streaming | Must | Basic | Primary delivery method for a learning platform |
| 3 | Interactive quizzes and assignments | Should | Performance | Improves learning outcomes; richer quizzes increase satisfaction |
| 4 | Progress tracking dashboard | Should | Performance | Motivates learners; more insight = more value |
| 5 | Peer-to-peer discussion forums | Could | Attractive | Unexpected community value; platform works without it |
| 6 | Certificate generation | Could | Attractive | Delights completers; can be added once courses exist |

Full sheet: [`prioritization.xlsx`](prioritization.xlsx)

## Evidence to attach
`screenshots/backlog.png`, `screenshots/must-filter.png`, `screenshots/kano-labels.png`
