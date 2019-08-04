import { NgModule } from '@angular/core';
import { MatomoInjector } from './matomo-injector.service';
import { MatomoTracker } from './matomo-tracker.service';


@NgModule({
  declarations: [],
  imports: [],
  providers: [MatomoInjector, MatomoTracker],
  exports: []
})
export class MatomoModule {
}
