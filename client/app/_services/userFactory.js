var Ballotize = angular.module('Ballotize');

Ballotize.factory('User', [function(){
  var user = '';
  var code = '';
  var isOwner = false;

  var setUser = function(username){
    return user = username;
  }

  var getUser = function(){
    return user;
  }

  var setCode = function(input){
    return code = input;
  }

  var getCode = function(){
    return code;
  }

  return {
    setUser: setUser,
    getUser: getUser,
    setCode: setCode,
    getCode: getCode,
    isOwner: isOwner
  }
}]);
