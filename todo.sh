#!/bin/bash

USER=vio
PASS=asdf123
TODO_URL=http://vio-todo.herokuapp.com

TITLE=$@
if [ -z "$TITLE" ]; then
    echo "Usage: ./todo.sh task name"
    exit 1
fi

curl -u $USER:$PASS -H "Content-Type: application/json" -X POST --data "{\"title\": \"$TITLE\"}" $TODO_URL/api/v1/todo/
echo

