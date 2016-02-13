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
  $state.go('medform.medication');

  // Our form will fill this in for us
  $scope.med = { };
  $scope.med.dispensingFreq= 1;// default to daily
  $scope.inputTime=[1];
  $scope.med.dispensingTime = []; // starts as an array  
  $scope.currentdate = new Date();// current date used on medform-startdate  
  $scope.med.startDate = new Date();// stores the startdate for the medication to be dispensed

  
  $scope.med.specialInstructions = [false,false,false,false,false,'Enter More Instructions'];

  //changes the number of Time inputs
  $scope.radioChange=function(){
    $scope.inputTime = [];
    $scope.med.dispensingTime = [];
    for(i =0; i<$scope.med.dispensingFreq;i++){
      $scope.inputTime[i]=i;
    };
  }

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