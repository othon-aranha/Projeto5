import { Component, OnInit } from '@angular/core';
import { Professor } from '../class/professor';
import { ProfessorService } from '../service/professor.service';


@Component({
    selector: 'professor-component',
    templateUrl: 'app/professor/template/professor.template.html',
    providers: [ProfessorService]
})

export class ProfessorComponent implements OnInit {
    professores: Professor[];
    professorObject = new Professor();
    edit = false;
    errorMessage: any;
    i : number;

    constructor(private professorService: ProfessorService) {

    }

    getListProfessores(): void {
        this.professorService.getListProfessor()
            .subscribe(
            professores => this.professores = professores,
            error => this.errorMessage = <any>error);
    }

   deletarProfessor(id, i): void {
        this.i = i;
        this.professorService.deletarProfessor(id)
            .subscribe(
            success => this.professores.splice(this.i, 1),
            error => this.errorMessage = <any>error);
   }

   salvarProfessor(professor: Professor) {
        if (!professor.nome) { return; }
        this.professorService.salvarProfessor(professor)
            .subscribe(
            escola => this.popularLista(escola),
            error => this.errorMessage = <any>error
            );
    }

    popularLista(escola: Professor) {
        this.professores.push(escola);
        this.professorObject = new Professor();
    }

    editarProfessor(escola, persistir = false): void {
        this.edit = true;
        this.professorObject = escola;
        if (persistir) {
            this.professorObject = new Professor();
            this.edit = false;
        }
    }

    ngOnInit(): void {
        this.getListProfessores();
    }

}
