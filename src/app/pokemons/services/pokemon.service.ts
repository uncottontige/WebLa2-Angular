import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PagedData } from '../../models/paged-data.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }
  private urlPokemons = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  getPokemons(offset: number): Observable<PagedData<Pokemon>> {

    return this.http.get<PagedData<Pokemon>>(`${this.urlPokemons}/pokemons?offset=${offset}&limit=20`).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );

  }

  getPokemon(id: number): Observable<Pokemon | undefined> {

    const url = `${this.urlPokemons}/pokemons/${id}`;

    return this.http.get<Pokemon>(url);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }


  searchPokemons(search: string): Observable<PagedData<Pokemon>> {

    return this.http.get<PagedData<Pokemon>>(`${this.urlPokemons}/pokemons?search=${search}`).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('searchPokemons'))
    )

  }

}
