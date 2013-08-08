rssim2D.js
===========

Robot Soccer Simulator 2D in JS


How to join the league?
----------------------

* Fork this repo
* Build your team
* Send pull request

###Fork this repo###
Just press the 'Fork' button.

###Build your team###
Before you build your team, the develop tools should be installed first.

Firstly, install `node.js` [from binary](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) or
[from source](https://github.com/joyent/node/wiki/Installation)

Then, install coffee-script and coffeescript-concat
> npm install -g coffee-script

> npm install -g coffeescript-concat

Let`s fork a team.

*unix user could use `forkteam.sh` to fork a team:

> ./forkteam.sh \<team name\> \<team color\>

>  example:  ./forkteam.sh Apollo '#FF4500'

or fork by hand:

> cp teams/foo.coffee teams/<your team name>.coffee

Then, open the coffee file, change the class name and @teamname to <your team name> and pick a color as @fill_color 
of your team.

Append one line 'root.client1.\<team name\> = \<team name\>' to src/client1.coffee. 

Append one line 'root.client2.\<team name\> = \<team name\>' to src/client2.coffee.


Lastly, let`s make
> make

Open the index.html, your will find your team in the control panel.

## Send pull request ##

Send pull request when you are ready to go.

When the code is merged, your team becomes a memeber of league.



