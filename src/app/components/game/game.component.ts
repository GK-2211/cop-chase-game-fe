import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GameService, City, Vehicle, CopSelection, Cop } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Criminal Chase Game</mat-card-title>
          <mat-card-subtitle>Make your selections</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form>
            <div *ngFor="let cop of cops; let i = index">
              <h3>Cop {{i + 1}}</h3>
              
              <mat-form-field>
                <mat-label>Select City</mat-label>
                <mat-select [(ngModel)]="selections[i].city"
                            (selectionChange)="onCitySelect(i)"
                            name="city{{i}}">
                  <mat-option *ngFor="let city of getAvailableCities(i)" [value]="city.name">
                    {{city.name}} ({{city.distance}} KM)
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Select Vehicle</mat-label>
                <mat-select [(ngModel)]="selections[i].vehicle"
                            [disabled]="!selections[i].city"
                            name="vehicle{{i}}">
                  <mat-option *ngFor="let vehicle of getAvailableVehicles(i)" [value]="vehicle.type">
                    {{vehicle.type}} ({{vehicle.range}} KM range)
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" 
                  (click)="submitSelections()">
            Submit Selections
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      margin: 10px 0;
    }
    mat-card-actions {
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }
  `]
})
export class GameComponent implements OnInit {
  cities: City[] = [];
  vehicles: Vehicle[] = [];
  cops: Cop[] = [];
  result: any = null;
  selections: CopSelection[] = [];

  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGameData();
    this.gameService.getCops().subscribe(cops => {
      this.cops = cops;
      this.selections = this.cops.map(cop => ({ copId: cop.id, city: '', vehicle: '' }));
    });
  }

  loadGameData() {
    this.gameService.getCities().subscribe(cities => {
      this.cities = cities;
    });

    this.gameService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });

    this.gameService.startGame().subscribe();
  }

  getAvailableCities(index: number): City[] {
    const selectedCities = this.selections.map((s, i) => i !== index ? s.city : null);
    return this.cities.filter(city =>
      !selectedCities.includes(city.name) || city.name === this.selections[index].city
    );
  }

  getAvailableVehicles(index: number): Vehicle[] {
    const selectedVehicles = this.selections.map((s, i) => i !== index ? s.vehicle : null);
    const selectedCity = this.cities.find(city => city.name === this.selections[index].city);
    return this.vehicles.filter(vehicle =>
      (!selectedVehicles.includes(vehicle.type) || vehicle.type === this.selections[index].vehicle) &&
      selectedCity && vehicle.range >= selectedCity.distance * 2
    );
  }

  onCitySelect(copIndex: number) {
    const selectedCity = this.cities.find(c => c.name === this.selections[copIndex].city);
    if (selectedCity) {
      const currentVehicle = this.vehicles.find(v => v.type === this.selections[copIndex].vehicle);
      if (currentVehicle && currentVehicle.range < selectedCity.distance * 2) {
        this.selections[copIndex].vehicle = '';
      }
    }
  }

  submitSelections() {
    this.gameService.getGameResult(this.selections).subscribe(result => {
      this.router.navigate(['/result'], { state: { result } });
    });
  }
} 