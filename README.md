[![Build Status](https://travis-ci.com/ambroiseRabier/ngx-matomo.svg?branch=master)](https://travis-ci.com/ambroiseRabier/ngx-matomo)
[![Coverage Status](https://coveralls.io/repos/github/ambroiseRabier/ngx-matomo/badge.svg)](https://coveralls.io/github/ambroiseRabier/ngx-matomo)

# ngx-matomo 
Matomo (aka. Piwik) web analytics for applications based on Angular 5, 6, 7 & 8.

IMPORTANT NOTE: As I do not use most of Matomo features myself (and my time is limited), I haven't tested most of the code, especially async requests (Promise) made by matomo. If you experience any error, please fill an issue as it is probably easely fixable.

## Install
```shell script
npm i --save @ambroise-rabier/ngx-matomo
```

## Adding Matomo 
You can add Matomo either via script tag or using the MatomoInjector in your root component.

### Initialize Matomo

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from '@ambroise-rabier/ngx-matomo';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    MatomoModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Inject Matomo into your root component and call `init` function.

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { MatomoInjector } from '@ambroise-rabier/ngx-matomo';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements AfterViewInit {
  constructor(
    private matomoInjector: MatomoInjector,
  ) {}
  
  // By initializing Matomo after the view has been generated, you allow Matomo to track outlinks generated on the first view.
  ngAfterViewInit() {
    // For example if you installed Matomo in the subdomain analytics.my-website.com on https
    this.matomoInjector.init('https://analytics.my-website.com/');
  }
}
```

Once that's done you can import ```MatomoTracker``` into any component of your application.

```typescript
import { Component } from '@angular/core';
import { MatomoTracker } from '@ambroise-rabier/ngx-matomo';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private matomoTracker: MatomoTracker,
  ) { }

  ngOnInit() {
    // Track something on init...
  }
}
```

## Manually trigger events

```typescript
import { Component } from '@angular/core';
import { MatomoTracker } from '@ambroise-rabier/ngx-matomo';

@Component({
  selector: 'app-my',
  template: `<button (click)="onClick()">Click me !</button>`
})
export class MyComponent {
  count = 0;

  constructor(
    private matomoTracker: MatomoTracker,
  ) { }

  onClick(){
    this.matomoTracker.trackEvent('category', 'action', 'name', ++this.count);
  }
}
```

## Track newly generated outlinks and downloads
If you use the link tracking feature to measure outlinks and downloads, Matomo needs to re-scan the entire DOM for newly added links whenever your DOM changes.
Just call ```this.matomoTracker.enableLinkTracking();``` after your DOM has been modified.

## Track router events

```typescript
import { AfterViewInit, Component } from '@angular/core';
import { MatomoInjector } from '@ambroise-rabier/ngx-matomo';
// replace by your env
import { environment } from '../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements AfterViewInit {
  constructor(
    private matomoInjector: MatomoInjector,
    private router: Router,
  ) {}
  
  // By initializing Matomo after the view has been generated, you allow Matomo to track outlinks generated on the first view.
  ngAfterViewInit() {
    // For example if you installed Matomo in the subdomain analytics.my-website.com on https
    this.matomoInjector.init({
      url: 'https://analytics.my-website.com/',
      // It is recommended to use another matomo website id for your preprod, test, dev env.
      id: environment.production ? 1 : 2,
    });
    
    // previous url
    let referrer: string = window.location.href;
    
    this.router.events.pipe(
      // filter out NavigationStart, Resolver, ...
      filter(e => e instanceof NavigationEnd),
      // skip first NavigationEnd fired when subscribing, already handled by init().
      skip(1),
      // idk why, used in angulartics2 lib.
      delay(0),
    ).subscribe(next => {
      // referrer is optional
      this.matomoInjector.onPageChange({ referrer });
      referrer = window.location.href;
    });
  }
}
```

## Matomo documentation
Matomo's [site](https://developer.matomo.org/guides/tracking-javascript-guide) has the detailed documentation on how to set up communication between Matomo and your application.
See also:
- https://developer.matomo.org/guides/spa-tracking
- https://developer.matomo.org/api-reference/tracking-api
- https://developer.matomo.org/api-reference/tracking-javascript (this lib seems more low level).
- https://github.com/matomo-org/matomo-nodejs-tracker

## Inspired from
[ngx-matomo](https://github.com/Arnaud73/ngx-matomo)  
[Angular2Piwik](https://github.com/awronka/Angular2Piwik)  
[Angulartics 2](https://github.com/angulartics/angulartics2)  

## License
[MIT](LICENSE)




