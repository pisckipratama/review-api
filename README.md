# Movie Review API

Backend application with RESTful API for Movie App

#### Publishing

[Postman](https://www.getpostman.com/collections/8e744f30b7bb6f7ced31) <br>

#### How to running at development enviroment

`npm install` <br /> <br />
`npm install sequelize-cli -g` _\*) use sudo if you're Linux user_ <br /> <br />
`npm run migrate` <br /> <br />
`npm run seed` <br /> <br />
`cp .env_example .env` _\*) fill your dev environment (database, jwt, etc.)_ <br /> <br />
`npm run dev` <br /> <br />

open http://localhost:3301 and try to access login endpoint with this credential:

- admin : _username_ `admin@testing.com` _password_ `nopassword`
- user : _username_ `user@testing.com` _password_ `nopassword`
