import { Component, OnInit } from '@angular/core';
import { Usuario } from '../class/usuario';
import { UsuarioService } from '../service/usuario.service';
import { Perfil } from '../../perfil/class/perfil';
import { PerfilService } from '../../perfil/service/perfil.service';
import { CorreiosService } from '../../correios/service/correios.service';


@Component({
    selector: 'usuario-component',
    templateUrl: 'app/usuario/template/usuario.template.html',
    providers: [UsuarioService,PerfilService,CorreiosService]
})

export class UsuarioComponent implements OnInit {
    usuarios: Usuario[];
    usuarioObject = new Usuario();    
    perfis: Perfil[];
    edit = false;
    errorMessage: any;
    i : number;

    constructor(private usuarioService: UsuarioService,
        private perfilService: PerfilService,
        private correiosService: CorreiosService) {
    }

    onChange(cep):void{
        console.log(cep);
        if ( ( cep != null ) && (cep.toString().length == 8) ){
            this.correiosService.getCEP(cep)
            .subscribe(
                response => this.popularLogradouro(response),
                error => this.errorMessage = <any>error);
        }        
    }
    
    popularLogradouro(response){
        this.usuarioObject.endereco = 
        "Logradouro: " + response.logradouro + 
        " Bairro: " + response.bairro ; 
    }
    
   deletarUsuario(id, i): void {
        this.i = i;
        this.usuarioService.deletarUsuario(id)
            .subscribe(
            success => this.usuarios.splice(this.i, 1),
            error => this.errorMessage = <any>error);
   }

   salvarUsuario(usuario: Usuario) {
        if (!usuario.nome) { return; }
        this.usuarioService.salvarUsuario(usuario)
            .subscribe(
            usuario => this.popularLista(usuario),
            error => this.errorMessage = <any>error
            );
    }

    editarUsuario(usuario, persistir = false): void {
        this.edit = true;
        this.usuarioObject = usuario;
        
        for (var p in this.perfis){
            if (usuario.perfil.nome == this.perfis[p].nome){
                usuario.perfil = this.perfis[p];
            }
        }
        
        if (persistir) {
            this.usuarioObject = new Usuario();
            this.edit = false;
        }
    }
    
    listar(): void {
        this.usuarioService.getListUsuario()
            .subscribe(
            usuarios => this.usuarios = usuarios,
            error => this.errorMessage = <any>error);
    }
    
    listarPerfil():void{
        this.perfilService.getListPerfis()
            .subscribe(
            response => this.popularPerfis(response),
            error => this.errorMessage = <any>error);   
    }    
    
    popularPerfis(perfis): void{
        this.perfis = perfis;
        this.usuarioObject.perfil = this.perfis[0];
    }
    
    popularLista(usuario: Usuario) {
        this.usuarios.push(usuario);
        this.usuarioObject = new Usuario();
        this.usuarioObject.perfil = this.perfis[0];
    }    

    ngOnInit(): void {
        this.listar();
        this.listarPerfil();
    }

}
