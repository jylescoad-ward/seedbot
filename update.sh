#!/bin/bash
echo "Checking if WGET Exists"
if [ ! -x /usr/bin/wget ] ; then
    echo "Installing WGET"
    apt install wget
else
    echo "WGET is installed already, skipping."
    echo ""
    echo "SeedBot is now being updated to the latest version!"
    echo ""
    echo "Fetching Changelog"
    echo ""
    curl -O https://raw.githubusercontent.com/jylescoad-ward/seedbot/master/changelog.txt
    cd src
    echo ""
    echo "Updating Bot"
    echo ""
    curl -O https://raw.githubusercontent.com/jylescoad-ward/seedbot/master/src/package.json
    curl -O https://raw.githubusercontent.com/jylescoad-ward/seedbot/master/src/bot.js
    cd dmoj
    echo ""
    echo "Updating DMOJ Module"
    echo ""
    curl -O https://raw.githubusercontent.com/jylescoad-ward/seedbot/master/src/dmoj/contest.js
    curl -O https://raw.githubusercontent.com/jylescoad-ward/seedbot/master/src/dmoj/problem.js
    curl -O https://raw.githubusercontent.com/jylescoad-ward/seedbot/master/src/dmoj/user.js
    echo ""
    echo "- - - - - - - - - - - -"
    echo "Bot Updated!"
fi