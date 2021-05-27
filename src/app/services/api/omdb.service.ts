import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  constructor(private httpService: HttpService) {}

  save(body: any) {
    const apiURL = environment.url + 'notes';
    return this.httpService.post(apiURL, body);
  }

  getAll(){
    const apiURL = environment.url + 'notes';
    return this.httpService.get(apiURL);
  }
}
