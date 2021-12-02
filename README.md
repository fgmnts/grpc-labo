# grpc-labo

## grpc-labo
install dependencies

```
npm i
```

## GOAL

Set up simple gRPC client/server

Unary req to spot a bird
 - req: bird id + location
 - res: spot count

Serverstream to get all 'spots' of bird
 - req: bird id
 - res: stream of every spotted bird + the location

### EXTRA: Use nested types for location
https://developers.google.com/protocol-buffers/docs/proto3#nested

## STEPS

1) make proto file in ./protos/NAME.proto

2) build with protoc into TS (to folder src/models)

```
./node_modules/grpc-tools/bin/protoc --plugin=node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=true,exportCommonSymbols=false,esModuleInterop=true --ts_proto_out=src/models --proto_path=protos protos/NAME.proto
```

or

```
npm run build:proto
```

3) make the server service file (src/services/NAME.ts)
 > Create class where you implement the stub (src/models/NAME) and add your own logic

4) Create src/server.ts where you use the created service to run a gRPC server

5) Create src/client.ts 
    Here you only need to import (parts of) src/modles/NAME

6) Build ts (npm run build)

7) a) run server 

```
npm run start
```
or
```
node dist/server.js
```
   b) run server

```
npm run client
```
or
```
node dist/client.js
```


### Web

With use of https://github.com/fgmnts/grpc-demo/ you can replace the ts-server 
and update the webapp.js and client.js  

Remember to rebuild containers after code change  


```
docker-compose build node-server
```

```
docker-compose build commonjs-client
```


https://developers.google.com/protocol-buffers/docs/reference/javascript-generated