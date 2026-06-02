import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners( ),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    // Use apenas esta linha para o HTTP. O withFetch() é recomendado para Angular 18+.
    provideHttpClient(withFetch())
  ]
};
