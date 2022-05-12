###########################
####### VTM-ST-TOOL #######
###########################
FROM node:14.19 as builder

WORKDIR /app
COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:14.19 as vtm-st-tool

WORKDIR /app

COPY --from=builder /app  .

CMD [ "yarn", "start", "--host '0.0.0.0'" ]
