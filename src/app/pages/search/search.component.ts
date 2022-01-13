import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public planets: Array<any> = [];
  public filteredPlanets: Array<any> = [];
  public planetDetails: any = {};
  public loggedInUser: any = {};

  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.stringify(localStorage.getItem("user")) || {};
    this.getPlanets();
  }

  getPlanets() {
    this.databaseService.search().subscribe((resp: any) => {
      this.planets = resp.results;
      this.filteredPlanets = resp.results;
    }, err => {
      console.error("Error while getting planets::::::::::::::\n", err);
    });
  }

  searchplanet(event: any) {
    const searchText: string = event?.target?.value;
    if (this.loggedInUser.username === "Luke Skywalker") {
      // Need to put search restriction for the user.
    }
    if (searchText.length > 0) {
      this.filteredPlanets = this.planets.filter((planet: any) => planet?.name?.toLowerCase().includes(searchText.toLowerCase()) || planet?.population?.toLowerCase().includes(searchText.toLowerCase()));
      if (this.filteredPlanets.length <= 0) {
        this.resetPlanets();
      }
    } else {
      this.resetPlanets();
    }
  }

  showPlanetDetails(planet: any) {
    this.planetDetails = planet;
  }

  closeDetails() {
    this.planetDetails = {};
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  resetPlanets() {
    this.filteredPlanets = [...this.planets];
  }
}
