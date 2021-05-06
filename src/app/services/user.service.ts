import { environment } from "../../environments/environment"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient,
              private router : Router) { }

  registrar(data): Observable<any> {
    return this.http.post(environment.baseUrl + "/user/signup", data);
  }

  ingresar(data): Observable<any> {
    return this.http.post(environment.baseUrl + "/user/login", data);
  }

  usuarioIngresado() {
    return !!localStorage.getItem('token');
  }

  cerrarSesionUsuario() {
    localStorage.removeItem('token');
    this.router.navigate(['/ingresarUsuario']);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

}
