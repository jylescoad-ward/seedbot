#!/bin/bash
cd src/
File=config.json
CheckContents='"token": "token-here",'
if  grep -q "$CheckContents" "$File"  ; then
    echo "You have not changed the config.json file"
    echo "Please go through the README.md file again carefully"
	exit 0
else
    echo "config.json is edited. Starting SeedBot"
    echo "- - - - - - - - - -"
    node bot.js
    exit 1
fi
