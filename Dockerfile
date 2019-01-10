FROM node:lts

USER node

ENV NPM_CONFIG_LOGLEVEL=warn

RUN mkdir -p /home/node/web/node_modules && chown -R node:node /home/node/web

WORKDIR /home/node/web

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 4011

CMD ["npm", "start"]
