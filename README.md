# INNOTAIL

IoT product for supermarket/hypermarket owners, giving them insights and product details to boost their sales.

### 1. Clone the Repository
```bash
git clone link_of_this_repository
```


### 2. Install Dependencies
```bash
npm install
```

format directory
```
mkdir src
mkdir dist
```
in ts.config
```
Change `rootDit` to `src`
Change `outDir` to `dist`
```


### 3. Setup Environment Variables
Create a `.env` file:

```bash
mkdir .env
```

Then add your PostgreSQL connection string:
```env
DATABASE_URL="your_postgress_instance_connection_string"
```
generate prisma client
```
npx prisma generate
```
run migrations
```
npx prisma migrate dev --name init
```

### 4. Build TypeScript
```bash
tsc -b
```

### 5. Seed the Database
```bash
node dist/scripts/seedDataCSV.js
```

### 6. Run the script
```bash
npx ts-node src/index.ts
```
demo api: `http://localhost:3000/api/PATH/INNER_ROUTE` <br>
example diaplay all table data: `http://localhost:3000/api/display/display-all`
