# Making Text to speech callouts with Sinch API and Node.js

Today I had a customer who wanted a example of node.js code to make [text to speech](https://en.wikipedia.org/wiki/Speech_synthesis) call-outs, to read more about Sinch API please see the [documentation](https://www.sinch.com/docs/voice/rest/#Callouts). This particular customer wanted make a call out when SMS messages could not be delivered to the handset. Of course you could use this for any type of SMS that you suspect of not being delivered. Or alerts that are time sensitive like credit card alerts.



## Prerequisites 
 - Node development environment 
 - Sinch account, get one here if you don't have one [Sign up](https://sinch.com/signup) and key secret to you app. 
 - Some credits on your account, if not already verify your phone in the dashboard and my boss will give you $2 to try us out with.

##  Code
For this code snippet we will use our sins-request npm package to sign requests to the api. We will make a call to +15551234567, and when the users picks up tell the person "Your pinched is 1234" in US English. 

```javascript
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
     prompts : "#tts[Your pin code is 1234]", } });

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
```



## Next steps
Next tutorial I will add IVR input for the another use case, credit card fraud alerts.
