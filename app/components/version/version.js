'use strict';

angular.module('modVersion', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])

.value('version', '1.0');
