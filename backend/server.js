const express =require('express');
const app = express();
const cors = require('cors')


app.use(cors())
const notes = [
    {
        _id:"1",
        title:"fcuk off",
        content:"kala is real",
        category:"college",
    }
]

app.get('/',(req,res)=>{
    res.send('API IS RUNNING');
})

app.get('/api/notes',(req,res)=>{
    res.json(notes);
})

app.listen(5000,console.log('SERVER STARTED AT PORT 5000'));