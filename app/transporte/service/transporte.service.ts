import { Injectable } from '@angular/core';
import { Transporte } from '../class/transporte';


//adicione essas duas linhas
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class TransporteService {
    //adicione essa linha
    private transporteUrl = 'https://othon.herokuapp.com/transporte';

    //adicione o construtor da classe
    constructor(private http: Http) { }

    getListTransporte(): Observable<Transporte[]> { 
        //adicione esse trecho de código
        return this.http.get(this.transporteUrl)
        .map(res => res.json())
        .catch(this.handleError);
    }
    
    deletarTransporte(id: string): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.transporteUrl + "/" + id, options);
    }
    
    //método para salvar o usuário
    salvarTransporte(transporte: Transporte): Observable<Transporte> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (!transporte._id) {
            return this.http.post(this.transporteUrl, transporte, options)
                .map(res => res.json())
                .catch(this.handleError);
        } else {
            return this.http.put(this.transporteUrl + "/" + transporte._id, transporte, options)
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
