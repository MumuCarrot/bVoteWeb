FROM node:22

WORKDIR /app

COPY . .

RUN cd src && npm install
RUN cd ui && npm install

RUN cd src && npm run build
RUN cd server && npm run build

EXPOSE 3000
EXPOSE 4000

CMD ["npm", "run", "start"]
