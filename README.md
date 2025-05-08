# Find the Fugitive Game Frontend

An interactive web game where police officers compete to catch a fugitive across different cities using various vehicles.

## Live Demo
[Play the Game](https://gk-2211.github.io/cop-chase-game-fe/)

## Game Overview
- Multiple police officers compete to catch a fugitive
- Each officer must choose a city and a vehicle
- Vehicle selection is limited by available count and range
- The first officer to reach the fugitive's location wins

## Features
- Real-time city and vehicle selection
- Distance calculations and range validations
- Multiple police officers coordination
- Interactive game results display

## Tech Stack
- Angular 16+
- TypeScript
- Angular Material UI
- RxJS
- HTTP Client

## Project Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── game.service.ts
│   │   └── interfaces/
│   ├── assets/
│   └── environments/
├── package.json
└── angular.json
```

## API Integration
The frontend communicates with the backend API at:
`https://game-gilt-rho.vercel.app/api`

### Available Endpoints:
- GET `/cities` - Available cities list
- GET `/vehicles` - Available vehicles list
- GET `/cops` - Police officers list
- POST `/start-game` - Initialize game
- POST `/cop-selection` - Submit officer's choices
- POST `/game/result` - Get game outcome

## Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
ng serve
```

4. Navigate to `http://localhost:4200/`

## Building for Production

```bash
ng build --configuration production
```

## Deployment
The application is deployed using GitHub Pages.

To deploy updates:
```bash
ng deploy --base-href=/cop-chase-game-fe/
```
