import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  name: string;
  distance: number;
}

export interface Vehicle {
  type: string;
  range: number;
  count: number;
}

export interface CopSelection {
  copId: number;
  city: string;
  vehicle: string;
}

export interface GameResult {
  success: boolean;
  capturingCop: number | null;
  fugitiveLocation: City;
  message: string;
  caught: boolean;
  fugitiveCity: string;
  capturingCopId: number | null;
}

export interface Cop {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://game-gilt-rho.vercel.app/api';

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities`);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`);
  }

  startGame(): Observable<any> {
    return this.http.post(`${this.apiUrl}/start-game`, {});
  }

  makeSelection(selection: CopSelection): Observable<any> {
    return this.http.post(`${this.apiUrl}/cop-selection`, selection);
  }

  getGameResult(selections: any[]) {
    return this.http.post<any>(`${this.apiUrl}/game/result`, { selections });
  }

  getCops(): Observable<Cop[]> {
    return this.http.get<Cop[]>(`${this.apiUrl}/cops`);
  }
} 