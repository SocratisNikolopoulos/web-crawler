🕸️ Web Crawler in Node.js
This repository contains a simple yet powerful web crawler built using Node.js. It efficiently navigates through web pages, fetching URLs and providing insightful reports on link structures. Whether you're looking to index a website, analyze link density, or explore site navigation, this tool has got you covered.

🚀 Features
URL Normalization: Handles different URL formats and ensures consistency by normalizing URLs (e.g., stripping protocols and trailing slashes).
Efficient Crawling: Recursively crawls through web pages, respecting domain boundaries and avoiding redundant processing.
Error Handling: Gracefully handles non-HTML content and various HTTP response statuses, ensuring a smooth crawling process.
Link Extraction: Extracts both absolute and relative links from HTML pages, transforming them into fully-qualified URLs.
Detailed Reporting: Generates a report summarizing the frequency of links to each page, providing insights into the site's structure.

🛠️ How It Works

1. Crawling
The crawlPage function initiates the crawl, starting from the base URL. It normalizes each URL and recursively processes all linked pages within the same domain.

2. URL Normalization
The normalizeURL function ensures that URLs are consistently formatted, making it easier to track and compare them during the crawling process.

3. Link Extraction
The getURLSFromHTML function parses the HTML content to extract all linked URLs, handling both absolute and relative paths.

4. Reporting
After crawling, a report is generated by the printReport function, which displays the pages found and the number of links pointing to each.

🧪 Testing
This project includes comprehensive unit tests using Jest, covering key functionalities such as URL normalization and link extraction. To run the tests:

bash
Copy code
npm test
📦 Usage
To start crawling a website, simply run:

bash
Copy code
npm start http://example.com

Replace http://example.com with the URL of the site you want to crawl.

📄 Project Structure

crawl.js: Core logic for crawling and link extraction.

main.js: Entry point for the crawler; manages the crawl process.

report.js: Handles the generation and printing of the crawl report.

crawl.test.js: Unit tests for the crawling logic.

report.test.js: Unit tests for the reporting functionality.

🎯 Future Enhancements
Concurrency: Implementing parallel requests for faster crawling.
Depth Limitation: Allowing users to limit the depth of the crawl.
Robots.txt Respect: Integrating logic to respect robots.txt exclusions.
🤝 Contributing
Contributions are welcome! Feel free to open issues, submit pull requests, or suggest new features. Let's make this project even better together!

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📬 Contact
If you have any questions or feedback, feel free to reach out via GitHub issues.
