import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MobOrder } from '../models/MobOrder';

@Injectable({
  providedIn: 'root'
})
export class MobOrderService {

  constructor(private _httpClient: HttpClient) { }

  createMobOrder(difficulty: string): Observable<MobOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.post<MobOrder>(environment.mobOrderSaveNew, difficulty, httpOptions);
  }

  getMobOrder(): Observable<MobOrder[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.get<MobOrder[]>(environment.mobOrderController, httpOptions);
  }
}
