const express=require('express')
const cors=require('cors')
const { connection } = require('./config/db')
const { boardRouter } = require('./routes/board.routes')
const { taskRouter } = require('./routes/task.routes')
const { subRouter } = require('./routes/subtask.routes')
const { userRouter } = require('./routes/User.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',async(req,res)=>{
    res.send('Welcome to kanban backend')
})

app.use('/user',userRouter)
app.use('/boards',boardRouter)
app.use('/tasks',taskRouter)
app.use('/subtasks',subRouter)

const port=8080
app.listen(port,async()=>{
    console.log(`server running on port ${port}`)
    try {
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log('could not connect to db')
    }
})