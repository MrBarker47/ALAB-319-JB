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
    let newCollection = await db.learners("grades");

    let result = await newCollection.aggregate([
    
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
