// Instantiate the controller
angular.module('autoMedic')
  .controller('medformController', medformController);

// Load our service into the controller
medformController.$inject = [
  '$scope',
  '$state',
  '_med'
];

function medformController($scope, $state, _med) {
  $scope.createMed= createMed;

  // Our form will fill this in for us
  $scope.med = { };
  $scope.currentdate = new Date();
  $scope.startDate = new Date();
  $scope.med.specialInstructions = [false,false,false,false,false,'Enter More Instructions'];

  $scope.change=function(){
    $scope.med.specialInstructions[5] = 'Enter More Instructions';
  }

  function createMed() {
    if ($scope.medicationForm.$valid) {
      $scope.med.inventorySlot = Math.floor((Math.random() * 8) + 1);
      $scope.med.dateAdded = new Date(); 
      _med.create($scope.med)
        .then(function() {
          // check to the medication was added to the inventory
          $state.go('inventory');
        });
    }
  }
}