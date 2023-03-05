const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	
	await page.goto('http://example.com/');	
	// await page.setViewport({ width: "100%", height: "100%" });
	// await page.type('#mod-login-username', 'admin');
	// await page.type('#mod-login-password', 'admin');
	
	// title - h1
	// details - p
	// link - a
	const data = await page.evaluate(() => {
		return {
			title: document.querySelector('h1').innerText,
			details: document.querySelector('p').innerText,
			link: document.querySelector('a').href,
		};
	});
	
	console.log(data); // Video 2:08:22
	
	await browser.close();
}
)();