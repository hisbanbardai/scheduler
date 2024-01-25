import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";
import { Value } from "sass";

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
    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    //Click on Add button
    fireEvent.click(getByAltText(appointment, "Add"));

    //Enter student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //Select Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //Click on save button
    fireEvent.click(getByText(appointment, "Save"));
  });
});
