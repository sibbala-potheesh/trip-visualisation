import { Component, Output, EventEmitter, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare const google: any;

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trip-form.component.html'
})
export class TripFormComponent implements AfterViewInit {
  @ViewChildren('startInput') startInput!: QueryList<ElementRef>;
  @ViewChildren('endInput') endInput!: QueryList<ElementRef>;
  @Output() tripAdded = new EventEmitter<{startPoint: string, endPoint: string}>();

  startPoint = '';
  endPoint = '';

  ngAfterViewInit() {
    this.setupAutocomplete();
  }

  setupAutocomplete() {
    const startInputElement = this.startInput.first.nativeElement;
    const endInputElement = this.endInput.first.nativeElement;

    const startAutocomplete = new google.maps.places.Autocomplete(startInputElement);
    const endAutocomplete = new google.maps.places.Autocomplete(endInputElement);

    startAutocomplete.addListener('place_changed', () => {
      const place = startAutocomplete.getPlace();
      this.startPoint = place.formatted_address || '';
    });

    endAutocomplete.addListener('place_changed', () => {
      const place = endAutocomplete.getPlace();
      this.endPoint = place.formatted_address || '';
    });
  }

  addTrip() {
    if (this.startPoint && this.endPoint) {
      this.tripAdded.emit({
        startPoint: this.startPoint,
        endPoint: this.endPoint
      });
      this.startPoint = '';
      this.endPoint = '';
    }
  }
}