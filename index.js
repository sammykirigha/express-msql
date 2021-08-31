const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const HttpException = require('./utils/HttpException.urils');
const errorMiddleware = require('./middleware/error.middleware')
const userRouter = require('./routes/user.route');
const projectRouter = require('./routes/project.route');
const taskRouter = require('./routes/task.route')


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = process.env.PORT || 8080

app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', taskRouter)


app.all("*", (req, res, next) => {
    const err = new HttpException(404, 'Endpoint not found')
    next(err)
})

app.use(errorMiddleware);



app.listen(port, () => console.log(`Server is running on port ${port}`))