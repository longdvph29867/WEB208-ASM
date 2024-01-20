import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const localService = inject(LocalService);
  const router = inject(Router);
  const auth = localService.get();
  if(auth?.role === 'admin') {
    return true;
  }
  localService.remove()
  router.navigate(['/auth/login'])
  return false;

};
