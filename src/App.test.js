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
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );

  typeIntoForm({
    email: "selenagmail.com",
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error message on invalid password", () => {
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  typeIntoForm({
    email: "selena@gmail.com",
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    password: "pas",
  });

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show confirm password error message if password don't match", () => {
  const confirmPasswordErrorElement = screen.queryByText(
    /passwords don't match each other/i
  );
  typeIntoForm({
    email: "selena@gmail.com",
    password: "password",
  });

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    confirmPassword: "123456",
  });

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /passwords don't match each other/i
  );

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show no error message if every input is valid", () => {
  typeIntoForm({
    email: "selena@gmail.com",
    password: "password",
    confirmPassword: "password",
  });

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const confirmPasswordErrorElementAgain = screen.queryByText(
    /passwords don't match each other/i
  );

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElementAgain).not.toBeInTheDocument();
});
