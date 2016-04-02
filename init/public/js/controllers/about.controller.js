angular.module('autoMedic')
  .controller('aboutController', aboutController);

// Load in our dependencies for this controller (we need _med!)
aboutController.$inject = [
  '$scope',
  '$stateParams',
  '$state',
  '_med',
  'mySocket'


  // Resolves
];
function aboutController($scope, $stateParams,$state, _med,mySocket) {

$scope.slides = [{image:'/images/pill_1.jpg',id:0},
                 {image:'/images/pill_2.jpg',id:1},
                 {image:'/images/pill_3.jpg',id:2},
                 {image:'/images/pill_4.jpg',id:3},
                 {image:'/images/pill_5.jpg',id:4},
                 {image:'/images/pill_6.jpg',id:5},
                 {image:'/images/pill_7.jpg',id:6},
                 {image:'/images/pill_8.jpg',id:7},
                 {image:'/images/pill_9.jpg',id:8},
                 {image:'/images/pill_10.jpg',id:9}];

}