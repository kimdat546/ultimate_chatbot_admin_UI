# Ultimate Chatbot for Education - Admin UI

_This project was bootstrapped with [ReactJS](https://github.com/facebook/create-react-app)._

## Deployment in development mode

### `Build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

```
yarn build
```

### `Start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

```
yarn start
```

## Deployment in production mode with docker

### Install docker on server

### `Build image`

Run command

```
docker build -t kimdat546/ultimate_chatbot_admin_UI .
```

### `Run container`

Run command

```
docker run -d -p 8080:80 --name adminui kimdat546/ultimate_chatbot_admin_UI
```
### Open port firewall
- enable ufw
- allow port 8080
- restart server nginx
### Finally, access to IP address server