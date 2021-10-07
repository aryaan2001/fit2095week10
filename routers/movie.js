var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            //console.log(movies)
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(movies);
            }
        }).populate('actors');
    },
    getAllByYear: function (req, res) {
        Movie.find({
            year: { $lte: parseInt(req.params.endYear), $gte: parseInt(req.params.startYear) }
        }).populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                console.log(parseInt(req.params.endYear), parseInt(req.params.startYear));
                res.json(movie);
            })

    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        let movie = new Movie(newMovieDetails);
        console.log(movie)
        movie.save(function (err) {
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    updateOne: function (req, res) {
        console.log("here" +req.params.movieid);
        Movie.findOneAndUpdate({ _id: req.params.movieid }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
            console.log(movie);
        });
    },
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                movies.actor.push(actor._id);
                movies.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    deleteActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Movie.findOneAndUpdate({ _id: req.params.movieid }, { $pull: { actors: req.params.actorid } }, function (err) {
                console.log(req.params.movieid);
                if (err) return res.status(400).json(err);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
    addExistActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Movie.findOneAndUpdate({ _id: req.params.movieid }, { $push: { actors: req.params.actorid } }, function (err) {
                console.log(req.params.movieid);
                if (err) return res.status(400).json(err);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
    deleteMoviesByYear: function (req, res) {
        // console.log("REACH")
    //     console.log(req.params.endYear, req.params.startYear)
    //     Movie.deleteMany({
    //         year: { $lte: parseInt(req.params.endYear) , $gte: parseInt(req.params.startYear)  }
    //     }),
      
    // function (err) {
    //     if (err) return res.status(400).json(err);
    //     console.log("Deleted")
    //     res.json(200);
    // }
    console.log("REACH")
    Movie.find({
        year: { $lte: parseInt(req.params.endYear), $gte: parseInt(req.params.startYear) }
    })
    .exec(function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        console.log(parseInt(req.params.endYear), parseInt(req.params.startYear));
        res.json(movie);
    })
    Movie.remove({year: { $lte: parseInt(req.params.endYear), $gte: parseInt(req.params.startYear) }
})
.exec(function (err, movie) {
    console.log("Reached Backend and Deleted");
})
    },
  getActorCount: function (req, res) {
        console.log("AT ACTOR COUNT")


        Movie.findOne({ _id: req.params.actorid })
        .populate('actors')
        .exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json({
                status: "success",
                "movieId": movie._id,
                "actorCount": movie.actors.length
            });
        });
        

        /*
        Movie.findOne({ _id: req.params.actorid })
        var actorCount = Movie.find(movie.actors)
        actorCount.countDocuments(function (err, count) {
            if (err) console.log(err)
            else console.log("Count:", count)
            res.json(actorCount);

        }) */
    },

    deleteMovieByTitle: function (req, res) {
        Movie.findOneAndRemove({ title: req.params.title }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
};