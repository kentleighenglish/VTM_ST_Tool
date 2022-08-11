###########################
####### VTM-ST-TOOL #######
###########################
FROM node:16.16-alpine AS vtm-st-tool

RUN mkdir -p /home/node/app/node_modules/ && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY ./ /home/node/app

RUN npm install --unsafe-perm; npm run build

CMD [ "npm", "run", "start:docker" ]
