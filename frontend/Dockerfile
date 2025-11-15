FROM oven/bun:latest AS base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:latest AS production
WORKDIR /app
COPY --from=base /app/dist ./dist
EXPOSE 4173
CMD ["bun", "run", "serve"]
