const puppeteer = require('puppeteer');
const data = [];

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://news.ycombinator.com/');
		
	// title => .titleline
	// details => .morelink

	const limit = 5;
	const nextLinkSelector = ".morelink";

	for(i = 0; i < limit; i++) {
		const titles = await page.evaluate(() => {
			return [...document.querySelectorAll('.titleline > a')].map(e => e.innerHTML)
		});

		console.log(titles.length);

		data.push(...titles);

		// https://pptr.dev/api/puppeteer.page.evaluate
		// Click on "More" link
		// DO NOT click on last loop
		const exists = await page.evaluate((nextLinkSelector) => {
			return !!document.querySelector(nextLinkSelector)
		}, nextLinkSelector);

		if(exists && i < limit) {
			await page.click(nextLinkSelector);
			// Now wait for 1 second
			// 2:58:00
			await page.waitForTimeout(1000);
		}
	}
	
	// Close the browser
	await browser.close();

	console.log(data);
}
)();
