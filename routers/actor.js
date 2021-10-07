const mongoose = require('mongoose');
const actor = require('../models/actor');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        }) .populate('movies');
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        console.log(actor)
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                console.log(actor)
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
            console.log(actor)
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    addExistMovie: function (req, res) {
        Actor.findOne({ _id: req.params.actorid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Actor.findOneAndUpdate({ _id: req.params.actorid }, { $push: { movies: req.params.movieid } }, function (err) {
                console.log(req.params.actorid);
                console.log(req.params.movieid);
                if (err) return res.status(400).json(err);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });
    },
    deleteMovie: function (req, res) {
        Actor.findOne({ _id: req.params.actorid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Actor.findOneAndUpdate({_id: req.params.actorid}, {$pull:{movies: req.params.movieid}}, function (err) {
                console.log(req.params.actorid);
                if (err) return res.status(400).json(err); 
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor); 
                });
                });
            });
    },

    deleteActorAndMovie: function (req, res) {
        console.log('reached deleteActorAndMovie')
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            let actorMovies = actor.movies.map(id => id.toString());
            console.log("This is " +req.params.id, actor)
            Movie.deleteMany({_id: {$in: actorMovies}}, function (err) {
                console.log(req.params.id);
                if (err) return res.status(400).json(err); 
                });
                Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
                    if (err) return res.status(400).json(err);
                    res.json();
                });  
                
            }) 
    },
};
//findOneAndDelete