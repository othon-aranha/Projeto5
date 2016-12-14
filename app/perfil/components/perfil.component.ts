import { Component, OnInit } from '@angular/core';
import { Perfil } from '../class/perfil';
import { PerfilService } from '../service/perfil.service';


@Component({    
    providers: [PerfilService]
})

export class PerfilComponent  {
    perfis: Perfil[];
    errorMessage: any;    
    i : number;

    constructor(private perfilService: PerfilService) {
        
    }
    
    getListPerfis(): void {
        this.perfilService.getListPerfis()
            .subscribe(
            perfis => this.perfis = perfis,
            error => this.errorMessage = <any>error);
    }    
  

}
