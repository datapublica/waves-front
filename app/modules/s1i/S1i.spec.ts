import 'angular';
import 'angular-mocks';
import '../../services'
import {S1iController} from './S1iController';
import {SectorService} from "../../services/SectorService";

describe("S1i", () =>{
    var $httpBackend: ng.IHttpBackendService,
        $controller: ng.IControllerService,
        ctrl: S1iController;

    beforeEach(() => {
        angular.mock.module('app.services')
    });

    beforeEach(() => {
        angular.mock.inject(function (_$httpBackend_: ng.IHttpBackendService, _$controller_: ng.IControllerService, _SectorService_: SectorService) {
            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
            ctrl = $controller(S1iController, {SectorService: _SectorService_});
        })
    });

    it('should init the helloWorld variable', () => {
        expect(ctrl.helloWorld).toBe('Hello World !');
    });
});
