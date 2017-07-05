#! /bin/bash
# how to run on the server 
nohup node ./index >> /var/www/peoplesopen.net/public/meshygarden.tsv 2>> /var/www/peoplesopen.net/public/meshygarden.log &
