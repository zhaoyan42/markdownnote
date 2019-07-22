FROM node:alpine

LABEL AUTHOR=zhaoyan42<kitten63928@live.com>

WORKDIR /data

COPY . /data

#RUN npm install -g cnpm grunt-cli --registry=https://registry.npm.taobao.org

CMD ls /host_mnt

#CMD nohup sh -c 'cnpm install && grunt build'

VOLUME /data
