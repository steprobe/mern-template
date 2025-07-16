FROM node:20-alpine
WORKDIR /app

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

WORKDIR /app/backend
RUN npm ci --legacy-peer-deps
WORKDIR /app/frontend
RUN npm ci --legacy-peer-deps

WORKDIR /app
COPY . .

WORKDIR /app/frontend
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=${VITE_API_URL}
RUN VITE_API_URL=${VITE_API_URL} npm run build
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

WORKDIR /app/backend
CMD ["npm", "start"]
