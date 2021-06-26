# Movie Review API

Backend application with RESTful API for Movie App

#### Publishing

[Deployed App URL](http://103.31.39.102:3301/) <br>
[Postman Documenter](https://documenter.getpostman.com/view/5515757/TzedhkB5) <br>
[Postman Collection](https://www.getpostman.com/collections/1669606050363736c876)

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
