import { environment } from "../../environments/environment"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(environment.baseUrl + "/transferencia/listar");
  }

  create(data, id): Observable<any> {
    return this.http.post(environment.baseUrl + "/transferencia/crear/" + id, data);
  }

}
