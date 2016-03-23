import IThemingProvider = angular.material.IThemingProvider;

export function palette($mdThemingProvider: IThemingProvider) {
    "ngInject"; //needed when directly exporting a class or function
    $mdThemingProvider
        .theme('default')
        .primaryPalette('brown')
        .accentPalette('light-green');
}
