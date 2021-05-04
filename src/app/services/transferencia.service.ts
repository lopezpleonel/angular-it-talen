import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:5000/api";

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl + "/transferencia/listar");
  }

  create(data, id): Observable<any> {
    return this.http.post(baseUrl + "/transferencia/crear/" + id, data);
  }

}
