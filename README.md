## Install
```
npm i
```

## To start on port 8081 and proxy to https://testing.greenscreens.ai
```
npm start
```

## To start with custom config
```
npm start -- -p 12345 -t https://myhost.com
```

## Bundle config during local development of your app
```
window.Greenscreens.Rates.build({
    ...,
    baseApiPath: "http://localhost:8081", // point the bundle to the proxy
    ...,
})
```