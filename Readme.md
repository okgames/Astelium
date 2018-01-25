!!! Required current newest version of node.js (9.3.*)

To start the game:
1) Navigate to the game directory via terminal
2) Run `npm install`
3) Navigate to the `server` subfolder
4) Run `node index` to launch the server
5) Go to the `http://localhost:3000` and start the game

To deploy the game on Heroku:
Install the runtime-dyno-metadata addon:
1) heroku labs:enable runtime-dyno-metadata -a %appname%