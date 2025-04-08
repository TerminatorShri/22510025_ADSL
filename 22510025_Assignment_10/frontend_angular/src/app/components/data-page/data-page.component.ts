import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';

interface Reading {
  weather_station_id: string;
  temperature: number;
  reading_time: string;
}

@Component({
  selector: 'app-data-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './data-page.component.html',
  styleUrl: './data-page.component.css',
})
export class DataPageComponent implements OnInit {
  stationOptions = ['All', 'WS001', 'WS002', 'WS003'];
  selectedStation = 'All';
  temperatureUnit = 'Celsius';
  readings: Reading[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.fetchReadings();
  }

  onStationChange() {
    this.fetchReadings();
  }

  onUnitChange() {
    this.convertTemperature();
  }

  fetchReadings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const fetch$ =
      this.selectedStation === 'All'
        ? this.dataService.getAllReadings()
        : this.dataService.getStationWiseReadings(this.selectedStation);

    fetch$.subscribe({
      next: (data: any) => {
        this.readings = data.sort(
          (a: Reading, b: Reading) =>
            new Date(b.reading_time).getTime() -
            new Date(a.reading_time).getTime()
        );
        this.convertTemperature();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching data.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  convertTemperature(): void {
    if (this.temperatureUnit === 'Fahrenheit') {
      this.readings = this.readings.map((r) => ({
        ...r,
        temperature: parseFloat(((r.temperature * 9) / 5 + 32).toFixed(2)),
      }));
    }
  }
}
