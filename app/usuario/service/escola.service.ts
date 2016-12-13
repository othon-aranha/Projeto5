import { Injectable } from '@angular/core';
import { Escola } from '../class/escola';


//adicione essas duas linhas
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class EscolaService {
    //adicione essa linha
    private escolaUrl = 'https://othon.herokuapp.com/escola';

    //adicione o construtor da classe
    constructor(private http: Http) { }

    getListEscola(): Observable<Escola[]> { 
        //adicione esse trecho de código
        return this.http.get(this.escolaUrl)
        .map(res => res.json())
        .catch(this.handleError);
    }
    
    deletarEscola(id: string): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.escolaUrl + "/" + id, options);
    }
    
    //método para salvar o usuário
    salvarEscola(escola: Escola): Observable<Escola> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (!escola._id) {
            return this.http.post(this.escolaUrl, escola, options)
                .map(res => res.json())
                .catch(this.handleError);
        } else {
            return this.http.put(this.escolaUrl + "/" + escola._id, escola, options)
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
