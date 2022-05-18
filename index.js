const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Todo server is running')
})





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vrj5k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('todoApp').collection('todos');
        
        // post todo to the server 
        app.post('/todo', async (req, res) => {
            const todo = req.body;
            const result = await todoCollection.insertOne(todo);
            res.send(result);
        })
        
    }
    finally {

    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log('listening port',port);
})