import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../types';

@Component({
  selector: 'app-trip-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-visualization.component.html'
})
export class TripVisualizationComponent {
  @Input() trips: Trip[] = [];

  getLocationName(address: string): string {
    const parts = address.split(',');
    return parts[0] || address;
  }
}