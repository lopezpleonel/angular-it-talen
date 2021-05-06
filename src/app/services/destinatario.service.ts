import { environment } from "../../environments/environment"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  constructor(private http : HttpClient) { }

  create(data): Observable<any> {
    return this.http.post(environment.baseUrl + "/destinatario/crear", data);
  }

  getAll(): Observable<any> {
    return this.http.get(environment.baseUrl + "/destinatario/listar");
  }
}
