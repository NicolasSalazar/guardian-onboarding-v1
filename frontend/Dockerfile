FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV BACKEND_URL=http://backend:3001
RUN npm run build

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV BACKEND_URL=http://backend:3001

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public 2>/dev/null || true

EXPOSE 3000

CMD ["node", "server.js"]
