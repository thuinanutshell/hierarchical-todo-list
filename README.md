# Hierarchical To-do List

Loom Demo:

## Project Structure

### Backend

```
backend/
├── app.py
├── auth.py
├── lists.py
├── models.py
├── requirements.txt
└── tasks.py
```

### Frontend

frontend/
├── node_modules/
├── public/
├── src/
│ ├── components/
│ │ ├── auth/
│ │ │ ├── AlertMessage.js
│ │ │ ├── Login.js
│ │ │ └── Register.js
│ │ ├── lists/
│ │ │ ├── AddList.js
│ │ │ ├── CompletedTasksCount.js
│ │ │ ├── DeleteList.js
│ │ │ ├── EditList.js
│ │ │ └── List.js
│ │ └── tasks/
│ │ ├── AddTask.js
│ │ ├── MoveTask.js
│ │ ├── TaskAccordion.js
│ │ └── TaskActions.js
│ ├── contexts/
│ ├── NavBar.js
│ ├── NotFoundPage.js
│ ├── TaskColumn.js
│ ├── ApiClient.js
│ ├── App.js
│ ├── App.test.js
│ ├── index.css
│ ├── index.js
│ └── logo.svg
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

## Required Features
