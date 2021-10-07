const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
let path = require('path');
const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
app.delete('/movies/:endYear/:startYear', movies.deleteMoviesByYear); // get movies by yea


//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:actorid/:movieid', actors.addExistMovie);
app.put('/actors/:id', actors.updateOne); //to add or change
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:actorid/:movieid', actors.deleteMovie); //delete movie for an actor
app.delete('/actors/:id/', actors.deleteActorAndMovie); //delete actors and its movies

//Movie RESTFul  endpoints
app.put('/movies/:movieid', movies.updateOne);
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.delete('/movies/:title', movies.deleteMovieByTitle); //delete movies by title
app.get('/movies/:id', movies.getOne);

app.delete('/movies/:id', movies.deleteOne); //delete movies by id
app.delete('/movies/:movieid/:actorid', movies.deleteActor); // delete an actor from movie
app.put('/movies/:movieid/:actorid', movies.addExistActor); // add an existing actor to movie
//app.put('/movies/:id', movies.addActor);

app.get('/movies/actor-count/:actorid', movies.getActorCount);

app.get('/movies/:endYear/:startYear', movies.getAllByYear); // get movies by year


// 404 page not found error
// *