
// Instantiate the controller
angular.module('autoMedic')
  .controller('inventoryController', inventoryController);

// Load in our dependencies for this controller (we need _med!)
inventoryController.$inject = [
  '$scope',
  '_med',
  '$state',
  'mySocket',

  // Resolves
  'meds'
];
function inventoryController($scope, _med, $state,mySocket, meds) {
  $scope.meds = meds.data;
  console.log(meds);


  $scope.currentIndex = 0 ;
  $scope.setCurrentMedIndex = function (index) {
    $scope.currentIndex = index;
  } ;
  $scope.isCurrentMedIndex = function (index) {
    return $scope.currentIndex === index ;
  } ;

  $scope.nextMed = function() {
    $scope.currentIndex = ($scope.currentIndex < $scope.meds.length -1) ? ++$scope.currentIndex : 0 ;
  } ;
  $scope.prevMed = function() {
    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.meds.length-1 ;
  } ;


  $scope.deleteMed = deleteMed;

  function deleteMed(med, index) {


    $scope.currentIndex = --$scope.currentIndex ;

    mySocket.emit('delete',
        {
          inventory:$scope.meds[index].inventorySlot, 
      });

    _med.delete(med._id)
      .then(function() {

        // Medication was deleted, let's remove it from the list!
        $scope.meds.splice(index, 1);
          //reload for main controller to update
        
        $scope.$emit('myreload',{r:1});     

      });
  }

  $scope.onInsert = onInsert;

//changes the amount 
  function onInsert(med,index,data){ 
  $scope.meds[index].amount = $scope.meds[index].amount+ data;

  $scope.changeIt = { 
          'amount': $scope.meds[index].amount
        };


  _med.update(med._id, $scope.changeIt)
    .then(function(){
       $state.go('insert',{medID:med._id});
    }); 

  }

  $scope.dispensed={}; 
  $scope.dispenseMed = dispenseMed;

  
  function dispenseMed(med,index){

    //$scope.dispensed.pillName = $scope.meds[index].pillName;

    // if there is enough pill to be dispensed then dispense required amount 
    if($scope.meds[index].amount - $scope.meds[index].dosage>0){
        $scope.dispensed.pillName = $scope.meds[index].pillName;
        $scope.dispensed.dosage = $scope.meds[index].dosage; 
        $scope.dispensed.dateDispensed = new Date();

        _med.logPill($scope.dispensed)
          .then(function(){
          //change the number that there  
          $scope.edited = { 
          'amount': $scope.meds[index].amount - $scope.meds[index].dosage 
        };
          _med.notify(med); // sends an SMS message 
          _med.update(med._id, $scope.edited)
            .then(function(){
            $state.go('dispensing',{medID:med._id});
        }); 
      });

    //otherwise dispense the amount remaining      
    }else{
        $scope.dispensed.pillName = $scope.meds[index].pillName;
        $scope.dispensed.dosage = $scope.meds[index].amount;
        $scope.dispensed.dateDispensed = new Date();
        $scope.edited = {
              'dosage': 0,
              'amount': -1
            };

        _med.logPill($scope.dispensed)
          .then(function(){
            $scope.edited.dosage= $scope.meds[index].amount;
              
            _med.notify(med); // sends SMS message
            _med.update(med._id,$scope.edited).
            then(function(){
              $state.go('dispensing',{medID:med._id});
            });
          }); 

    } 
 
  }
}