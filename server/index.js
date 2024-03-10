const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Todomodel= require("./models/Todo")



const app = express()

app.use(cors())

app.use(express.json())

app.listen(3001, ()=>{
    console.log("server is running at port no 3001")
})

mongoose.connect("mongodb+srv://vikasgangwarbly2003:ggoHOQ3Hl42PGtZN@cluster0.jabqgos.mongodb.net/vikas")

app.post('/add',(req,res)=>{
  
    const task = req.body.task;
    Todomodel.create({
        task:task
    })
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.get('/all',async (req,res)=>{
     try {
        const todosAll=await Todomodel.find({});
        res.status(200).json({
            status:true,
            todosAll
        })
     } catch (error) {
        res.status(501)
     }
})


app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Todomodel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

app.put('/put/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        await Todomodel.findByIdAndUpdate({_id:id},{done:true})
        const todosAll=await Todomodel.find({});
        res.status(200).json({
            status:true,
            todosAll
        })

    } catch (error) {

        console.log(error)
    }
})