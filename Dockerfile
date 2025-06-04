FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /e2e

COPY . .

RUN npm ci

CMD ["npx", "playwright", "test", "tests/login.spec.ts"]