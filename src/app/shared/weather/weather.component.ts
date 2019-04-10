import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../service/weather.service';
import {Basic} from '../entity/weather/basic';
import {Now} from '../entity/weather/now';
import {DailyForecast} from '../entity/weather/daily-forecast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  forecasts: DailyForecast[];
  now: Now;
  basic: Basic;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getCurrentWeather();
    this.getForecast();
  }

  getCurrentWeather(): void {
    this.weatherService.getCurrentWeather().subscribe(
      weather => {
        this.basic = weather.HeWeather6[0].basic;
        this.now = weather.HeWeather6[0].now;
      }
    );
  }

  getForecast(): void {
    this.weatherService.getForecast().subscribe(
      weather => this.forecasts = weather.HeWeather6[0].daily_forecast
    );
  }

  getWeatherIcon(code: string): string {
    return `assets/weather/${code}.png`;
  }
}
