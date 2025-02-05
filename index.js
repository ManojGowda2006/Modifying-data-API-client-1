const express = require('express');
// const { resolve } = require('path');
const connect = require('./database');
const menuSchema = require('./schema');

const app = express();
const port = 3010;



app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


connect();
app.post("/menu",async(req,res) => {
  
  try{
    const {name,description,price} = req.body;
    const newMenu = new menuSchema({name,description,price})
    if(!newMenu){
     res.status(400).send("All fields are required")
    }
    await newMenu.save()
    res.status(201).send("New item added to Menu")
  }
  catch(err){
    res.status(500).send("internal server error")
  }
})

app.get('/menu',async(req,res) => {
  const items = await menuSchema.find();
  res.json(items)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});