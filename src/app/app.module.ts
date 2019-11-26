import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent,  } from './app.component';
import { ThfModule, } from '@totvs/thf-ui';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CepService } from './services/cep.service';
//import { sinegraService } from './services/sintegra.service';
import { BemacashApi } from './services/Bemacash.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ThfModule
  ],
  providers: [CepService,BemacashApi],
  bootstrap: [AppComponent]
})
export class AppModule {}