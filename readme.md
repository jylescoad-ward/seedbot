# How to install SeedBot on Debian<br>
### Step 1: Downloading SeedBot<br>
Download SeedBot by using  `git clone` or `wget`

If you want to use `git clone` then type this in your terminal of choice

`git clone https://github.com/jylescoad-ward/seedbot.git`

then type

`unzip seedbot-master.zip`



**If you want to use wget then follow the instructions below**

Type in your console of choice

`wget https://github.com/jylescoad-ward/seedbot/archive/master.zip`

then unzip it using `unzip`

`unzip master.zip`

and change the name to something that you will remember

`mv master/ mybot/`

### Step 2: Making a Bot User
To make a bot I suggest using this guide to help you

https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/


### Step 3: Adding your Own Token
To get your bot token go in the bot tab on your application

and click the `Copy` button below the `Click to Reveal Token` button


![guideimg1](.guide/guide1.png)

Then go into the config file which is in `src/config.json` and open it up in your perfered text editor and replace the text `token-here` in the second line.

![guideimg2](.guide/guide2.PNG)

With your token that you got from your Discord Bot Application Page

![guideimg3](.guide/guide3.PNG)

It should look a bit like this

### Step 4: Adding your Youtube API v3 Token
1. Go to your credential page using this link

https://console.developers.google.com/apis/credentials

2. Click on create project

![guideimg4](.guide/guide6.png)

3. Enter a project name

![guideimg5](.guide/guide5.png)



4. Go to the library on the left hand side

![guideimg6](.guide/guide6.png)

5. Search for Youtube API v3 and Enable it

![guideimg7](.guide/guide7.png)


6. Click on Create Credentials

![guideimg8](.guide/guide8.png)

7. Select **Youtube API** with the **Web Server** setting

![guideimg9](.guide/guide9.png)

8. Copy your API key

![guideimg10](.guide/guide10.png)

9. Go **back** in to the `config.json` file and replace `youtube-api-token` on line 6 with your own API key

![guideimg11](.guide/guide11.PNG)

![guideimg12](.guide/guide12.PNG)



### Step 4: Installing the bot
To install the bot go into the root directory (where changelog.txt is) and type this in to your console

```bash
sudo chmod +x install-apt.sh || sudo chmod +x start.sh || sudo chmod +x update.sh
```
Then type in your console

```bash
sudo ./install-apt.sh
```

and to update the bot do this command

```bash
sudo ./update.sh
```

Once you have done that you can now start your bot!

### Step 5: Starting the Bot
To start your bot type this in your console

```bash
./start.sh
```
And your console should spit this out

![guide13](.guide/guide13.PNG)





### Congratulations! You did it!
If there are any problems don't hesitate to make a issue on the issue tab.<br>


Have a fantastic day!
