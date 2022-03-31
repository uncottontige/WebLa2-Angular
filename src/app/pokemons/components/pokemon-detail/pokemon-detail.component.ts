import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../../models/pokemon.model'
import { Location } from '@angular/common';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() id?: number;
  pokemon?: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) { }

  getPokemon(id: number): void{
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

  ngOnInit(): void {
    this.getPokemon(1);
  }

  getPokemonOld(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon)
  }

  ngOnChanges(changes: SimpleChanges){
    this.pokemon = undefined;
    this.getPokemon(changes.id.currentValue);
  }

  goBack(): void {
    this.location.back();
  }

}
