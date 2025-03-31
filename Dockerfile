FROM node:20-slim AS base

LABEL org.opencontainers.image.source=https://github.com/sintrastartapp/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# read .env file and  TIPTAP_PRO_TOKEN environment variable
ARG TIPTAP_PRO_TOKEN
ENV TIPTAP_PRO_TOKEN=$TIPTAP_PRO_TOKEN

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install

# Copy the project files to the container
COPY . .

# Build the Next.js project
RUN pnpm run build

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Set the command to start the Next.js application
CMD ["pnpm", "start"]
