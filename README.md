[![Build Status](https://travis-ci.com/ambroiseRabier/ngx-matomo.svg?branch=master)](https://travis-ci.com/ambroiseRabier/ngx-matomo)
[![Coverage Status](https://coveralls.io/repos/github/ambroiseRabier/ngx-matomo/badge.svg)](https://coveralls.io/github/ambroiseRabier/ngx-matomo)

# ngx-matomo 
Matomo (aka. Piwik) web analytics for applications based on Angular 5, 6, 7 & 8.

IMPORTANT NOTE: As I do not use most of Matomo features myself and my time is limited, I haven't tested most of the code, especially async requests made by matomo. If you experience any error, please fill an issue as it is probably easely fixable.

## Install
```npm install --save ngx-matomo```

## Adding Matomo 
You can add Matomo either via script tag or using the MatomoInjector in your root component.

### (Recommended) Initialize Matomo via Root component 
Import ```MatomoModule``` into your root ```NgModule```.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    MatomoModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Inject Matomo into your root component and call `init` function.

```ts
import { Component } from '@angular/core';
import { MatomoInjector } from 'ngx-matomo';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements AfterViewInit {
  constructor(
    private matomoInjector: MatomoInjector
  ) {}
  
  // By initializing Matomo after the view has been generated, you allow Matomo to track outlinks generated on the first view.
  ngAfterViewInit() {
    // For example if you installed Matomo in the subdomain analytics.my-website.com on https
    this.matomoInjector.init('https://analytics.my-website.com/');
  }
}
```

Once that's done you can import ```MatomoTracker``` into any component of your application.

```ts

// component
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private matomoTracker: MatomoTracker
  ) { }

  ngOnInit() {
    // Do something with this.matomoTracker...
  }
}
```

### (alternative) Adding Matomo into your application via script tag.
*You can skip this part if you have initialized Matomo via Root component.*

Matomo provide this script when you set up a new website to be tracked.

Inject this code into your header to initialize Matomo in your application.  
Make sure to replace the MATOMO_URL with your Matomo server url, and SITE_ID by the id of your website on Matomo. 
You can remove all the `_paq` methods in this script and set them up in your Angular 5+ application. 

```html
<!-- Matomo -->
<script type="text/javascript">
  var _paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//{$MATOMO_URL}/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '{$SITE_ID}']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->
```


## Manually trigger events

```html
<button (click)="whatHappensOnClick(1)"></button>
```

```ts
// component
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app',
  templateUrl: './myButton.html'
})
export class MyComponent {
  constructor(
    private matomoTracker: MatomoTracker
  ) { }

  whatHappensOnClick(someVal){
    /*
    * some code...
    */
    this.matomoTracker.trackEvent('category', 'action', 'name', someVal);
  }
}
```

## Track newly generated outlinks and downloads
If you use the link tracking feature to measure outlinks and downloads, Matomo needs to re-scan the entire DOM for newly added links whenever your DOM changes.
Just call ```this.matomoTracker.enableLinkTracking();``` after your DOM has been modified.

## Track router events

```ts
import { Component } from '@angular/core';
import { MatomoInjector } from 'ngx-matomo';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app',
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
    this.matomoInjector.init('https://analytics.my-website.com/');
    
    let previousURL: string = window.location.href;
    
    this.router.events.pipe(
      // filter out NavigationStart, Resolver, ...
      filter(e => e instanceof NavigationEnd),
      // skip first NavigationEnd fired when subscribing, already handled by init().
      skip(1),
      // idk why, used in angulartics2 lib.
      delay(0),
    ).subscribe(next => {
      // referrer is optional
      this.matomoInjector.onPageChange({ referrer: previousURL });
      previousURL = window.location.href;
    });
  }
}
```

## Tips
You can add two websites on Matomo, one for production, and another one for dev environment. And use them like that: 

```ts
    this.matomoInjector.init(
      'https://analytics.my-website.com/',
      environment.production ? 1 : 2
    );
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




