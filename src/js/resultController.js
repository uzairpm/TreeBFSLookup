var myApp = angular.module('myApp');

myApp.controller('resultController',
	['$scope', '$window', function($scope, $window) {

	$scope.goBack = function() {
		$window.history.back();
	}

	$scope.searchedNode = localStorage.searchNumber;

	//private function
	function contains(array, obj) {
		var i = array.length;
		while(i--) {
			if(array[i] === obj) {
				return true;
			}
		}
		return false;
	}

	var isFound = false,
			node = "",
			resultEl = document.getElementById("result"),
			nodeVal = $scope.searchedNode;

	//console.log("Node to find using BFS "+$scope.searchedNode);

	var lookup = new TreeLookup();
	lookup.getChildrenAsCallback(node, function(err, nodes0) {
		if(contains(nodes0, nodeVal)) {
			resultEl.innerHTML = "Found via Root > "+nodeVal;
			isFound = true;
		}
		for(var i in nodes0) {
			if(isFound) {
				break;
			}
			(function(val1){
				lookup.getChildrenAsCallback(val1, function(err, nodes1) {
					if(contains(nodes1, nodeVal) && !isFound) {
						resultEl.innerHTML = "Found via Root > "+val1 + " > "+nodeVal;
						isFound = true;
					}
					for(var j =0; j<nodes1.length; j++) {
						if(isFound) {
						break;
					}
					(function(val2){
							lookup.getChildrenAsCallback(val1+"/"+val2, function(err, nodes2) {
								if(contains(nodes2, nodeVal) && !isFound) {
									resultEl.innerHTML = "Found via Root > "+val1 + " > "+val2+ " > "+nodeVal;
									isFound = true;
								}
							});

						})(nodes1[j]);
					}
				})
			})(nodes0[i]);
		}
	});
	if(!isFound) {
		resultEl.innerHTML = "Not Found";
	}
}]);
