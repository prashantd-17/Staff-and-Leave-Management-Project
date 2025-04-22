import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('id');

  if (!token || !userId) {
    return router.parseUrl('/login');
  }

  return true;

  // try {
  //   const res: any = await lastValueFrom(userService.getCurrentUser(`/users/${userId}`));

  //   if (res?.role === 'head') {
  //     // HOD should NOT access staff routes
  //       return router.createUrlTree(['/login']);
  //     }
  //     return true;

  //   if (res?.role === 'staff') {
  //     // Staff should NOT access HOD routes
  //     if (state.url.includes('dashboard')) {
  //       return router.createUrlTree(['/login']);
  //     }
  //     return true;
  //   }

  //   // For any unknown role
  //   return router.createUrlTree(['/login']);

  // } catch (error) {
  //   console.error('Guard error:', error);
  //   return router.createUrlTree(['/login']);
  // }
};
