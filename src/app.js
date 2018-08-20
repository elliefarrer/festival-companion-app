import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'bulma';

import Router from './config/routes';



angular.module('Festival Companion App', [
  'ui.router'
])
  .config(Router);
