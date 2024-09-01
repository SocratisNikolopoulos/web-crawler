const { normalizeURL, getURLSFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://triakilakodika.gr/path";
  const actual = normalizeURL(input);
  const expected = "triakilakodika.gr/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://triakilakodika.gr/path/";
  const actual = normalizeURL(input);
  const expected = "triakilakodika.gr/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing capitals", () => {
  const input = "https://TRIAKILAKODIKA.gr/path";
  const actual = normalizeURL(input);
  const expected = "triakilakodika.gr/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "https://triakilakodika.gr/path";
  const actual = normalizeURL(input);
  const expected = "triakilakodika.gr/path";
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://triakilakodika.gr">
            Tria Kila Kodika
            </a>
        </body>    
    </html>        
    `;
  const inputBaseURL = "https://triakilakodika.gr";
  const actual = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://triakilakodika.gr/"];
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML relative", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/path/">
              Boot.dev Blog
              </a>
          </body>    
      </html>        
      `;
  const inputBaseURL = "https://triakilakodika.gr";
  const actual = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://triakilakodika.gr/path/"];
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML both", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://triakilakodika.gr/path1/">
                Tria Kila Kodika Path One
                </a>
                <a href="/path2/">
                Tria Kila Kodika Path Two
                </a>
            </body>    
        </html>        
        `;
  const inputBaseURL = "https://triakilakodika.gr";
  const actual = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://triakilakodika.gr/path1/", "https://triakilakodika.gr/path2/"];
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML invalid", () => {
  const inputHTMLBody = `
          <html>
              <body>
                  <a href="invalid">
                  Invalid URL
                  </a>
              </body>    
          </html>        
          `;
  const inputBaseURL = "https://triakilakodika.gr";
  const actual = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
