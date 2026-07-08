import { render } from "@testing-library/react";
import QuizComponent from "./quiz";

const questionsArray = [
  {
    id: "Q1" as const,
    type: "text",
    question: "What does HTML stand for?",
  },
  {
    id: "Q5" as const,
    type: "radio",
    question: "Which language is primarily used for styling web pages?",
    choices: ["HTML", "CSS", "JavaScript", "Python"],
  },
  {
    id: "Q9" as const,
    type: "checkbox",
    question: "Which of the following are programming languages?",
    choices: ["Java", "Python", "HTML", "C++"],
  },
];

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
      replace: () => null,
      back: () => null,
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

describe("QuizComponent", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<QuizComponent data={questionsArray} />);
    }).not.toThrow();
  });
});
