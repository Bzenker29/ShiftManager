# ShiftManager

Developer Guide:
At the time of development:

Node.js v 24.11.1  
React.js v 5.1.0  
PostgreSQL/PGAdmin v 18

To install the latest node version:

```
npm install npm@latest -g
```

To install nodemon use:

```
npm install -g nodemon
```

Make sure to clone the repo from GitHub:  
git clone https://github.com/Bzenker29/ShiftManager.git

Create your own branch so you do not push directly to main:

```
git branch "branch name"
git checkout "branch name"
```

Once you make a push from your branch make sure to get oversight and merge with main:

```
git checkout main
git merge branch "branch name"
git push origin main
```

Frontend was created with:

```
npm create vite@latest
```

Select React, and then Javascript

Cd into the front end folder and then install tailwind css

```
npm install tailwindcss @tailwindcss/vite
```

Install Daisy ui after tailwind is setup

```
npm i -D daisyui@latest
```

To create the backend we started with

```
npm init -y
```

Followed with

```
npm i express dotenv
```

Make sure "type" is defined as "module" in package.json

To start the server you must cd into the backend folder and use

```
nodemon src/index.js
```

Install cors using

```
npm i cors pg dotenv
```

Make sure to install postgres and pg admin

Install postman
Must be done throw you browser
Not really necessary but nice when testing JSON's and seeing if the server is working

Install react-router-dom

```
npm install react react-dom
```
