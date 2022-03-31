import { Component, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service'
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  offset: number = 0;
  search = '';
  @Output() id = new EventEmitter<number>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  onScroll(): void {
    this.offset += 20;
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons(this.offset).subscribe(result => this.pokemons = this.pokemons.concat(result.data));
  }

  getPokemonsBySearch(search: string): void {
    this.pokemonService.searchPokemons(this.search).subscribe(result => this.pokemons = result.data);
  }

  sendId(value: number): void {
    this.id.emit(value);
  }

  clear(){
    this.pokemons = [];
    this.offset = 0;
    this.getPokemons();   
  }

  searchPokemons(): void {
    if (!this.search) {
      this.clear();
    } else {
      this.getPokemonsBySearch(this.search);

    }
  }
}
