var sinchRequest = require('sinch-request');
var https = require('https');

var creds = { key: 'your key',
  secret: 'your secret'
};

var bodyData = JSON.stringify({ method: 'ttsCallout',
  ttsCallout: 
   { destination: { type: 'number', endpoint: '+15551234567' },
     domain: 'pstn',
     custom: 'customData',
     locale: 'en-US',
     prompts : "#tts[Hello, this is a synthesized message];myprerecordedfile", } });
// if you have files uploaded to our plattform you would refer to them by name with out extenstion 
// there is also enableACE and enable DICE, ACE would trigger a callback when the user picks
// up the phone, and Dice when ice when the call ends


var options = {
  method: 'POST',
  host: 'callingapi.sinch.com',
  port: 443,
  path: '/v1/callouts',
  data: bodyData
};

sinchRequest.applicationSigned(options, creds);
var req = https.request(options, function(response) {
  var data = '';
  response.on('data', function (chunk) {
    data += chunk;
  });
  response.on('end', function () {
    console.log('Response body: ' + data);
    //here you can i.e save your callid,
  });
});
req.end(options.data);
