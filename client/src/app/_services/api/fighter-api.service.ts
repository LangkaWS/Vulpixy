import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from 'src/app/_models/game';
import { GameApiSerializer } from '../serializer/game-api.serializer';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FighterApiService extends ApiService<Game> {

  constructor(httpClient: HttpClient, apiSerializer: GameApiSerializer) {
		super(httpClient, apiSerializer, 'games/fighter');
	}

}
