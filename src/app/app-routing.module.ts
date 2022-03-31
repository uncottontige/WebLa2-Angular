import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemons/components/pokemon-detail/pokemon-detail.component'
import { PokemonListComponent } from './pokemons/components/pokemon-list/pokemon-list.component';
import { PokedexComponent } from './pokemons/components/pokedex/pokedex.component'
import { TeamComponent } from './pokemons/components/team/team.component';

const routes: Routes = [
  { path: '', redirectTo: '/team', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'detail/:id', component: PokemonDetailComponent },
  { path: 'team', component: TeamComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
