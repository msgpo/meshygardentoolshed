# meshygardentoolshed
a service to store gardenmesh measurements

Also see https://peoplesopen.net/gardenmesh .

# prequisites
node v7.10.0+
npm 4.2.0+

# install
In production: ```npm install --only=prod```
During development: ```npm install```

# run
Executing ```npm run start``` should show something like:

```
[...]
Mosca server is up and running
[...]
```

# charting
visualizing data with chart.js  
this only in prototype mode right now, but could be added to peoplesopen.net
to view example locally, clone repo and run,
```
python -m SimpleHTTPServer
```
or a webserver of your choice, then navigate to your localhost in a browser.

<img src="https://github.com/sudomesh/meshygardentoolshed/raw/master/tempchart.png"></td>

