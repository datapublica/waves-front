import {NavbarComponent} from "./navbar/navbar";
/**
 Global components for the app
 **/

angular.module('app.components', [])
    .component('navbar', new NavbarComponent());