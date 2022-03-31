import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { Login } from '../../models/login.model'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private url = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";
  private urlLogin = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth/login";
  email?: string = "lucas.tesson@ig2i.centralelille.fr";
  password?: string = "lucasledresseur1234";

  accessT?: string;

  expiration: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email?: string, password?: string): Observable<Login> {
    return this.http.post<Login>(this.urlLogin, {
      email: this.email,
      password: this.password
    }).pipe(tap(response => {
      if (response.access_token) {
        localStorage.setItem("t", response.access_token);
        localStorage.setItem("r", response.refresh_token);
        localStorage.setItem("e", response.expires_in);
        // this.expiration = setTimeout(() => this.tokenExpired(), parseInt(localStorage.getItem("e")));
        this.accessT = response.access_token;
      }
    }));
  }

  register(email?: string, password?: string): Observable<Login> {
    return this.http.post<Login>(this.urlLogin, {
      email: email,
      password: password
    }).pipe(tap(response => {
      if (response.access_token) {
        localStorage.setItem("t", response.access_token);
        localStorage.setItem("r", response.refresh_token);
        localStorage.setItem("e", response.expires_in);
        //this.expiration = setTimeout(() => this.tokenExpired(), parseInt(localStorage.getItem("e")));
      }
    }));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("t") != null;
  }

  getToken(): string {
    return localStorage.getItem("t")!;
  }


  getRefreshToken() {
    if (localStorage.getItem("r") !== undefined) {
      return localStorage.getItem("r");
    }
    return null;
  }

  tokenExpired(): void {
    if (null !== this.getRefreshToken()) {
      this.refresh();
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  refresh(): boolean {
    if (null !== this.getRefreshToken()) {
      clearTimeout(this.expiration);
      this.http.post<Login>(this.urlLogin + '/refresh', { refresh_token: this.getRefreshToken() }).pipe(tap(response => {
        if (response.access_token) {
          localStorage.setItem("t", response.access_token);
          localStorage.setItem("r", response.refresh_token);
          localStorage.setItem("e", response.expires_in);
          // this.expiration = setTimeout(() => this.tokenExpired(), parseInt(localStorage.getItem("e")));
        }
      }));
      return true;
    }
    return false
  }

  getMyTeam(token: String) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<number[]>(this.url + '/trainers/me/team', { headers });
  }

  setTeam(team: number[], token: string): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.put<Login>(this.url + '/trainers/me/team', team, { headers }).subscribe(response => {
      if (null !== response && response.statusCode == "401") {
        if (this.refresh()) {
          this.setTeam(team, token);
        }
      }
    });
  }

}
