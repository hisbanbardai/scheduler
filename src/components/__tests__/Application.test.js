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
  queryByAltText,
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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you want to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text 'Monday' also has the text '2 spots remaining'.
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
    // debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // // 4. Check that the confirmation message is shown.
    // expect(
    //   getByText(appointment, "Are you sure you want to delete?")
    // ).toBeInTheDocument();

    // // 5. Click the "Confirm" button on the confirmation.
    // fireEvent.click(queryByText(appointment, "Confirm"));

    // // 6. Check that the element with the text "Deleting" is displayed.
    // expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // // 7. Wait until the element with the "Add" button is displayed.
    // await waitForElement(() => getByAltText(appointment, "Add"));

    // // 8. Check that the DayListItem with the text 'Monday' also has the text '2 spots remaining'.
    // const day = getAllByTestId(container, "day").find((day) =>
    //   queryByText(day, "Monday")
    // );
    // expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
    debug();
  });
});
