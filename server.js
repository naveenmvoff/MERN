//Using Express 
const express = require('express');        //use the express library
const mongoose = require('mongoose'); //use the mongoose library

//create an instance of express
const app = express();
app.use(express.json());  //to tell this is json file take the from the that file

//Sample in-memory database for todos items - use to store the data
// let todos = [];

//connecting mongodb
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(() => {
    console.log("MongoDB connected successfully")
})
.catch((err) => {
    console.log(err)
})

//Creating Schema
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String
})

//Creating Model
const todoModel = mongoose.model('Todo', todoSchema)

//Create a new todo item - use to apply post method for send request and get response
app.post('/todos', async (req, res) => {
    const {title, description} = req.body;
    // const newTodo = {
    //     id: todos.length + 1,
    //     title,
    //     description
    // };
    // todos.push(newTodo); //add the data to the list "todos"
    // console.log(todos); //use to show the data in the console 

    try {
        const newTodo = new todoModel({title, description});
        await newTodo.save();
        res.status(201).json(newTodo); //send the response to the client
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }

})

//Get all items
app.get('/todos', async(req, res) => {
    try {
        const todos= await todoModel.find();
        res.json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})


//Update a todo item
app.put("/todos/:id", (req, res) => {
    const {title, description} = req.body;
    const id = req.params.id;
    const updatedTodo = todoModel.findByIdAndUpdate(
        id,
        {title , description}
    )
})

//start the server
const port = 3000;   // use to define the port number - to tell which port we want to run
app.listen(port, () => {
    console.log("Server is listening to port " +port)
})  //to print in the console for our reference is the server is running or not
