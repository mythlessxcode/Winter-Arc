# Day 13 — Mongoose environment

Todo data models with Mongoose.

## Setup

```bash
npm install
cp .env.example .env
```

Start MongoDB locally, then:

```bash
npm start
```

## Models

- `models/todos/user.models.js` — User
- `models/todos/todo.models.js` — Todo (refs User and SubTodo)
- `models/todos/sub_todo.models.js` — SubTodo
