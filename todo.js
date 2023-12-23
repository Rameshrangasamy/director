const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'todoApplication.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () =>
      console.log('Server Running at http://localhost:3000/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

// GET Todo API -1

app.get('/todos/', async (request, response) => {
  const {priority = 'HIGH'} = request.query
  const getTodoQuery = `
    SELECT
    *
    FROM 
    todo
    WHERE
    priority = "${priority}";`

  const todoArray = await db.all(getTodoQuery)
  response.send(todoArray)
})

// Delete todo API

// Delete movie API

app.delete('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const deleteTodoQuery = `
  DELETE FROM
    todo
  WHERE
    todo_id = ${todoId};`
  await db.run(deleteTodoQuery)
  response.send('Todo Removed')
})
