FROM node:latest

ENV NODE_ENV=production
ENV PORT=4001
ENV DATABASE_URL=https://supabase.com

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]