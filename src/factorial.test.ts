import { factorial } from "./factorial.ts";

test("factorial-5", () => {
  expect(factorial(5)).toBe(120);
});

test("factorial-minus", () => {
  const will_throw = () => {
    factorial(-1);
  };
  expect(will_throw).toThrow("Negative numbers not supported");
});

test("factorial-0", () => {
  expect(factorial(0)).toBe(1); // Test the base case of 0!
});

test("factorial-1", () => {
  expect(factorial(1)).toBe(1); // Test the edge case for factorial(1)
});

test("factorial-large-number", () => {
  expect(factorial(10)).toBe(3628800); // Test larger factorial value
});
