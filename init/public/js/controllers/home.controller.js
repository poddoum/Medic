angular.module('autoMedic')
  .controller('homeController', homeController);

homeController.$inject = [
	'$scope',
	'$interval',
  '_med',
  'meds'
	
];

function homeController($scope, $interval, _med, meds){

  $scope.meds = meds.data;


	var searchAddressInput = document.getElementById('pac-input');
	var autocomplete = new google.maps.places.Autocomplete(searchAddressInput);

	google.maps.event.addListener(autocomplete, 'place_changed', function () {
	    onPlaceChanged();
	});


   // store the interval promise in this variable
    var promise;
    // starts the interval
    $scope.start = function() {
      // stops any running interval to avoid two intervals running at the same time
      // $scope.stop(); 
      
      // store the interval promise
      promise = $interval(newLocation, 30000*60); // 30 minutes
    };
  
    // stops the interval
    $scope.stop = function() {
      $interval.cancel(promise);
    };
  
    // starting the interval by default
    $scope.start();
 
    // stops the interval when the scope is destroyed,
    // this usually happens when a route is changed and 
    // the ItemsController $scope gets destroyed. The
    // destruction of the ItemsController scope does not
    // guarantee the stopping of any intervals, you must
    // be responsible of stopping it when the scope is
    // is destroyed.
    $scope.$on('$destroy', function() {
      $scope.stop();
    });

	$scope.newLoc = 1;
	$scope.onPlaceChanged = onPlaceChanged

	function onPlaceChanged() {
	    var place = autocomplete.getPlace() ;
	    $scope.model.searchLocation = place.formatted_address; 
	}

	$scope.newLocation = newLocation ;
	function newLocation(){
		$scope.newLoc = ~$scope.newLoc;
		console.log('update');

	}

}
