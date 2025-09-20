# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the source code into the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app using npm
CMD [ "npm", "start" ]