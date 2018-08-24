import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'bulma';
import './scss/style.scss';



import Router from './config/routes';

import Map from './directives/map';
import ngSkycon from './directives/ngSkycon';

import MainCtrl from './controllers/main';
import CarSharesIndexCtrl from './controllers/carShares/index';
import CarSharesShowCtrl from './controllers/carShares/show';
import CarSharesNewCtrl from './controllers/carShares/new';
import CarSharesEditCtrl from './controllers/carShares/edit';
import CommentsNewCtrl from './controllers/comments/new';
import FestivalsIndexCtrl from './controllers/festivals/index';
import FestivalsShowCtrl from './controllers/festivals/show';
import FestivalsNewCtrl from './controllers/festivals/new';
import FestivalsEditCtrl from './controllers/festivals/edit';
import UsersIndexCtrl from './controllers/users/index';
import UsersShowCtrl from './controllers/users/show';
import UsersEditCtrl from './controllers/users/edit';
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';
import PassengersIndexCtrl from './controllers/passengers/index';
import FriendsIndexCtrl from './controllers/friends/index';

angular.module('Festival Companion App', [
  'ui.router', 'satellizer'
])
  .directive('ngMap', Map)
  .directive('ngSkycon', ngSkycon)
  .controller('MainCtrl', MainCtrl)
  .controller('CarSharesIndexCtrl', CarSharesIndexCtrl)
  .controller('CarSharesShowCtrl', CarSharesShowCtrl)
  .controller('CarSharesNewCtrl', CarSharesNewCtrl)
  .controller('CarSharesEditCtrl', CarSharesEditCtrl)
  .controller('CommentsNewCtrl', CommentsNewCtrl)
  .controller('FestivalsIndexCtrl', FestivalsIndexCtrl)
  .controller('FestivalsShowCtrl', FestivalsShowCtrl)
  .controller('FestivalsNewCtrl', FestivalsNewCtrl)
  .controller('FestivalsEditCtrl', FestivalsEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('PassengersIndexCtrl', PassengersIndexCtrl)
  .controller('FriendsIndexCtrl', FriendsIndexCtrl)
  .config(Router)
  .config(function($authProvider){
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
  });
