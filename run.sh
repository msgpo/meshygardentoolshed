#! /bin/bash
# how to run on the server
nohup node ./index >> ./web/meshygarden.tsv 2>> ./meshygarden.log &
