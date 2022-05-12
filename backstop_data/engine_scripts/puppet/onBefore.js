module.exports = async (page, scenario, vp) => {
  const email = 'mattia@travpromobile.com';
  const viewportOptions = {
    width: 1680,
    height: 900,
  };
  page.setViewport(viewportOptions);
  await page.goto('http://localhost:8080/login');
  await page.waitForSelector(".login__form");
  await page.waitFor(50);
  await page.type('input[name="email"]', email);
  await page.waitFor(3000);
  await page.click('button[type="submit"]');
  await page.waitFor(3000);
  await page.goto(`http://localhost:8080/${scenario}`);
  await page.waitFor(3000);
};
