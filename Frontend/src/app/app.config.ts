import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { providePrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(), providePrimeNG({ theme: { preset: Aura } }),
    importProvidersFrom(ToastModule),
    MessageService
  ]
};
