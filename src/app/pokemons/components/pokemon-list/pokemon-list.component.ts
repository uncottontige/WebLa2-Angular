import { Component, OnInit } from '@angular/core';
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

}
