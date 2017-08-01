var sinchRequest = require('sinch-request');
var https = require('https');

var creds = {
  key: 'your key',
  secret: 'your secret'
}

var bodyData = JSON.stringify({ method: 'ttsCallout',
  ttsCallout: 
   { cli: '46000000000',
     destination: { type: 'number', endpoint: '+15612600684' },
     domain: 'pstn',
     custom: 'customData',
     locale: 'en-US',
     prompts : "#tts[Hello, this is a synthesized message];myprerecordedfile", } });
     // if you have files uploaded to our plattform you would refer to them by name with out extenstion 


var options = {
  method: 'POST',
  host: 'callingapi.sinch.com',
  port: 443,
  path: '/v1/callouts',
  data: bodyData, // Data to be sent in JSON format
 // withCredentials: true, // Necessary for browser compatability (browserify)
};
console.log(options);
sinchRequest.applicationSigned(options, creds);
var req = https.request(options, function(response) {
  console.log('API response', response.statusCode);
  var data = '';
  response.on('data', function (chunk) {
    data += chunk;
  });
  response.on('end', function () {
    console.log('Response body: ' + data);
  });
});
req.end(options.data);
