import { Component, OnInit } from '@angular/core';
import { Escola } from '../class/escola';
import { EscolaService } from '../service/escola.service';


@Component({
    selector: 'usuario-component',
    templateUrl: 'app/usuario/template/usuario.template.html',
    providers: [EscolaService]
})

export class EscolaComponent implements OnInit {
    escolas: Escola[];
    escolaObject = new Escola();
    edit = false;
    errorMessage: any;
    i : number;

    constructor(private escolaService: EscolaService) {

    }

    getListEscolas(): void {
        this.escolaService.getListEscola()
            .subscribe(
            escolas => this.escolas = escolas,
            error => this.errorMessage = <any>error);
    }

   deletarEscola(id, i): void {
        this.i = i;
        this.escolaService.deletarEscola(id)
            .subscribe(
            success => this.escolas.splice(this.i, 1),
            error => this.errorMessage = <any>error);
   }

   salvarEscola(escola: Escola) {
        if (!escola.nome) { return; }
        this.escolaService.salvarEscola(escola)
            .subscribe(
            escola => this.popularLista(escola),
            error => this.errorMessage = <any>error
            );
    }

    popularLista(escola: Escola) {
        this.escolas.push(escola);
        this.escolaObject = new Escola();
    }

    editarEscola(escola, persistir = false): void {
        this.edit = true;
        this.escolaObject = escola;
        if (persistir) {
            this.escolaObject = new Escola();
            this.edit = false;
        }
    }

    ngOnInit(): void {
        this.getListEscolas();
    }

}
