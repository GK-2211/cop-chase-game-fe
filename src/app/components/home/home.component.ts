import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  template: `
    <div class="home-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>Criminal Chase Game</mat-card-title>
          <mat-card-subtitle>Help the cops catch the fugitive!</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>A notorious criminal escape artist has vanished again. Three fearless cops need your help to capture the fugitive hiding in one of five neighboring cities.</p>
          <h3>Game Rules:</h3>
          <ul>
            <li>Each cop must select a unique city to investigate</li>
            <li>Choose a vehicle with enough range for a round trip</li>
            <li>The fugitive is hiding in one of the five cities</li>
            <li>Success depends on choosing the right city with a suitable vehicle</li>
          </ul>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="startGame()">Start Game</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
    }
    .welcome-card {
      max-width: 600px;
      width: 100%;
      padding: 20px;
    }
    mat-card-header {
      margin-bottom: 20px;
    }
    mat-card-title {
      font-size: 2em;
      margin-bottom: 10px;
    }
    mat-card-content {
      margin: 20px 0;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin: 10px 0;
    }
    mat-card-actions {
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }
    button {
      font-size: 1.2em;
      padding: 10px 30px;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  startGame() {
    this.router.navigate(['/game']);
  }
} 