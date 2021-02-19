const Workout = require("../models/workout")

module.exports = (app) => {
    // Find last workout 
    app.get("/api/workouts", (req, res) => {
        // console.log(req.body)
        Workout.find({}) 
        Workout.aggregate([
            {"$addFields": {
                "totalDuration":{
                    "$sum": "$exercises.duration"
                }
            }}
        ])
// Sort date
        .sort({ date: -1 })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });
    // to add exercise
    app.put("/api/workouts/:id", (req, res) => {
        // console.log(req.body, req.params.id)
        Workout.findOneAndUpdate(
            {_id: req.params.id},
            {
                $push: { 
                    exercises: req.body
                    
                },
                
            },
            {new: true},
        )
        .then(data => {
            // console.log(data)
           res.json(data);

        })
        .catch(err => {
            res.status(400).json(err);
        });

    });
    // Create a workout
    app.post("/api/workouts", (req, res) => {
        // console.log(req.body, req.params)
        Workout.create(
            {
                exercises: req.body.exercises,
                day: Date.now(),
            },
        )
        .then(data => {
            // console.log("DATA: " + data)
            res.json(data);
            // res.send("hello from create post")
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    app.get("/api/workouts/range", (req, res) => {
        Workout.aggregate([
            {"$addFields": {
                "totalDuration":{
                    "$sum": "$exercises.duration"
                }}
            }
        ])
        // Get last 7 exercises.
        // Sort date in descending order; limit 7 exercises, sort day in ascending order
        .sort({ day: -1 }).limit(7).sort({ day: 1 })
        .then(data => {
            // console.log(data)
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    })
};