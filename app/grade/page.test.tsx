import { render } from "@testing-library/react";
import GradePage from "./page";

jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    // 2. Define the URL query string you want to inject
    const mockParams = new URLSearchParams(
      'data={"response":{"score":2,"total":12,"results":[{"id":"Q1","correct":false},{"id":"Q2","correct":false},{"id":"Q3","correct":false},{"id":"Q4","correct":false},{"id":"Q5","correct":true},{"id":"Q6","correct":false},{"id":"Q7","correct":false},{"id":"Q8","correct":true},{"id":"Q9","correct":false},{"id":"Q10","correct":false},{"id":"Q11","correct":false},{"id":"Q12","correct":false}]}}',
    );
    //const mockParams = new URLSearchParams("data=banana");
    return mockParams;
  },
}));

describe("GradePage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<GradePage />);
    }).not.toThrow();
  });
});
