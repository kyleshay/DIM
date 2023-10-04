# Latest LTS node
FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json /usr/src/app/
RUN npm ci

# Bundle app source
COPY . /usr/src/app

# Generate CSS
RUN npm start

EXPOSE 8080
# Run Sass watcher for Chrome
CMD [ "npm", "start" ]
