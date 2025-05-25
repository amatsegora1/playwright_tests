import { test as base, Page, Browser } from '@playwright/test';

export const test = base.extend<{ userGaragePage: Page }>({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'storage/user.json' });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});

export const expect = test.expect;
