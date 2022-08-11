###########################
####### VTM-ST-TOOL #######
###########################
FROM node:16.16-alpine AS vtm-st-tool

RUN mkdir -p /home/node/app/node_modules/ && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY ./ /home/node/app

RUN SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux sharp; npm run build

CMD [ "npm", "run", "start:docker" ]
