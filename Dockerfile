FROM node:lts

ENV NPM_CONFIG_LOGLEVEL=warn

RUN mkdir -p /home/node/web/node_modules && chown -R node:node /home/node/web

WORKDIR /home/node/web

USER node

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 4011

CMD ["npm", "start"]
