# syntax=docker/dockerfile:1

FROM node:24-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# Public settings are compiled into this static Next.js export at build time.
ARG NEXT_PUBLIC_SITE_URL=""
ARG NEXT_PUBLIC_CONTACT_EMAIL=""
ARG NEXT_PUBLIC_CONTACT_PHONE=""
ARG NEXT_PUBLIC_WHATSAPP=""
ARG NEXT_PUBLIC_ALLOW_INDEXING="false"
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_CONTACT_EMAIL=${NEXT_PUBLIC_CONTACT_EMAIL} \
    NEXT_PUBLIC_CONTACT_PHONE=${NEXT_PUBLIC_CONTACT_PHONE} \
    NEXT_PUBLIC_WHATSAPP=${NEXT_PUBLIC_WHATSAPP} \
    NEXT_PUBLIC_ALLOW_INDEXING=${NEXT_PUBLIC_ALLOW_INDEXING}

COPY . .
RUN npm run build

FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production PORT=3000

# Only the static site and dependency-free HTTP server enter the runtime image.
COPY --from=build --chown=node:node /app/out ./out
COPY --chown=node:node --chmod=0644 scripts/serve.mjs ./scripts/serve.mjs

# Normalize host-derived permissions, including /app/out/media and its images.
# Directories must be traversable; files must be readable by the non-root user.
RUN find /app/out -type d -exec chmod 0755 {} + \
    && find /app/out -type f -exec chmod 0644 {} + \
    && chmod 0755 /app /app/scripts \
    && test -d /app/out/media

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
CMD ["node", "scripts/serve.mjs"]
