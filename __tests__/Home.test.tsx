import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/components/socketComponents/ChatSocket", () => {
  return jest.fn(() => (
    <div data-testid="mock-chat-socket">Chat Component</div>
  ));
});

test("renders the Home component with ChatSocket", () => {
  render(<Home />);
  expect(screen.getByTestId("mock-chat-socket")).toBeInTheDocument();
});
