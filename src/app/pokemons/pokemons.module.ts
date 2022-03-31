import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http'
import { MatListModule } from '@angular/material/list';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { TeamComponent } from './components/team/team.component'

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent, TeamComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatListModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSidenavModule,
    FormsModule
  ],
  exports : [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent
  ]
})
export class PokemonsModule { }
