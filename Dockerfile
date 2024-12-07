# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app's source code into the container
COPY . .

# Build the project (if necessary)
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
