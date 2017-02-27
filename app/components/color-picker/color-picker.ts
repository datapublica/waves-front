import {directive} from "../../decorators/directive";

import './color-picker.scss';
import {CustomRootScope} from "../../config/core/coreRun";

interface ColorPickerScope extends ng.IScope
{
    displayColorPicker: boolean;
    openColorPicker: Function;
    selectedColor: any;
}

@directive('$parse', '$rootScope')
export class ColorPicker implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public require: string;
    public template: string;
    
    constructor($parse: ng.IParseService, $rootScope: CustomRootScope) {
        
        this.scope = {};
    
        this.require = 'ngModel';
        
        this.template = <string> require('./color-picker.html');
        
        this.link = ($scope: ColorPickerScope, element, attrs: any, ngModel): void => {
    
            $scope.selectedColor = ngModel;
            
            $scope.openColorPicker = () => {
                // Toggle the colorPicker
                $scope.displayColorPicker = true;
                $rootScope.displayDropback = function () {
                    $scope.displayColorPicker = false;
                    $rootScope.displayDropback = undefined;
                };
            };
            
            let swatches = [
                {
                name: 'Red',
                camel: 'red',
                colors: [
                    { name: '50', hex: 'FFEBEE', x: undefined, y: undefined },
                    { name: '100', hex: 'FFCDD2', x: undefined, y: undefined },
                    { name: '200', hex: 'EF9A9A', x: undefined, y: undefined },
                    { name: '300', hex: 'E57373', x: undefined, y: undefined },
                    { name: '400', hex: 'EF5350', x: undefined, y: undefined },
                    { name: '500', hex: 'F44336', x: undefined, y: undefined },
                    { name: '600', hex: 'E53935', x: undefined, y: undefined },
                    { name: '700', hex: 'D32F2F', x: undefined, y: undefined },
                    { name: '800', hex: 'C62828', x: undefined, y: undefined },
                    { name: '900', hex: 'B71C1C', x: undefined, y: undefined },
                    { name: 'A100', hex: 'FF8A80', x: undefined, y: undefined },
                    { name: 'A200', hex: 'FF5252', x: undefined, y: undefined },
                    { name: 'A400', hex: 'FF1744', x: undefined, y: undefined },
                    { name: 'A700', hex: 'D50000', x: undefined, y: undefined }
                ]
            }, {
                name: 'Pink',
                camel: 'pink',
                colors: [
                    { name: '50', hex: 'FCE4EC', x: undefined, y: undefined },
                    { name: '100', hex: 'F8BBD0', x: undefined, y: undefined },
                    { name: '200', hex: 'F48FB1', x: undefined, y: undefined },
                    { name: '300', hex: 'F06292', x: undefined, y: undefined },
                    { name: '400', hex: 'EC407A', x: undefined, y: undefined },
                    { name: '500', hex: 'E91E63', x: undefined, y: undefined },
                    { name: '600', hex: 'D81B60', x: undefined, y: undefined },
                    { name: '700', hex: 'C2185B', x: undefined, y: undefined },
                    { name: '800', hex: 'AD1457', x: undefined, y: undefined },
                    { name: '900', hex: '880E4F', x: undefined, y: undefined },
                    { name: 'A100', hex: 'FF80AB', x: undefined, y: undefined },
                    { name: 'A200', hex: 'FF4081', x: undefined, y: undefined },
                    { name: 'A400', hex: 'F50057', x: undefined, y: undefined },
                    { name: 'A700', hex: 'C51162', x: undefined, y: undefined }
                ]
            }, {
                name: 'Purple',
                camel: 'purple',
                colors: [
                    { name: '50', hex: 'F3E5F5', x: undefined, y: undefined },
                    { name: '100', hex: 'E1BEE7', x: undefined, y: undefined },
                    { name: '200', hex: 'CE93D8', x: undefined, y: undefined },
                    { name: '300', hex: 'BA68C8', x: undefined, y: undefined },
                    { name: '400', hex: 'AB47BC', x: undefined, y: undefined },
                    { name: '500', hex: '9C27B0', x: undefined, y: undefined },
                    { name: '600', hex: '8E24AA', x: undefined, y: undefined },
                    { name: '700', hex: '7B1FA2', x: undefined, y: undefined },
                    { name: '800', hex: '6A1B9A', x: undefined, y: undefined },
                    { name: '900', hex: '4A148C', x: undefined, y: undefined },
                    { name: 'A100', hex: 'EA80FC', x: undefined, y: undefined },
                    { name: 'A200', hex: 'E040FB', x: undefined, y: undefined },
                    { name: 'A400', hex: 'D500F9', x: undefined, y: undefined },
                    { name: 'A700', hex: 'AA00FF', x: undefined, y: undefined }
                ]
            }, {
                name: 'Deep Purple',
                camel: 'deepPurple',
                colors: [
                    { name: '50', hex: 'EDE7F6', x: undefined, y: undefined },
                    { name: '100', hex: 'D1C4E9', x: undefined, y: undefined },
                    { name: '200', hex: 'B39DDB', x: undefined, y: undefined },
                    { name: '300', hex: '9575CD', x: undefined, y: undefined },
                    { name: '400', hex: '7E57C2', x: undefined, y: undefined },
                    { name: '500', hex: '673AB7', x: undefined, y: undefined },
                    { name: '600', hex: '5E35B1', x: undefined, y: undefined },
                    { name: '700', hex: '512DA8', x: undefined, y: undefined },
                    { name: '800', hex: '4527A0', x: undefined, y: undefined },
                    { name: '900', hex: '311B92', x: undefined, y: undefined },
                    { name: 'A100', hex: 'B388FF', x: undefined, y: undefined },
                    { name: 'A200', hex: '7C4DFF', x: undefined, y: undefined },
                    { name: 'A400', hex: '651FFF', x: undefined, y: undefined },
                    { name: 'A700', hex: '6200EA', x: undefined, y: undefined }
                ]
            }, {
                name: 'Indigo',
                camel: 'indigo',
                colors: [
                    { name: '50', hex: 'E8EAF6', x: undefined, y: undefined },
                    { name: '100', hex: 'C5CAE9', x: undefined, y: undefined },
                    { name: '200', hex: '9FA8DA', x: undefined, y: undefined },
                    { name: '300', hex: '7986CB', x: undefined, y: undefined },
                    { name: '400', hex: '5C6BC0', x: undefined, y: undefined },
                    { name: '500', hex: '3F51B5', x: undefined, y: undefined },
                    { name: '600', hex: '3949AB', x: undefined, y: undefined },
                    { name: '700', hex: '303F9F', x: undefined, y: undefined },
                    { name: '800', hex: '283593', x: undefined, y: undefined },
                    { name: '900', hex: '1A237E', x: undefined, y: undefined },
                    { name: 'A100', hex: '8C9EFF', x: undefined, y: undefined },
                    { name: 'A200', hex: '536DFE', x: undefined, y: undefined },
                    { name: 'A400', hex: '3D5AFE', x: undefined, y: undefined },
                    { name: 'A700', hex: '304FFE', x: undefined, y: undefined }
                ]
            }, {
                name: 'Blue',
                camel: 'blue',
                colors: [
                    { name: '50', hex: 'E3F2FD', x: undefined, y: undefined },
                    { name: '100', hex: 'BBDEFB', x: undefined, y: undefined },
                    { name: '200', hex: '90CAF9', x: undefined, y: undefined },
                    { name: '300', hex: '64B5F6', x: undefined, y: undefined },
                    { name: '400', hex: '42A5F5', x: undefined, y: undefined },
                    { name: '500', hex: '2196F3', x: undefined, y: undefined },
                    { name: '600', hex: '1E88E5', x: undefined, y: undefined },
                    { name: '700', hex: '1976D2', x: undefined, y: undefined },
                    { name: '800', hex: '1565C0', x: undefined, y: undefined },
                    { name: '900', hex: '0D47A1', x: undefined, y: undefined },
                    { name: 'A100', hex: '82B1FF', x: undefined, y: undefined },
                    { name: 'A200', hex: '448AFF', x: undefined, y: undefined },
                    { name: 'A400', hex: '2979FF', x: undefined, y: undefined },
                    { name: 'A700', hex: '2962FF', x: undefined, y: undefined }
                ]
            }, {
                name: 'Light Blue',
                camel: 'lightBlue',
                colors: [
                    { name: '50', hex: 'E1F5FE', x: undefined, y: undefined },
                    { name: '100', hex: 'B3E5FC', x: undefined, y: undefined },
                    { name: '200', hex: '81D4FA', x: undefined, y: undefined },
                    { name: '300', hex: '4FC3F7', x: undefined, y: undefined },
                    { name: '400', hex: '29B6F6', x: undefined, y: undefined },
                    { name: '500', hex: '03A9F4', x: undefined, y: undefined },
                    { name: '600', hex: '039BE5', x: undefined, y: undefined },
                    { name: '700', hex: '0288D1', x: undefined, y: undefined },
                    { name: '800', hex: '0277BD', x: undefined, y: undefined },
                    { name: '900', hex: '01579B', x: undefined, y: undefined },
                    { name: 'A100', hex: '80D8FF', x: undefined, y: undefined },
                    { name: 'A200', hex: '40C4FF', x: undefined, y: undefined },
                    { name: 'A400', hex: '00B0FF', x: undefined, y: undefined },
                    { name: 'A700', hex: '0091EA', x: undefined, y: undefined }
                ]
            }, {
                name: 'Cyan',
                camel: 'cyan',
                colors: [
                    { name: '50', hex: 'E0F7FA', x: undefined, y: undefined },
                    { name: '100', hex: 'B2EBF2', x: undefined, y: undefined },
                    { name: '200', hex: '80DEEA', x: undefined, y: undefined },
                    { name: '300', hex: '4DD0E1', x: undefined, y: undefined },
                    { name: '400', hex: '26C6DA', x: undefined, y: undefined },
                    { name: '500', hex: '00BCD4', x: undefined, y: undefined },
                    { name: '600', hex: '00ACC1', x: undefined, y: undefined },
                    { name: '700', hex: '0097A7', x: undefined, y: undefined },
                    { name: '800', hex: '00838F', x: undefined, y: undefined },
                    { name: '900', hex: '006064', x: undefined, y: undefined },
                    { name: 'A100', hex: '84FFFF', x: undefined, y: undefined },
                    { name: 'A200', hex: '18FFFF', x: undefined, y: undefined },
                    { name: 'A400', hex: '00E5FF', x: undefined, y: undefined },
                    { name: 'A700', hex: '00B8D4', x: undefined, y: undefined }
                ]
            }, {
                name: 'Teal',
                camel: 'teal',
                colors: [
                    { name: '50', hex: 'E0F2F1', x: undefined, y: undefined },
                    { name: '100', hex: 'B2DFDB', x: undefined, y: undefined },
                    { name: '200', hex: '80CBC4', x: undefined, y: undefined },
                    { name: '300', hex: '4DB6AC', x: undefined, y: undefined },
                    { name: '400', hex: '26A69A', x: undefined, y: undefined },
                    { name: '500', hex: '009688', x: undefined, y: undefined },
                    { name: '600', hex: '00897B', x: undefined, y: undefined },
                    { name: '700', hex: '00796B', x: undefined, y: undefined },
                    { name: '800', hex: '00695C', x: undefined, y: undefined },
                    { name: '900', hex: '004D40', x: undefined, y: undefined },
                    { name: 'A100', hex: 'A7FFEB', x: undefined, y: undefined },
                    { name: 'A200', hex: '64FFDA', x: undefined, y: undefined },
                    { name: 'A400', hex: '1DE9B6', x: undefined, y: undefined },
                    { name: 'A700', hex: '00BFA5', x: undefined, y: undefined }
                ]
            }, {
                name: 'Green',
                camel: 'green',
                colors: [
                    { name: '50', hex: 'E8F5E9', x: undefined, y: undefined },
                    { name: '100', hex: 'C8E6C9', x: undefined, y: undefined },
                    { name: '200', hex: 'A5D6A7', x: undefined, y: undefined },
                    { name: '300', hex: '81C784', x: undefined, y: undefined },
                    { name: '400', hex: '66BB6A', x: undefined, y: undefined },
                    { name: '500', hex: '4CAF50', x: undefined, y: undefined },
                    { name: '600', hex: '43A047', x: undefined, y: undefined },
                    { name: '700', hex: '388E3C', x: undefined, y: undefined },
                    { name: '800', hex: '2E7D32', x: undefined, y: undefined },
                    { name: '900', hex: '1B5E20', x: undefined, y: undefined },
                    { name: 'A100', hex: 'B9F6CA', x: undefined, y: undefined },
                    { name: 'A200', hex: '69F0AE', x: undefined, y: undefined },
                    { name: 'A400', hex: '00E676', x: undefined, y: undefined },
                    { name: 'A700', hex: '00C853', x: undefined, y: undefined }
                ]
            }, {
                name: 'Light Green',
                camel: 'lightGreen',
                colors: [
                    { name: '50', hex: 'F1F8E9', x: undefined, y: undefined },
                    { name: '100', hex: 'DCEDC8', x: undefined, y: undefined },
                    { name: '200', hex: 'C5E1A5', x: undefined, y: undefined },
                    { name: '300', hex: 'AED581', x: undefined, y: undefined },
                    { name: '400', hex: '9CCC65', x: undefined, y: undefined },
                    { name: '500', hex: '8BC34A', x: undefined, y: undefined },
                    { name: '600', hex: '7CB342', x: undefined, y: undefined },
                    { name: '700', hex: '689F38', x: undefined, y: undefined },
                    { name: '800', hex: '558B2F', x: undefined, y: undefined },
                    { name: '900', hex: '33691E', x: undefined, y: undefined },
                    { name: 'A100', hex: 'CCFF90', x: undefined, y: undefined },
                    { name: 'A200', hex: 'B2FF59', x: undefined, y: undefined },
                    { name: 'A400', hex: '76FF03', x: undefined, y: undefined },
                    { name: 'A700', hex: '64DD17', x: undefined, y: undefined }
                ]
            }, {
                name: 'Lime',
                camel: 'lime',
                colors: [
                    { name: '50', hex: 'F9FBE7', x: undefined, y: undefined },
                    { name: '100', hex: 'F0F4C3', x: undefined, y: undefined },
                    { name: '200', hex: 'E6EE9C', x: undefined, y: undefined },
                    { name: '300', hex: 'DCE775', x: undefined, y: undefined },
                    { name: '400', hex: 'D4E157', x: undefined, y: undefined },
                    { name: '500', hex: 'CDDC39', x: undefined, y: undefined },
                    { name: '600', hex: 'C0CA33', x: undefined, y: undefined },
                    { name: '700', hex: 'AFB42B', x: undefined, y: undefined },
                    { name: '800', hex: '9E9D24', x: undefined, y: undefined },
                    { name: '900', hex: '827717', x: undefined, y: undefined },
                    { name: 'A100', hex: 'F4FF81', x: undefined, y: undefined },
                    { name: 'A200', hex: 'EEFF41', x: undefined, y: undefined },
                    { name: 'A400', hex: 'C6FF00', x: undefined, y: undefined },
                    { name: 'A700', hex: 'AEEA00', x: undefined, y: undefined }
                ]
            }, {
                name: 'Yellow',
                camel: 'yellow',
                colors: [
                    { name: '50', hex: 'FFFDE7', x: undefined, y: undefined },
                    { name: '100', hex: 'FFF9C4', x: undefined, y: undefined },
                    { name: '200', hex: 'FFF59D', x: undefined, y: undefined },
                    { name: '300', hex: 'FFF176', x: undefined, y: undefined },
                    { name: '400', hex: 'FFEE58', x: undefined, y: undefined },
                    { name: '500', hex: 'FFEB3B', x: undefined, y: undefined },
                    { name: '600', hex: 'FDD835', x: undefined, y: undefined },
                    { name: '700', hex: 'FBC02D', x: undefined, y: undefined },
                    { name: '800', hex: 'F9A825', x: undefined, y: undefined },
                    { name: '900', hex: 'F57F17', x: undefined, y: undefined },
                    { name: 'A100', hex: 'FFFF8D', x: undefined, y: undefined },
                    { name: 'A200', hex: 'FFFF00', x: undefined, y: undefined },
                    { name: 'A400', hex: 'FFEA00', x: undefined, y: undefined },
                    { name: 'A700', hex: 'FFD600', x: undefined, y: undefined }
                ]
            }, {
                name: 'Amber',
                camel: 'amber',
                colors: [
                    { name: '50', hex: 'FFF8E1', x: undefined, y: undefined },
                    { name: '100', hex: 'FFECB3', x: undefined, y: undefined },
                    { name: '200', hex: 'FFE082', x: undefined, y: undefined },
                    { name: '300', hex: 'FFD54F', x: undefined, y: undefined },
                    { name: '400', hex: 'FFCA28', x: undefined, y: undefined },
                    { name: '500', hex: 'FFC107', x: undefined, y: undefined },
                    { name: '600', hex: 'FFB300', x: undefined, y: undefined },
                    { name: '700', hex: 'FFA000', x: undefined, y: undefined },
                    { name: '800', hex: 'FF8F00', x: undefined, y: undefined },
                    { name: '900', hex: 'FF6F00', x: undefined, y: undefined },
                    { name: 'A100', hex: 'FFE57F', x: undefined, y: undefined },
                    { name: 'A200', hex: 'FFD740', x: undefined, y: undefined },
                    { name: 'A400', hex: 'FFC400', x: undefined, y: undefined },
                    { name: 'A700', hex: 'FFAB00', x: undefined, y: undefined }
                ]
            }, {
                name: 'Orange',
                camel: 'orange',
                colors: [
                    { name: '50', hex: 'FFF3E0', x: undefined, y: undefined },
                    { name: '100', hex: 'FFE0B2', x: undefined, y: undefined },
                    { name: '200', hex: 'FFCC80', x: undefined, y: undefined },
                    { name: '300', hex: 'FFB74D', x: undefined, y: undefined },
                    { name: '400', hex: 'FFA726', x: undefined, y: undefined },
                    { name: '500', hex: 'FF9800', x: undefined, y: undefined },
                    { name: '600', hex: 'FB8C00', x: undefined, y: undefined },
                    { name: '700', hex: 'F57C00', x: undefined, y: undefined },
                    { name: '800', hex: 'EF6C00', x: undefined, y: undefined },
                    { name: '900', hex: 'E65100', x: undefined, y: undefined },
                    { name: 'A100', hex: 'FFD180', x: undefined, y: undefined },
                    { name: 'A200', hex: 'FFAB40', x: undefined, y: undefined },
                    { name: 'A400', hex: 'FF9100', x: undefined, y: undefined },
                    { name: 'A700', hex: 'FF6D00', x: undefined, y: undefined }
                ]
            }, {
                name: 'Deep Orange',
                camel: 'deepOrange',
                colors: [
                    { name: '50', hex: 'FBE9E7', x: undefined, y: undefined },
                    { name: '100', hex: 'FFCCBC', x: undefined, y: undefined },
                    { name: '200', hex: 'FFAB91', x: undefined, y: undefined },
                    { name: '300', hex: 'FF8A65', x: undefined, y: undefined },
                    { name: '400', hex: 'FF7043', x: undefined, y: undefined },
                    { name: '500', hex: 'FF5722', x: undefined, y: undefined },
                    { name: '600', hex: 'F4511E', x: undefined, y: undefined },
                    { name: '700', hex: 'E64A19', x: undefined, y: undefined },
                    { name: '800', hex: 'D84315', x: undefined, y: undefined },
                    { name: '900', hex: 'BF360C', x: undefined, y: undefined },
                    { name: 'A100', hex: 'FF9E80', x: undefined, y: undefined },
                    { name: 'A200', hex: 'FF6E40', x: undefined, y: undefined },
                    { name: 'A400', hex: 'FF3D00', x: undefined, y: undefined },
                    { name: 'A700', hex: 'DD2C00', x: undefined, y: undefined }
                ]
            }, {
                name: 'Brown',
                camel: 'brown',
                colors: [
                    { name: '50', hex: 'EFEBE9', x: undefined, y: undefined },
                    { name: '100', hex: 'D7CCC8', x: undefined, y: undefined },
                    { name: '200', hex: 'BCAAA4', x: undefined, y: undefined },
                    { name: '300', hex: 'A1887F', x: undefined, y: undefined },
                    { name: '400', hex: '8D6E63', x: undefined, y: undefined },
                    { name: '500', hex: '795548', x: undefined, y: undefined },
                    { name: '600', hex: '6D4C41', x: undefined, y: undefined },
                    { name: '700', hex: '5D4037', x: undefined, y: undefined },
                    { name: '800', hex: '4E342E', x: undefined, y: undefined },
                    { name: '900', hex: '3E2723', x: undefined, y: undefined }
                ]
            }, {
                name: 'Grey',
                camel: 'grey',
                colors: [
                    { name: '50', hex: 'FAFAFA', x: undefined, y: undefined },
                    { name: '100', hex: 'F5F5F5', x: undefined, y: undefined },
                    { name: '200', hex: 'EEEEEE', x: undefined, y: undefined },
                    { name: '300', hex: 'E0E0E0', x: undefined, y: undefined },
                    { name: '400', hex: 'BDBDBD', x: undefined, y: undefined },
                    { name: '500', hex: '9E9E9E', x: undefined, y: undefined },
                    { name: '600', hex: '757575', x: undefined, y: undefined },
                    { name: '700', hex: '616161', x: undefined, y: undefined },
                    { name: '800', hex: '424242', x: undefined, y: undefined },
                    { name: '900', hex: '212121', x: undefined, y: undefined }
                ]
            }, {
                name: 'Blue Grey',
                camel: 'blueGrey',
                colors: [
                    { name: '50', hex: 'ECEFF1', x: undefined, y: undefined },
                    { name: '100', hex: 'CFD8DC', x: undefined, y: undefined },
                    { name: '200', hex: 'B0BEC5', x: undefined, y: undefined },
                    { name: '300', hex: '90A4AE', x: undefined, y: undefined },
                    { name: '400', hex: '78909C', x: undefined, y: undefined },
                    { name: '500', hex: '607D8B', x: undefined, y: undefined },
                    { name: '600', hex: '546E7A', x: undefined, y: undefined },
                    { name: '700', hex: '455A64', x: undefined, y: undefined },
                    { name: '800', hex: '37474F', x: undefined, y: undefined },
                    { name: '900', hex: '263238', x: undefined, y: undefined }
                ]
            }, {
                name: 'Misc',
                camel: '',
                colors: [
                    { name: 'white', hex: 'FFFFFF', x: 19, y: 0 },
                    { name: 'black', hex: '000000', x: 19, y: 1 }
                ]
            }];
            let hexToRgb = function (hex) {
                let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
            };
            let cToHex = function (c) {
                let hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };
            let rgbToHex = function (r, g, b) {
                return "#" + cToHex(r) + cToHex(g) + cToHex(b);
            };
            let h = function (c) {
                if (c == '') { return 0; }
                let t = parseInt(c);
                return t >= 0 && t <= 255 ? t : 0;
            };
            let getName = function (hex) {
                if (!(hex)) { return ''; }
                for (let i = 0; i < 19; i++) {
                    for (let j = 0; j < swatches[i].colors.length; j++) {
                        if (swatches[i].colors[j].hex == hex.replace('#', '')) {
                            return swatches[i].camel + swatches[i].colors[j].name;
                        }
                    }
                }
                return '';
            };
            
            angular.element(element).addClass('color-picker');
            let selection = [];
            for (let x = 0; x <= 20; x++) {
                selection.push([]);
            }
            let size = 15;
            let state = {
                mousedown: false,
                ignore: false,
                selected: { color: null, x: 0, y: 0 }
            };
            let container = angular.element('<div>');
            container.addClass('color-picker-colors');
            
            let action = function (color) {
                selection[state.selected.x][state.selected.y].ele.removeClass('selected');
                state.selected.color = color.hex;
                state.selected.x = color.x;
                state.selected.y = color.y;
                let camel = swatches[color.x].camel;
                let format = $parse(attrs.format);
                if (format(null) === 'hex') {
                    ngModel.$setViewValue('#' + color.hex);
                } else {
                    let rgb = hexToRgb(color.hex);
                    ngModel.$setViewValue({
                        hex: '#' + color.hex,
                        name: camel + color.name,
                        r: rgb.r, g: rgb.g, b: rgb.b
                    });
                }
                state.ignore = true;
                selection[color.x][color.y].ele.addClass('selected');
            };
            let isHex = function (hex) {
                if (typeof hex == 'undefined') { return null; }
                return hex.match(/^#([0-9A-F]{6})$/i);
            };
            
            let selectColor = function (hex) {
                let m = null;
                if (m = isHex(hex)) {
                    selection[state.selected.x][state.selected.y].ele.removeClass('selected');
                    outer:
                        for (let i = 0; i < swatches.length; i++) {
                            for (let j = 0; j < swatches[i].colors.length; j++) {
                                if (swatches[i].colors[j].hex == m[1]) {
                                    selection[i][j].ele.addClass('selected');
                                    state.selected.x = i;
                                    state.selected.y = j;
                                    break outer;
                                }
                            }
                        }
                }
            };
            for (let i = 0; i < 19; i++) {
                let column = angular.element('<div>');
                column.css({
                    display: 'inline-block',
                    verticalAlign: 'top'
                });
                for (let j = 0; j < swatches[i].colors.length; j++) {
                    let row = angular.element('<div>');
                    selection[i][j] = { ele: row };
                    swatches[i].colors[j].x = i;
                    swatches[i].colors[j].y = j;
                    row.css({
                        background: '#' + swatches[i].colors[j].hex,
                        width: size + 'px',
                        height: size + 'px'
                    });
                    row.on('click', (function (color) {
                        return function () {
                            action(color);
                        };
                    })(swatches[i].colors[j]));
                    column.append(row);
                }
                container.append(column);
            }
            let white = angular.element('<div>');
            white.css({
                background: '#FFF',
                display: 'inline-block',
                width: (size * 3) + 'px',
                height: (size * 2) + 'px',
                position: 'absolute',
                left: (size * 16) + 'px',
                top: (size * 10) + 'px'
            });
            selection[19][0] = { ele: white };
            white.on('click', (function (color) {
                return function () {
                    action(color);
                };
            })(swatches[19].colors[0]));
            white.on('mouseover', (function (swatch, color) {
                return function () {
                    if (attrs.hoverModel) {
                        let model = $parse(attrs.hoverModel);
                        model.assign($scope, {
                            hex: '#' + color.hex,
                            name: swatch.camel + color.name,
                            r: 255, g: 255, b: 255
                        });
                        $scope.$apply();
                    }
                    if (!state.mousedown
                        || (color.x === state.selected.x
                        && color.y === state.selected.y)) { return; }
                    action(color);
                };
            })(swatches[19], swatches[19].colors[0]));
            white.addClass('color-picker-white');
            container.append(white);
            let black = angular.element('<div>');
            black.css({
                background: '#000',
                display: 'inline-block',
                width: (size * 3) + 'px',
                height: (size * 2) + 'px',
                position: 'absolute',
                left: (size * 16) + 'px',
                top: (size * 12) + 'px'
            });
            selection[19][1] = { ele: black };
            black.on('click', (function (color) {
                return function () {
                    action(color);
                };
            })(swatches[19].colors[1]));
            black.on('mouseover', (function (swatch, color) {
                return function () {
                    if (attrs.hoverModel) {
                        let model = $parse(attrs.hoverModel)
                        model.assign($scope, {
                            hex: '#' + color.hex,
                            name: swatch.camel + color.name,
                            r: 0, g: 0, b: 0
                        });
                        $scope.$apply();
                    }
                    if (!state.mousedown
                        || (color.x === state.selected.x
                        && color.y === state.selected.y)) { return; }
                    action(color);
                };
            })(swatches[19], swatches[19].colors[1]));
            container.append(black);
            element.append(container);
            let format = $parse(attrs.format);
            let watch = format(null) === 'hex' ? '$watch' : '$watchCollection';
            $scope[watch](attrs.ngModel, function (value, oldValue) {
                if (typeof value == 'undefined') { return; }
                if (format(null) !== 'hex') {
                    if (value.hex.match(/^[^#]/)) {
                        value.hex = '#' + value.hex;
                    }
                    let color = hexToRgb(value.hex);
                    if (color) {
                        if ((value.r == color.r || typeof value.r == 'undefined')
                            && (value.g == color.g || typeof value.g == 'undefined')
                            && (value.b == color.b || typeof value.b == 'undefined')) {
                            if (value.r != '') { value.r = color.r; }
                            if (value.g != '') { value.g = color.g; }
                            if (value.b != '') { value.b = color.b; }
                        } else {
                            if (value.hex != oldValue.hex) {
                                value.r = color.r;
                                value.g = color.g;
                                value.b = color.b;
                            } else {
                                value.hex = rgbToHex(
                                    h(value.r) || 0,
                                    h(value.g) || 0,
                                    h(value.b) || 0
                                );
                            }
                        }
                    } else {
                        let revertColor = hexToRgb(oldValue.hex);
                        if (revertColor) {
                            value.r = h(revertColor.r) || 0;
                            value.g = h(revertColor.g) || 0;
                            value.b = h(revertColor.b) || 0;
                        }
                    }
                }
                value.name = getName(value.hex || oldValue.hex);
                if (isHex(value.hex || value)) {
                    ngModel.$setValidity('required', true);
                } else {
                    ngModel.$setValidity('required', false);
                }
                let v = format(null) === 'hex' ? value : value.hex;
                selectColor(v);
            });
            if (attrs.size) {
                $scope.$watch(attrs.size, function (nSize: number) {
                    for (let i = 0; i < selection.length; i++) {
                        for (let j = 0; j < selection[i].length; j++) {
                            selection[i][j].ele.css({
                                width: nSize + 'px',
                                height: nSize + 'px'
                            });
                        }
                    }
                    white.css({
                        width: (nSize * 3) + 'px',
                        height: (nSize * 2) + 'px',
                        left: (nSize * 16) + 'px',
                        top: (nSize * 10) + 'px'
                    });
                    black.css({
                        width: (nSize * 3) + 'px',
                        height: (nSize * 2) + 'px',
                        left: (nSize * 16) + 'px',
                        top: (nSize * 12) + 'px'
                    });
                });
            }
        }
    }
}