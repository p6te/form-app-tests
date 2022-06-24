import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to tape an email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  userEvent.type(emailInputElement, "selena@gmail.com");

  expect(emailInputElement.value).toBe("selena@gmail.com");
});

test("should be able to tape a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");

  userEvent.type(passwordInputElement, "qwerty");

  expect(passwordInputElement.value).toBe("qwerty");
});

test("should be able to tape a confirm password", () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  userEvent.type(confirmPasswordInputElement, "qwerty");

  expect(confirmPasswordInputElement.value).toBe("qwerty");
});

test("should show email error message on invalid email", () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "selenagmail.com");
  userEvent.click(submitBtnElement);
  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error message on invalid password", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  userEvent.type(emailInputElement, "selena@gmail.com");
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const passwordInputElement = screen.getByLabelText("Password");
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "pas");
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show confirm password error message on invalid confirm password", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  const confirmPasswordErrorElement = screen.queryByText(
    /passwords don't match each other/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "selena@gmail.com");
  userEvent.type(passwordInputElement, "password");
  userEvent.type(confirmPasswordInputElement, "passwor");

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /passwords don't match each other/i
  );

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});
