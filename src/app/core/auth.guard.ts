// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// export const authGuard: CanActivateFn = () => {
//   const auth = inject(AuthService);
//   return auth.isLoggedIn() || inject(Router).createUrlTree(['/admin/login']);
// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.canEnterAdmin()) {
    auth.consumeAdminAccess();
    return true;
  }

  return router.createUrlTree(['/admin/login']);
};
