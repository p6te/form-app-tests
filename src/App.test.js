import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  userEvent.click(submitBtnElement);

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

test("inputs should be initially empty", () => {
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to tape an email", () => {
  const { emailInputElement } = typeIntoForm({
    email: "selena@gmail.com",
  });
  expect(emailInputElement.value).toBe("selena@gmail.com");
});

test("should be able to tape a password", () => {
  const { passwordInputElement } = typeIntoForm({
    password: "qwerty",
  });
  expect(passwordInputElement.value).toBe("qwerty");
});

test("should be able to tape a confirm password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "qwerty",
  });
  expect(confirmPasswordInputElement.value).toBe("qwerty");
});

test("should show email error message on invalid email", () => {
  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).not.toBeInTheDocument();

  typeIntoForm({
    email: "selenagmail.com",
  });

  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).toBeInTheDocument();
});

test("should show password error message on invalid password", () => {
  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).not.toBeInTheDocument();

  typeIntoForm({
    email: "selena@gmail.com",
    password: "pas",
  });

  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).toBeInTheDocument();
});

test("should show confirm password error message if password don't match", () => {
  expect(
    screen.queryByText(/passwords don't match each other/i)
  ).not.toBeInTheDocument();

  typeIntoForm({
    email: "selena@gmail.com",
    password: "password",
    confirmPassword: "123456",
  });

  expect(
    screen.queryByText(/passwords don't match each other/i)
  ).toBeInTheDocument();
});

test("should show no error message if every input is valid", () => {
  typeIntoForm({
    email: "selena@gmail.com",
    password: "password",
    confirmPassword: "password",
  });

  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).not.toBeInTheDocument();

  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).not.toBeInTheDocument();

  expect(
    screen.queryByText(/passwords don't match each other/i)
  ).not.toBeInTheDocument();
});
