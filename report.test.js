const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "https://triakilakodika.gr/path": 1,
    "https://triakilakodika.gr": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://triakilakodika.gr", 3],
    ["https://triakilakodika.gr/path", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "https://triakilakodika.gr/path": 1,
    "https://triakilakodika.gr": 3,
    "https://triakilakodika.gr/path2": 5,
    "https://triakilakodika.gr/path3": 2,
    "https://triakilakodika.gr/path4": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://triakilakodika.gr/path4", 9],
    ["https://triakilakodika.gr/path2", 5],
    ["https://triakilakodika.gr", 3],
    ["https://triakilakodika.gr/path3", 2],
    ["https://triakilakodika.gr/path", 1],
  ];
  expect(actual).toEqual(expected);
});
