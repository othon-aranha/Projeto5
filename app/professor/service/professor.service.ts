import { Injectable } from '@angular/core';
import { Professor } from '../class/professor';


//adicione essas duas linhas
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class ProfessorService {
    //adicione essa linha
    private professorUrl = 'https://othon.herokuapp.com/professor';

    //adicione o construtor da classe
    constructor(private http: Http) { }

    getListProfessor(): Observable<Professor[]> { 
        //adicione esse trecho de código
        return this.http.get(this.professorUrl)
        .map(res => res.json())
        .catch(this.handleError);
    }
    
    deletarProfessor(id: string): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.professorUrl + "/" + id, options);
    }
    
    //método para salvar o usuário
    salvarProfessor(professor: Professor): Observable<Professor> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (!professor._id) {
            return this.http.post(this.professorUrl, professor, options)
                .map(res => res.json())
                .catch(this.handleError);
        } else {
            return this.http.put(this.professorUrl + "/" + professor._id, professor, options)
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
