FROM node:14

RUN mkdir /project

WORKDIR /project
COPY ./src /project/src/
COPY ./package.json  /project/
COPY ./config/prod.js /project/config/default.js
RUN cd /project && npm install

EXPOSE 80
CMD ["node", "./src/service.js"]
