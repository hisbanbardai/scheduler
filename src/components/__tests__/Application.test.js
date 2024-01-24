import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Form", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    console.log(prettyDOM(appointments));
  });
});
