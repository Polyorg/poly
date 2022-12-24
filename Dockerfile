FROM node:16.13.0

COPY ./package.json .
COPY ./pnpm.lock.yaml .
COPY ./.* /app/

WORKDIR /app

RUN pnpm install

COPY ./ /app

EXPOSE 3001
CMD ["pnpm", "dev"]
