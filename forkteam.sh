#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: forkteam.sh <team name> <team color>"
    echo "Example: forkteam.sh Apollo '#FF4500'"
    exit
fi

cp teams/foo.coffee teams/$1.coffee
sed -i s/Foo/$1/  teams/$1.coffee
sed -i s/red/$2/  teams/$1.coffee

echo "root.client1.$1 = $1" >> src/client1.coffee
echo "root.client2.$1 = $1" >> src/client2.coffee
