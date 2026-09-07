# Next.js standalone -> Cloud Run
# 빌드: gcloud run deploy --source .  (Cloud Build가 이 파일을 자동으로 사용)

FROM node:20-alpine AS base

# --- deps: 의존성만 먼저 설치해 레이어 캐시를 살린다 ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* 는 빌드 시점에 번들에 박히므로 런타임 env가 아니라 여기서 넣는다.
# 도메인이 바뀌면 이 기본값을 고치면 된다.
ARG NEXT_PUBLIC_SITE_URL=https://aftyouth.org
ARG NEXT_PUBLIC_TYPEKIT_ID=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_TYPEKIT_ID=$NEXT_PUBLIC_TYPEKIT_ID
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- runner: 실제로 배포되는 최소 이미지 ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Cloud Run은 $PORT(기본 8080)로 트래픽을 보낸다.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
EXPOSE 8080

CMD ["node", "server.js"]
