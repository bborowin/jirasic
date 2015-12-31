var https = require('https');
var fs = require('fs');
var _ = require('lodash');
var Q = require('q');

var issues = [];

/* 
 * Retrieve JIRA issues
 * index: starting index
 * count: batch size
 * returns: promise
 */
var retrieve = function(index, count) {
  var cookie = process.env.JIRASIC_COOKIE;
  var host = process.env.JIRASIC_API_HOST;
  var result = '';
  var key = Math.ceil(Math.random() * 1000000);

  var options = {
      host: host,
      port: 443,
      path: '/rest/api/2/search?jql=order+by+created&expand=changelog&startAt=' + index + '&maxResults=' + count,
      headers: {
          'User-Agent': 'curl/7.43.0',
          'Accept': '*/*',
          'cookie': cookie,
          'content-type': 'application/json; charset=UTF-8'
      }
  };

  var deferred = Q.defer();
  console.log('starting <' + key + '> at ' + index + ', batch size ' + count);
  https.get(options, function(response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      result += chunk;
    });
    response.on('end', function() {
      console.log('<' + key + '> got ' + result.length + ' bytes');
      deferred.resolve(result);
    });
    response.on('error', function(e) {
      console.log('<' + key + '> problem with request: ' + e.message);
    });
  });

  return deferred.promise;
};


var start = 0;
var batchSize = 250;
var issues = [];

var handle = function(response) {
  var json = JSON.parse(response);
  var retrieved = json.issues.length;
  var index = json.startAt + retrieved;
  var total = json.total;
  issues = issues.concat(json.issues);

  console.log('last batch: from ' + json.startAt + ' to ' + (retrieved + json.startAt) + ' of ' + total);
  console.log('issues retrieved: ' + json.issues.length);

  if (index < total) {
    retrieve(index, batchSize).then(handle);
  } else {
    console.log('Total issues retrieved: ' + issues.length);
    fs.writeFile('data/issues.json', JSON.stringify({issues: issues}));
  }
};

var p = retrieve(0, 0).then(handle);


