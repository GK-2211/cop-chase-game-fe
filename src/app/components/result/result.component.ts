import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GameService, GameResult } from '../../services/game.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <div class="result-container">
      <mat-card class="result-card">
        <mat-card-header>
          <mat-card-title>Game Result</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div *ngIf="result" class="result">
            <p>{{ result.message }}</p>
            <p>Fugitive was in: {{ result.fugitiveCity }}</p>
            <div *ngIf="result.caught">
              Congratulations, you caught the fugitive!
              <br>
              Capturing Cop: Cop {{ result.capturingCopId }}
            </div>
            <div *ngIf="!result.caught">
              The fugitive escaped. Try again!
            </div>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="playAgain()">Play Again</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .result-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
    }
    .result-card {
      max-width: 600px;
      width: 100%;
      padding: 20px;
    }
    .result-message {
      text-align: center;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .success {
      background-color: #4caf50;
      color: white;
    }
    .failure {
      background-color: #f44336;
      color: white;
    }
    h2 {
      font-size: 2em;
      margin-bottom: 20px;
    }
    p {
      font-size: 1.2em;
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
export class ResultComponent implements OnInit {
  result: GameResult | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.result = navigation.extras.state['result'];
    }
  }

  ngOnInit() {
    if (!this.result) {
      this.router.navigate(['/']);
    }
  }

  playAgain() {
    this.router.navigate(['/']);
  }
} 