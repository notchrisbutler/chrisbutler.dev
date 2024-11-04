FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
RUN npm install -g serve

ENV PORT=3000
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
