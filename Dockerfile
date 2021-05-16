FROM node

COPY frontend /app/frontend
WORKDIR /app/frontend

RUN rm -rf node_modules/ dist/ && \
  npm i && \
  npm run build && \
  npm prune --production

COPY server /app/server
WORKDIR /app/server

RUN rm -rf node_modules/ dist/ && \
  npm i && \
  npm run build && \
  npm prune --production
  
CMD npm run start:prod