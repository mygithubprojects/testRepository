'use strict';

angular.module('modVersion', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])

.value('version', '2.0');
