var resultsrank = angular.module('resultsrank', []);

resultsrank.controller('resultsrankController', ['$scope', 'Ballot', 'User', 'socket', function($scope, Ballot, User, socket){
  var ctrl = this;
  var ballot = Ballot.getBallot();

  ctrl.username = User.getUser();
  ctrl.topic = ballot.topic;
  ctrl.options = ballot.options;
  ctrl.tally = ballot.results;
  ctrl.voters = ballot.voters;
  ctrl.isOwner = User.isOwner;
  ctrl.roomcode = ballot.roomcode;
  ctrl.done = ballot.done;
  ctrl.hasVoted = User.hasVoted();

  function rankResults() {
    var resultsObj = {}; //{asd: '1'}
    var resultsArr = [];//[[asd, 1]]
    for(var key in ctrl.options) {
      resultsObj[ctrl.options[key]] = ctrl.tally[key];
    }
    for (var prop in resultsObj) {
      resultsArr.push([prop, resultsObj[prop]]);
    }
    console.log('sorted: ', resultsArr.sort(function(a, b) {
      return a[1] - b[1]
    }))
    return resultsArr.sort(function(a, b) {
      return a[1] - b[1]
    })
  }


  ctrl.endVote = function(roomcode){
    socket.emit('endVote', ballot);
    Ballot.endVote(roomcode);
  };

  //socket.emit('subscribe', ballot.roomcode);
  socket.emit('newVote', ballot);

  socket.on('newVote', function(data){
    ctrl.topic = data.topic;
    ctrl.options = data.options;
    ctrl.tally = data.results;
    ctrl.voters = data.voters;
    ctrl.sorting = rankResults();

  });

  socket.on('endVote', function(data){
    ctrl.done = true;
  });

}]);
