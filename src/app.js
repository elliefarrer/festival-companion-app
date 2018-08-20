import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'bulma';

import Router from './config/routes';

import CarSharesIndexCtrl from './controllers/carShares/index';
import CarSharesShowCtrl from './controllers/carShares/show';
import CarSharesNewCtrl from './controllers/carShares/new';
import CarSharesEditCtrl from './controllers/carShares/edit';
import FestivalsIndexCtrl from './controllers/festivals/index';
import FestivalsShowCtrl from './controllers/festivals/show';
import FestivalsNewCtrl from './controllers/festivals/new';
import FestivalsEditCtrl from './controllers/festivals/edit';
import UsersShowCtrl from './controllers/users/show';
import UsersEditCtrl from './controllers/users/edit';

angular.module('Festival Companion App', [
  'ui.router'
])
  .controller('CarSharesIndexCtrl', CarSharesIndexCtrl)
  .controller('CarSharesShowCtrl', CarSharesShowCtrl)
  .controller('CarSharesNewCtrl', CarSharesNewCtrl)
  .controller('CarSharesEditCtrl', CarSharesEditCtrl)
  .controller('FestivalsIndexCtrl', FestivalsIndexCtrl)
  .controller('FestivalsShowCtrl', FestivalsShowCtrl)
  .controller('FestivalsNewCtrl', FestivalsNewCtrl)
  .controller('FestivalsEditCtrl', FestivalsEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .config(Router);
