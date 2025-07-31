# INNOTAIL
IOT product for supermarket/hypermarket owners giving them insights and product details for boosting their sales

### clone the repo
`git clone link_of_this_repository`

### install the dependancy
`npm i`

### make the .env file
`mkdir .env`
`DATABASE_URL="your_postgress_instance_connection_string"`

### make the dist for running the typescript
`mkdir dist`

### run the typescript bundle 
`tsc -b`

### to seed the data into the database 
`node .\dist\scripts\seedDataCSV.js`

### run the to feed data into the cloud
`node dist index.js`


