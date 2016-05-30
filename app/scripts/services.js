'use strict';

angular.module('rain.backend', []).service('rest', ['$http', function($http)
{
  this.get_energy_data = function()
  {
    return $http.get('https://rain.vg/data_analysis/energy.json');
  };
}]);
