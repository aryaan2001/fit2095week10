import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-updatemovie",
  templateUrl: './updatemovie.component.html',
  styleUrls: ["./updatemovie.component.css"],
})
export class UpdatemovieComponent implements OnInit {
  title: string = "";
  year: number = 0;
  movieId: string = "";
  actorId: string = "";
  moviesDB: any[] = [];
  actorsDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) {}
  //Get all Movies
  onGetMovies() {
    console.log("From on GetMovies");
    return this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  }
  onGetActors(){
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  // Update an Movie
 
onSelectUpdateActor(item: { fullName: string; year: number; _id: string; }) {
  this.actorId = item._id;
}
onSelectUpdateMovie(item: { title: string; year: number; _id: string; }) {
  this.movieId = item._id;
}
onUpdateMovie() {
  console.log("Taken Movie to Update Actor" , this.movieId, this.actorId)
  this.dbService.updateMovie(this.movieId, this.actorId).subscribe(result => {
    this.onGetMovies();
    this.router.navigate(["/listmovies"]);

  });
}
ngOnInit() {
  this.onGetMovies();
  this.onGetActors();
}
}