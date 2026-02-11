# 1. Base image
FROM node:24-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (better caching)
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# 7. Start dev server
CMD ["npm", "run", "dev", "--", "--host"]
