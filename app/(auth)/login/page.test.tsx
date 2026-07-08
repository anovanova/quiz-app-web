import { render } from "@testing-library/react";
import Login from "./page";

describe("Login", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<Login />);
    }).not.toThrow();
  });
});
