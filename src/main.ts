import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SearchComponent } from './app/components/search/search.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

