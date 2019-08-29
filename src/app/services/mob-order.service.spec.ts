import { TestBed } from '@angular/core/testing';

import { MobOrderService } from './mob-order.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { mockMobOrderEasy, mockMobOrderHard, mockMobOrderMedium, mockMobOrderList } from '../mocks/mockMobOrders';

describe('MobOrderService', () => {
  let service: MobOrderService;
  let httpClient: HttpTestingController;

  beforeEach(() => { TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
    service = TestBed.get(MobOrderService);
    httpClient = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a create mobOrder with difficulty set to easy', () => {
    const mockHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    service.createMobOrder("Easy").subscribe(response => {
      expect(response).toBe(mockMobOrderEasy);
    });

    let request = httpClient.expectOne(environment.mobOrderSaveNew);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Content-Type')).toBe(mockHttpOptions.headers.get('Content-Type'));
    request.flush(mockMobOrderEasy);
  });

  it('should send a create mobOrder with difficulty set to medium', () => {
    const mockHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    service.createMobOrder("Medium").subscribe(response => {
      expect(response).toBe(mockMobOrderMedium);
    });

    let request = httpClient.expectOne(environment.mobOrderSaveNew);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Content-Type')).toBe(mockHttpOptions.headers.get('Content-Type'));
    request.flush(mockMobOrderMedium);
  });

  it('should send a create mobOrder with difficulty set to hard', () => {
    const mockHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    service.createMobOrder("Hard").subscribe(response => {
      expect(response).toBe(mockMobOrderHard);
    });

    let request = httpClient.expectOne(environment.mobOrderSaveNew);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Content-Type')).toBe(mockHttpOptions.headers.get('Content-Type'));
    request.flush(mockMobOrderHard);
  });

  it('should send a get mobOrder request', () => {
    const mockHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    service.getMobOrder().subscribe(response => {
      expect(response).toBe(mockMobOrderList);
    });

    let request = httpClient.expectOne(environment.mobOrderController);
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Content-Type')).toBe(mockHttpOptions.headers.get('Content-Type'));
    request.flush(mockMobOrderList);
  });
});
