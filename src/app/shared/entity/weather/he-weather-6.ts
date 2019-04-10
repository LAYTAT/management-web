import {Basic} from './basic';
import {Now} from './now';
import {DailyForecast} from './daily-forecast';

export interface HeWeather6 {
  basic: Basic;
  now: Now;
  daily_forecast: DailyForecast[];
}
