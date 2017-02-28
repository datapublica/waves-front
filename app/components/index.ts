import {NavbarComponent} from "./navbar/navbar";
import {ColorPicker} from "./color-picker/color-picker";
import {EventAlertComponent} from "./event-alert/event-alert";
/**
 Global components for the app
 **/

angular.module('app.components', [])
    .component('navbar', new NavbarComponent())
    .component('eventAlert', new EventAlertComponent())
    .directive('colorPicker', <any> ColorPicker);