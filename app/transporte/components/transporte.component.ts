import { Component, OnInit } from '@angular/core';
import { Transporte } from '../class/transporte';
import { TransporteService } from '../service/transporte.service';


@Component({
    selector: 'transporte-component',
    templateUrl: 'app/transporte/template/transporte.template.html',
    providers: [TransporteService]
})

export class TransporteComponent implements OnInit {
    transportes: Transporte[];
    transporteObject = new Transporte();
    edit = false;
    errorMessage: any;
    i : number;

    constructor(private transporteService: TransporteService) {

    }

    getListTransportes(): void {
        this.transporteService.getListTransporte()
            .subscribe(
            transportes => this.transportes = transportes,
            error => this.errorMessage = <any>error);
    }

   deletarTransporte(id, i): void {
        this.i = i;
        this.transporteService.deletarTransporte(id)
            .subscribe(
            success => this.transportes.splice(this.i, 1),
            error => this.errorMessage = <any>error);
   }

   salvarTransporte(transporte: Transporte) {
        if (!transporte.nome) { return; }
        this.transporteService.salvarTransporte(transporte)
            .subscribe(
            transporte => this.popularLista(transporte),
            error => this.errorMessage = <any>error
            );
    }

    popularLista(transporte: Transporte) {
        this.transportes.push(transporte);
        this.transporteObject = new Transporte();
    }

    editarTransporte(transporte, persistir = false): void {
        this.edit = true;
        this.transporteObject = transporte;
        if (persistir) {
            this.transporteObject = new Transporte();
            this.edit = false;
        }
    }

    ngOnInit(): void {
        this.getListTransportes();
    }

}
