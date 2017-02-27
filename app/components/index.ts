import {NavbarComponent} from "./navbar/navbar";
import {ColorPicker} from "./color-picker/color-picker";
/**
 Global components for the app
 **/

angular.module('app.components', [])
    .component('navbar', new NavbarComponent())
    .directive('colorPicker', <any> ColorPicker);