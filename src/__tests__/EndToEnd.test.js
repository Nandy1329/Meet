import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn'); // Expand details
    await page.click('.event .details-btn'); // Collapse details
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});

describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.city');
  });

  afterAll(() => {
    browser.close();
  });

  test('User can see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    const suggestions = await page.$$('.suggestions li');
    expect(suggestions).toHaveLength(1);
  });

  test('User can select a city from the suggested list', async () => {
    await page.click('.suggestions li');
    const events = await page.$$('.event');
    expect(events).toHaveLength(32); // Assuming 32 is the default number of events
  });
});