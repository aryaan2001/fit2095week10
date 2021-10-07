import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  getMovies() {
    return this.http.get("/movies");
  }
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }
  createMovie(data: any) {
    return this.http.post("/movies", data, httpOptions);
  }
  
  deleteMovie(title: string) {
    let url = "/movies/" + title;
    return this.http.delete(url, httpOptions);
  }

  deleteMovieByYear(endYear: number, startYear: number) {
    let url = "/movies/"+endYear+"/"+startYear;
    console.log(url)
    return this.http.delete(url, httpOptions);
  }

  updateMovie(movieId: string, actorId: string) {
    let url = "/movies/" +movieId+ "/" +actorId;
    return this.http.put(url, httpOptions);
  }
  // onUpdateMovieToActor(actorid: string, movieid: string) {
  //   let url = "/actors/" +actorid+ "/" +movieid;
  //   return this.http.put(url, httpOptions);
  // }
}
