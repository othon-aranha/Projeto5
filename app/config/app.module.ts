import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EscolaComponent } from '../usuario/components/escola.component';
import { EscolaService } from '../usuario/service/escola.service';

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
        EscolaComponent
    ],
    providers:[
        EscolaService

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }