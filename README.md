# SWP-Final-Twitter-API

```
git clone https://github.com/dacharat/swp-twitter-api.git
cd swp-twitter-api
```
Create Twitter project at [TwitterDeveloper]((https://developer.twitter.com/en/apps)), go to `Keys and Tokens` tab and click generate `Access token & access token secret`

create env file by command `touch .env` and copy all key and paste in `.env` 

```
API_KEY={API key}
API_SECRET_KEY={API secret key}
TOKEN_KEY={Access token}
TOKEN_SECRET_KEY={Access token secret}
```

command `yarn; yarn start` or `npm install; npm start`

### Deploy
`gcloud app deploy`