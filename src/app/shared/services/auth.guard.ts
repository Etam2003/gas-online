import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user) {
    return true;
  }
  return false;
};
