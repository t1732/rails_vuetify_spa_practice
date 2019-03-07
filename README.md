# RailsVuetifySample

Vuetify: Material Design compoents (https://vuetifyjs.com)

RailsはAPI modeで実行し、webpackerでエントリーページを出力する

### Operation has been confirmed

* ruby 2.6.1
* node v11.10.1

## run

```
git clone https://github.com/t1732/rails_vuetify_spa_practice
cd rails_vuetify_spa_practice
bundle install
yarn install
rails db:create
rails db:migrate
rails db:seed
foreman start
open http://localhost:3035/packs/index.html
```

### for docker

* docker-compose version 1.24.0-rc1

app container mount local db directory


1. preparation set env

```
export SECRET_KEY_BASE=`rails secret`
or
export SECRET_KEY_BASE=5d06fbe6afb1763d4edd527d0a7cf75a2c213613792c8081c1c4ce9af60b07d62e69b12f3666a7a07c54235f2d2ec40055f4268830e766b8dbf4577b132476b7
```

2. docker build and run

```
git clone https://github.com/t1732/rails_vuetify_spa_practice
cd rails_vuetify_spa_practice
docker-compose build
docker-compose run --rm app rails db:migrate
docker-compose run --rm app rails db:seed
docker-compose up -d
open http://localhost:8080
```
