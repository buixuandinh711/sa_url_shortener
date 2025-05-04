FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy entire project
COPY . .

# Install backend dependencies
RUN npm install

# Build frontend (assumes Vite config and code is in ./fe)
WORKDIR /usr/src/app/fe
RUN npm install && npm run build

# Return to backend directory
WORKDIR /usr/src/app

# Expose the app port
EXPOSE 3000

# Start the backend
CMD ["npm", "start"]
