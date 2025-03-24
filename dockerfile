FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install ALL dependencies including devDependencies
RUN npm install
# Make sure all type declarations are installed
RUN npm install --save-dev @types/express @types/node

# Bundle app source
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Use development for dev environment or production for prod
ENV NODE_ENV=development

# Command to run the application
CMD ["npx", "ts-node-dev", "--respawn", "src/index.ts"]