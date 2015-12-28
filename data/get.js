var https = require('https');
var fs = require('fs');

var startAt = 0;
var maxResults = 10;
var cookie = process.env.JIRASIC_COOKIE;
var host = process.env.JIRASIC_API_HOST;

var options = {
    host: host,
    port: 443,
    path: '/rest/api/2/search?jql=order+by+created&expand=changelog&startAt=' + startAt + '&maxResults=' + maxResults,
    headers: {
        'User-Agent': 'curl/7.43.0',
        'Accept': '*/*',
        'cookie': cookie,
        'content-type': 'application/json; charset=UTF-8'
    }
};

var result = '';
var req = https.get(options, function(response) {
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    result += chunk;
  });
  response.on('end', function() {
    fs.writeFile('data.json', result);
  });
  response.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
});
