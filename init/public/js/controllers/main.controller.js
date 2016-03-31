
// Instantiate the controller
angular.module('autoMedic')
  .controller('mainController', mainController);

// Load our service into the controller
mainController.$inject = [
  '$scope',
  '$state',
  '$interval',
  '_med'
];

function mainController($scope, $state, $interval, _med) {
_med.getAll().then(function(data){
		console.log(data.data);
		$scope.med = data.data;  
		$scope.newschedule =[];

		data.data.forEach(function(elem){
			elem.dispensingTime.forEach(function(element){
				$scope.newone = {
					pillName:elem.pillName,
          			dispensingTime:element
				}
				$scope.newschedule.push($scope.newone);
			});
		});
		$scope.newschedule.sort(function(a, b) {
	    a = new Date(a.dispensingTime);
	    b = new Date(b.dispensingTime);
	    return a<b ? -1 : a>b ? 1 : 0;
		});

	});

	$interval(callAtInterval, 500000); // 5 minutes, callAtInterval called

	$scope.callAtInterval = callAtInterval;
	  
	function callAtInterval() {
	    $scope.test = new Date();

	}

}