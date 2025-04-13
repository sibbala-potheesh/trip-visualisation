import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './components/header.component';
import { TripFormComponent } from './components/trip-form.component';
import { TripVisualizationComponent } from './components/trip-visualization.component';
import { Trip } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TripFormComponent, TripVisualizationComponent],
  templateUrl: './app.component.html'
})
export class App {
  trips: Trip[] = [];

  addTrip(tripData: {startPoint: string, endPoint: string}) {
    const trip: Trip = {
      startPoint: tripData.startPoint,
      endPoint: tripData.endPoint,
      level: 1,
      continued: false
    };

    if (this.trips.length > 0) {
      const lastTrip = this.trips[this.trips.length - 1];
      
      // Check if this is a continued trip (end point of last trip matches start point of new trip)
      if (this.normalizeLocation(lastTrip.endPoint) === this.normalizeLocation(trip.startPoint)) {
        lastTrip.continued = true;
        trip.continued = false;
      }

      // Check if this trip is identical to the previous one (same start and end points)
      if (this.normalizeLocation(lastTrip.startPoint) === this.normalizeLocation(trip.startPoint) && 
          this.normalizeLocation(lastTrip.endPoint) === this.normalizeLocation(trip.endPoint)) {
        trip.level = 2;
      }

      // Check if there's a previous level 2 trip that this one continues from
      if (lastTrip.level === 2 && 
          this.normalizeLocation(lastTrip.endPoint) === this.normalizeLocation(trip.startPoint)) {
        trip.level = 2;
      }
    }

    this.trips.push(trip);
  }

  private normalizeLocation(location: string): string {
    // Remove spaces, convert to lowercase, and remove common suffixes
    return location.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/,.*$/, ''); // Remove everything after the first comma
  }
}

bootstrapApplication(App);