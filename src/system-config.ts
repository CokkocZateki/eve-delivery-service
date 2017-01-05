"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map:any = {
  'angular2-jwt': 'https://unpkg.com/angular2-jwt@0.1.16',
  'ng2-bootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/ng2-bootstrap/1.0.24/ng2-bootstrap.min.js',
  'clipboard': 'https://unpkg.com/clipboard@1.5.10/dist/clipboard.js',
  'angular2-clipboard': 'https://unpkg.com/angular2-clipboard@0.2.12/src/ngii-clipboard.directive.js',
  'angular2-datatable': 'vendor/angular2-datatable',
  'ng2-bs3-modal': 'vendor/ng2-bs3-modal',
};

/** User packages configuration. */
const packages:any = {
  'angular2-jwt': {defaultExtension: 'js'},
  'angular2-clipboard': {defaultExtension: 'js'},
  'clipboard': {defaultExtension: 'js'},
  'angular2-datatable': {defaultExtension: 'js', main: 'datatable.js'},
  'ng2-bs3-modal': {defaultExtension: 'js', main: 'ng2-bs3-modal.js'},
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels:string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/frontpage/client',
  'app/frontpage',
  'app/manage',
  'app/manager',
  'app/manager/login',
  'app/manager/list',
  'app/pilot',
  'app/manager/pilot-status',
  'app/admin',
  'app/manager/list/order-dialog',
  'app/frontpage/stats',
  'app/manager/cargo',
  'app/frontpage/testimonials',
  'app/pilot/shipment',
  'app/frontpage/order/destination',
  'app/manager/manager-detail',
  'app/market',
  'app/callback',
  'app/unauthorized',
  'app/client',
  'app/client/queue',
  'app/updates',
  'app/pilot/self-service',
  'app/pilot/self-service/order-detail/client',
  'app/pilot/self-service/order-detail/items',
  'app/pilot/self-service/order-detail/process-bought',
  'app/pilot/self-service/order-detail/process-skip',
  'app/pilot/self-service/order-detail/process-flag',
  'app/pilot/self-service/pick',
  'app/client/history',
  'app/pilot/self-service/order-detail/process-reserved',
  'app/navbar',
  'app/client/reorder',
  'app/pilot/cargo',
  'app/survey',
  /** @cli-barrel */
];

const cliSystemConfigPackages:any = {};
barrels.forEach((barrelName:string) => {
  cliSystemConfigPackages[barrelName] = {main: 'index'};
});

/** Type declaration for ambient System. */
declare var System:any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
