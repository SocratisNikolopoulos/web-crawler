const { log } = require("console");
const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    console.log(`Skipping URL from a different domain: ${currentURL}`);
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  console.log(`Actively crawling: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`);
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log(`Non HTML response, content-type: ${contentType} on page: ${currentURL}`);
      return pages;
    }

    const htmlBody = await resp.text();
    const nextURLS = getURLSFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLS) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Error in fetch ${err.message}, on page ${currentURL}`);
  }
  return pages;
}

function getURLSFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  const linkElementsLength = linkElements.length;

  for (let i = 0; i < linkElementsLength; i++) {
    const linkElement = linkElements[i];
    try {
      const urlObj = linkElement.href.startsWith("/") ? new URL(linkElement.href, baseURL) : new URL(linkElement.href);
      urls.push(urlObj.href);
    } catch (err) {
      console.log(`Error with URL: ${err.message}`);
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  hostPath = hostPath.toLowerCase();
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLSFromHTML,
  crawlPage,
};
