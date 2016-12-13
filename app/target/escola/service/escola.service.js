"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
//adicione essas duas linhas
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var EscolaService = (function () {
    //adicione o construtor da classe
    function EscolaService(http) {
        this.http = http;
        //adicione essa linha
        this.escolaUrl = 'https://othon.herokuapp.com/escola';
    }
    EscolaService.prototype.getListEscola = function () {
        //adicione esse trecho de código
        return this.http.get(this.escolaUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EscolaService.prototype.deletarEscola = function (id) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.delete(this.escolaUrl + "/" + id, options);
    };
    //método para salvar o usuário
    EscolaService.prototype.salvarEscola = function (escola) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        if (!escola._id) {
            return this.http.post(this.escolaUrl, escola, options)
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        else {
            return this.http.put(this.escolaUrl + "/" + escola._id, escola, options)
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
    };
    //Crie esse método
    EscolaService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return EscolaService;
}());
EscolaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EscolaService);
exports.EscolaService = EscolaService;
//# sourceMappingURL=escola.service.js.map