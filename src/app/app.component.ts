import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weatherApp';
  weather?: Weather;
  cityName = 'landon';
  limitReached = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather(this.cityName);
    this.cityName = '';
  }

  convertToCelsius(tempInFahrenheit: number): number {
    return Math.round((tempInFahrenheit - 32) * 5 / 9);
  }

  onSubmit() {
    this.getWeather(this.cityName);
    this.cityName = '';
  }

  private getWeather(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: res => { this.weather = res; console.log(res); },
      error: err => {
        console.log('Límite de consultas alcanzada, pruebe en otro momento', err);
        this.limitReached = true;
      }
    })
  }
}
