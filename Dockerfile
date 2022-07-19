# 指定镜像
FROM node:16.16.0-alpine


# 在镜像容器中 创建 一个 目录 
RUN mkdir -p /opt/vote

# 把新建的目录指定为工作目录 
WORKDIR /opt/vote
COPY ./dist ./
COPY package*.json ./

# Install app dependencies
RUN npm install

EXPOSE 3000
# 在镜像运行时候 , 执行安装依赖以及启动命令
ENTRYPOINT [ "node", "main.js" ]
