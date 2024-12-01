import express from "express"


const PORT = 5050;
const app = express();

import grades from "./routes/grades.mjs";
import grades_agg from "./routes/grades_agg.mjs";

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the API.");
})

app.get('/grades/stats', async (req, res) => {
    let collection = await db.collection("grades");

    let result = await collection.aggregate([
        {
            title: 1,
            learner_id: 2,
            class_id: 1,
            avg: {
              $avg: "$scores.score",
            },
          }
    ])
})

app.get('/grades/stats/:id', async (req, res) => {
    db.learners.createIndex({
        class_id: 1,
        learner_id:1
    })
  
    db.learner.insertMany([
        {
            "_id": {
              "$oid": "56d5f7eb604eb380b0d8d8d1"
            },
            "class_id": 39,
            "avg": 37.21718277096397
          },
          {
            "_id": {
              "$oid": "56d5f7eb604eb380b0d8d8d8"
            },
            "class_id": 325,
            "avg": 55.7420630185875
          },
          {
            "_id": {
              "$oid": "56d5f7eb604eb380b0d8d8dc"
            },
            "class_id": 265,
            "avg": 63.373517441303505
          },
          {
            "_id": {
              "$oid": "56d5f7eb604eb380b0d8d8e6"
            },
            "class_id": 435,
            "avg": 59.60961413675004
          }
    ])

   
})

app.use('/grades', grades);
app.use('/grades', grades_agg);

//Global error handling 
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});

//Start the Express server
app.listen(PORT, () => {
    console.log('Server is running on port: ${PORT}');
})
