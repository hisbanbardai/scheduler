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
  queryByText,
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

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //Click on add button
    fireEvent.click(getByAltText(appointment, "Add"));

    //Enter student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //Select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //click on save button
    fireEvent.click(getByText(appointment, "Save"));

    //Check if "Saving" state is being displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //Check if an appointment is successfully created by checking if student name is in the document
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    //Check if Monday is being displayed in DayListItem component
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();

    // console.log(debug());

    // console.log(prettyDOM(day));
  });
});
