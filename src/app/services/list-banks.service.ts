import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListBanksService {

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(this.getUrlExterna());
  }

  getUrlExterna() {
    return "https://bast.dev/api/banks.php";
  }
}
