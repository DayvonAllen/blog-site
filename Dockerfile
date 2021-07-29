FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "run", "dev"]

# RUN ["npm", "run", "build"]

# EXPOSE 3000

# ENTRYPOINT  ["npm", "start"]