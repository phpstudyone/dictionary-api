FROM node:14

RUN mkdir /project

WORKDIR /project
COPY ./src /project/src/
ADD ./package.json  /project/
RUN cd /project && npm install

EXPOSE 80
CMD ["node", "./src/service.js"]
