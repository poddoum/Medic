
// Load routes (states) for our application
angular.module('autoMedic')
  .config(config);

// What this block depends on
config.$inject = [
  '$stateProvider', // <-- From ui-router, we use this to configure our states
  '$urlRouterProvider' // <-- We use this to declare our default state
];

function config($stateProvider, $urlRouterProvider) {

  // Load up our states
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })

    .state('inventory', {
      url: '/inventory',
      templateUrl: 'templates/inventory.html',
      controller: 'inventoryController',

      // Advanced: load the meds in before the state loads
      resolve: {
        meds: ['_med', function(_med) {
          return _med.getAll();
        }]
      }
    })

    .state('addmed', {
      url: '/addmed',
      templateUrl: 'templates/addmed.html',
      controller: 'addmedController'
    })

    .state('history', {
      url: '/history',
      templateUrl: 'templates/history.html',
      controller: 'historyController',

      resolve: {
        dispensed: ['_med', function(_med) {
          return _med.getAllLogs();
        }]
      }
    })

    .state('serialtest',{
      url:'/serialtest',
      templateUrl: 'templates/serialtest.html',
      controller: 'serialtestController' 
    });

  // Declare our default state to be the home state
  $urlRouterProvider.otherwise('/');
}