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
var professor_1 = require("../class/professor");
var professor_service_1 = require("../service/professor.service");
var ProfessorComponent = (function () {
    function ProfessorComponent(professorService) {
        this.professorService = professorService;
        this.professorObject = new professor_1.Professor();
        this.edit = false;
    }
    ProfessorComponent.prototype.getListProfessores = function () {
        var _this = this;
        this.professorService.getListProfessor()
            .subscribe(function (professores) { return _this.professores = professores; }, function (error) { return _this.errorMessage = error; });
    };
    ProfessorComponent.prototype.deletarProfessor = function (id, i) {
        var _this = this;
        this.i = i;
        this.professorService.deletarProfessor(id)
            .subscribe(function (success) { return _this.professores.splice(_this.i, 1); }, function (error) { return _this.errorMessage = error; });
    };
    ProfessorComponent.prototype.salvarProfessor = function (professor) {
        var _this = this;
        if (!professor.nome) {
            return;
        }
        this.professorService.salvarProfessor(professor)
            .subscribe(function (professor) { return _this.popularLista(professor); }, function (error) { return _this.errorMessage = error; });
    };
    ProfessorComponent.prototype.popularLista = function (professor) {
        this.professores.push(professor);
        this.professorObject = new professor_1.Professor();
    };
    ProfessorComponent.prototype.editarProfessor = function (professor, persistir) {
        if (persistir === void 0) { persistir = false; }
        this.edit = true;
        this.professorObject = professor;
        if (persistir) {
            this.professorObject = new professor_1.Professor();
            this.edit = false;
        }
    };
    ProfessorComponent.prototype.ngOnInit = function () {
        this.getListProfessores();
    };
    return ProfessorComponent;
}());
ProfessorComponent = __decorate([
    core_1.Component({
        selector: 'professor-component',
        templateUrl: 'app/professor/template/professor.template.html',
        providers: [professor_service_1.ProfessorService]
    }),
    __metadata("design:paramtypes", [professor_service_1.ProfessorService])
], ProfessorComponent);
exports.ProfessorComponent = ProfessorComponent;
//# sourceMappingURL=professor.component.js.map