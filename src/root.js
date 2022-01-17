import angular from "angular";

const app = angular.module('app', []);

app.service('apiService', function() {
	return {
		post: async (data) => {
			try {
				const response = await fetch({
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					data: JSON.stringify(data)
				});

				const data = await response.json();

				return data;
			} catch(e) {
				console.error(e);
				return null;
			}
		}
	}
});

app.controller('AppController', ['$scope', 'apiService', function($scope, apiService) {
	this.state = window.__INITIAL_STATE__;

}]);