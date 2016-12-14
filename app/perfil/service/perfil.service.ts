import { Injectable } from '@angular/core';
import { Perfil } from '../class/perfil';


//adicione essas duas linhas
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class PerfilService {
    //adicione essa linha
    private perfilUrl = 'https://othon.herokuapp.com/perfil';

    //adicione o construtor da classe
    constructor(private http: Http) { }

    perfis: Perfil[];
    getListPerfis(): Observable<Perfil[]> {         
        return this.http.get(this.perfilUrl)
        .map(res => res.json())
        .catch(this.handleError);
    }
    
    deletarPerfil(id: string): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.perfilUrl + "/" + id, options);
    }
    
    //método para salvar o usuário
    salvarPerfil(perfil: Perfil): Observable<Perfil> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (!perfil._id) {
            return this.http.post(this.perfilUrl, perfil, options)
                .map(res => res.json())
                .catch(this.handleError);
        } else {
            return this.http.put(this.perfilUrl + "/" + perfil._id, perfil, options)
                .map(res => res.json())
                .catch(this.handleError);
        }

}

    //Crie esse método
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
