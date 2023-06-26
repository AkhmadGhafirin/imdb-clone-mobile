FROM node:latest

ENV PORT=4002
ENV DATABASE_URL=https://mongodb+srv:...

WORKDIR /users

COPY ["package.json", "package-lock.json", "./"]

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]