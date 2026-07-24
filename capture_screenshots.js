const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5174';
const OUT_DIR = path.join(__dirname, 'assets', 'screenshots');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function screenshot(page, name, url, scrollY = 0, delay = 1500) {
  if (url) await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(delay);
  if (scrollY) await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: false });
  console.log(`✓ ${name}.png`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Landing - Hero
  await screenshot(page, 'landing_hero', `${BASE_URL}/`, 0, 2000);

  // 2. Landing - Features
  await page.evaluate(() => window.scrollTo({ top: 850, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'landing_features.png') });
  console.log('✓ landing_features.png');

  // 3. Landing - Lead Form (scroll to bottom)
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight - 1000, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'landing_form.png') });
  console.log('✓ landing_form.png');

  // 4. Login Page
  await screenshot(page, 'login', `${BASE_URL}/login`, 0, 1500);

  // 5. Try Admin Login
  await page.fill('input[type="email"]', 'admin@leaddesk.pro');
  await page.fill('input[type="password"]', 'Admin@123456');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2500);

  // 6. Dashboard
  await screenshot(page, 'dashboard', null, 0, 2000);

  // 7. Leads Page
  await screenshot(page, 'leads', `${BASE_URL}/admin/leads`, 0, 2000);

  // 8. Analytics Page
  await screenshot(page, 'analytics', `${BASE_URL}/admin/analytics`, 0, 2000);

  await browser.close();
  console.log('\nAll screenshots saved to assets/screenshots/');
})().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
