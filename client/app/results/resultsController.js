var results = angular.module('results', []);

results.controller('resultsController', ['$scope', 'Ballot', 'User', 'socket', function($scope, Ballot, User, socket){
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

  ctrl.endVote = function(roomcode){
    socket.emit('endVote', ballot);
    Ballot.endVote(roomcode);
  };

  socket.emit('newVote', ballot);

  socket.on('newVote', function(data){
    ctrl.topic = data.topic;
    ctrl.options = data.options;
    ctrl.tally = data.results;
    ctrl.voters = data.voters;
    var labels = [];
    for (var k in ctrl.options) {
      labels.push(ctrl.options[k])
    }
    var data = {
      labels: labels,
      series: ctrl.tally
    };

    var sum = function(a, b) { return a + b };

    new Chartist.Pie('.ct-chart', data, {
      labelInterpolationFnc: function(value) {
        return Math.round(data.series[data.labels.indexOf(value)] / data.series.reduce(sum) * 100) + '%';
      }
    });
  });

  socket.on('endVote', function(data){
    ctrl.done = true;
  });

}]);
