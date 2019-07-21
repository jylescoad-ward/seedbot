#!/bin/bash
sudo zypper install nodejs8
sudo zypper install ffmpeg
cd src
npm i discord.js discord.js-musicbot-addon public-ip opusscript asciifyutil child_process
cd ..
echo ""
echo "- - - - - - - - - - - - "
echo ""
echo "Install Complete!"
echo "Please continue reading the README.MD for more instrustions."
