FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /e2e

COPY . .

RUN npm ci

CMD ["npx", "playwright", "test", "--project=chromium", "tests/registration.spec.ts"]