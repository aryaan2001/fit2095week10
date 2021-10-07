import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-updateactor",
  templateUrl: './updateactor.component.html',
  styleUrls: ["./updateactor.component.css"],
})
export class UpdateactorComponent implements OnInit {
  fullName: string = "";
  year: number = 0;
  actorId: string = "";
  actorsDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) {}
  //Get all Actors
  onGetActors() {
    console.log("From on GetActors");
    return this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  // Update an Actor
  onSelectUpdate(item: { name: string; year: number; _id: string; }) {
    this.fullName = item.name;
    this.year = item.year;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, year: this.year };
    console.log(obj)
    this.dbService.updateActor(this.actorId, obj).subscribe((result: any) => {
      this.onGetActors();
      this.router.navigate(["/listactors"]);
    });
  }
  ngOnInit() {
    this.onGetActors();
  }
}