import { render } from "@testing-library/react";
import { DynamicInput } from "./dynamicInput";

const inputs = [
  {
    type: "text" as const,
    name: "username" as const,
    label: "Username",
    placeholder: "username123",
  },
  {
    type: "password" as const,
    name: "password" as const,
    label: "Password",
  },
];

describe("DynamicInput", () => {
  it("renders successfully", () => {
    expect(() => {
      render(
        inputs.map((item) => <DynamicInput key={item.name} type={item.type} />),
      );
    }).not.toThrow();
  });
});
