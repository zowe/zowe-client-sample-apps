#!/bin/bash

shopt -s globstar

echo "Checking source for license files..."
for i in packages/*/src/**/*.ts # or whatever other pattern...
do
  if ! grep -q Copyright $i
  then
    echo "Adding copyright notice to $i"
    cat copyright.txt $i >$i.new && mv $i.new $i
  fi
done