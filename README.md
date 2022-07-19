## Description

簡易選舉投票系统

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 开发环境准备

mysql 5.7.26
docker 20.10.17
node 16.13.1
nest 8.2.8
```bash
# 数据库启动命令
$ docker run -p 23306:3306 --name mysql -v /tmp/db:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=Dl123456 -d mysql:5.7.26

```


## api接口文档地址（localhost:3000/swagger）
```bash
# development
$ npm run start
```

## 打包docker 镜像

```bash
#打包
$ nest build
$ docker build -t vote:v0.0.1 .
#运行
docker run -p3000:3000 vote:v0.0.1

```
