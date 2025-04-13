import { Routes } from '@angular/router';
import {AdventurePickerComponent} from './adventures/adventure-picker/adventure-picker.component';
import {JourneyOverviewComponent} from './journeys/journey-overview/journey-overview.component';

export const routes: Routes = [
  {
    component: AdventurePickerComponent,
    path: "",
  },
  {
    path: "journey/:slug",
    component: JourneyOverviewComponent
  }
];
