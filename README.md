# Tic Tac Toe Game

This is a tic tac toe game developed using React + Typescript + Vite. You can dynamically change grid sizes to play.

## Start

Use `npm run dev` command to run the game in your web browser.

## For AWS EB Deployment, follow below links -

https://medium.com/@carla.de.beer/configuring-your-react-app-for-aws-elastic-beanstalk-1f2e02171629
https://youtu.be/TTcyhhH2FWE?si=px43Wpwka-Ph_4r-&t=11626

## Creating deployment zip

Zip only these files/directory -

`.ebextensions`, `dist`, `Procfile`, `server.js` and `package.json`

Then use AWS Console to deploy in **EB environment**.
