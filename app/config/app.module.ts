import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuarioComponent } from '../usuario/components/usuario.component';
import { UsuarioService } from '../usuario/service/usuario.service';
import { EscolaComponent } from '../escola/components/escola.component';
import { EscolaService } from '../escola/service/escola.service';
import { ProfessorComponent } from '../professor/components/professor.component';
import { ProfessorService } from '../professor/service/professor.service';
import { TransporteComponent } from '../transporte/components/transporte.component';
import { TransporteService } from '../transporte/service/transporte.service';

//adicione essa linha
import { HttpModule }    from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        UsuarioComponent,
        EscolaComponent,
        ProfessorComponent,
        TransporteComponent
    ],
    providers:[
        EscolaService,
        ProfessorService

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }