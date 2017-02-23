import IThemingProvider = angular.material.IThemingProvider;

export function palette($mdThemingProvider: IThemingProvider) {
    "ngInject"; //needed when directly exporting a class or function
    $mdThemingProvider.definePalette('wavesPrimary', {
        '50': '#fad2cd',
        '100': '#f7bdb6',
        '200': '#f5a89f',
        '300': '#f29388',
        '400': '#ef7f71',
        '500': '#ED6A5A',
        '600': '#ea5543',
        '700': '#e8402c',
        '800': '#e22f19',
        '900': '#cb2a16',
        'A100': '#fce7e4',
        'A200': '#fffbfb',
        'A400': '#ffffff',
        'A700': '#b42514',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.definePalette('wavesAccent', {
        '50': '#9d2011',
        '100': '#b42514',
        '200': '#cb2a16',
        '300': '#e22f19',
        '400': '#e8402c',
        '500': '#ea5543',
        '600': '#ef7f71',
        '700': '#f29388',
        '800': '#f5a89f',
        '900': '#f7bdb6',
        'A100': '#ef7f71',
        'A200': '#ED6A5A',
        'A400': '#ea5543',
        'A700': '#fad2cd',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.definePalette('wavesWarn', {
        '50': '#afd3d5',
        '100': '#9fc9cc',
        '200': '#8ec0c3',
        '300': '#7db7bb',
        '400': '#6dadb2',
        '500': '#5CA4A9',
        '600': '#51959a',
        '700': '#498589',
        '800': '#407579',
        '900': '#376568',
        'A100': '#c0dcde',
        'A200': '#d1e5e7',
        'A400': '#e2efef',
        'A700': '#2e5557',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
        
    });
    
    $mdThemingProvider
    .theme('default')
    .primaryPalette('wavesPrimary')
    .accentPalette('wavesAccent')
    .warnPalette('wavesWarn');
}
