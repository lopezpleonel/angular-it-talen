import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:5000/api";

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  constructor(private http : HttpClient) { }

  create(data): Observable<any> {
    return this.http.post(baseUrl + "/destinatario/crear", data);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl + "/destinatario/listar");
  }
}
