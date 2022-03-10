import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://rest_api_project.test:8000/customers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>
  {
    return this.http.get(`${baseUrl}`);
  }

  Search(firstName): Observable<any>
  {
    return this.http.get(`${baseUrl}/search/${firstName}`);
  }

  SaveUser(data): Observable<any>
  {
    return this.http.post(`${baseUrl}`, data);
  }

  DeleteUser(id): Observable<any>
  {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
