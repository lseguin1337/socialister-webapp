FROM node

COPY . /app

WORKDIR /app/frontend

RUN rm -rf node_modules/ dist/ && \
  npm i && \
  npm run build && \
  npm prune --production

WORKDIR /app/server

RUN rm -rf node_modules/ dist/ && \
  npm i && \
  npm run build && \
  npm prune --production
  
CMD npm start