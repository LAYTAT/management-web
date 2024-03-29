// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mqttPort: 8083,
  mqttHostname: '192.168.1.108',
  domain: '47.102.138.136:8090',
  apiUrl: 'http://47.102.138.136:8090',
  weatherUrl: 'https://free-api.heweather.net/s6/weather',
  key: '5700cfd227d6465ea1a8e06ae77d7a7e'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
