import { Component, Input, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { PokemonService } from '../../services/pokemon.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {

  team?: number[];
  pokemonTeam = [] as any;
  @Input() pokemonIdToAdd?: number;

  constructor(private connexionService: ConnexionService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.connexionService.login().subscribe(result => { console.log(result.access_token) });
    this.getTeam();
  }

  getTeam(): void {

    this.pokemonTeam = [];

    this.connexionService.getMyTeam(this.connexionService.getToken()).subscribe((result) => {
      this.team = result;
      const forkArray: Observable<any>[] = result.map((id) => this.pokemonService.getPokemons(id - 1));
      forkJoin(forkArray).subscribe(team => {
        this.pokemonTeam = team;
        console.log(this.pokemonTeam);
      });
    });

  }

}
