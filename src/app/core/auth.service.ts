// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { tap } from 'rxjs';
// import { API_URL } from './api.config';

// const TOKEN_KEY = 'vss_admin_token';
// const EXPIRES_KEY = 'vss_admin_expires';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private router = inject(Router);

//   login(username: string, password: string) {
//     return this.http.post<{ token: string; expires: string }>(`${API_URL}/auth/login`, { username, password }).pipe(
//       tap(r => {
//         localStorage.setItem(TOKEN_KEY, r.token);
//         localStorage.setItem(EXPIRES_KEY, r.expires);
//       })
//     );
//   }

//   changePassword(currentPassword: string, newPassword: string) {
//     return this.http.post<{ message: string }>(`${API_URL}/auth/change-password`, { currentPassword, newPassword });
//   }

//   get token() { return localStorage.getItem(TOKEN_KEY); }

//   isLoggedIn(): boolean {
//     const expires = localStorage.getItem(EXPIRES_KEY);
//     return !!this.token && !!expires && new Date(expires).getTime() > Date.now();
//   }

//   logout() {
//     localStorage.removeItem(TOKEN_KEY);
//     localStorage.removeItem(EXPIRES_KEY);
//     this.router.navigate(['/admin/login']);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _token = signal<string | null>(null);
  private _expires = signal<string | null>(null);
  private _canEnterAdmin = signal(false);

  login(username: string, password: string) {
    return this.http
      .post<{
        token: string;
        expires: string;
      }>(`${API_URL}/auth/login`, { username, password })
      .pipe(
        tap((r) => {
          this._token.set(r.token);
          this._expires.set(r.expires);
          this._canEnterAdmin.set(true);
        }),
      );
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<{ message: string }>(
      `${API_URL}/auth/change-password`,
      {
        currentPassword,
        newPassword,
      },
    );
  }

  get token() {
    return this._token();
  }

  isLoggedIn(): boolean {
    const expires = this._expires();
    return (
      !!this._token() && !!expires && new Date(expires).getTime() > Date.now()
    );
  }

  canEnterAdmin(): boolean {
    return this._canEnterAdmin() && this.isLoggedIn();
  }

  consumeAdminAccess(): void {
    this._canEnterAdmin.set(false);
  }

  logout() {
    this._token.set(null);
    this._expires.set(null);
    this._canEnterAdmin.set(false);
    this.router.navigate(['/admin/login']);
  }
}
