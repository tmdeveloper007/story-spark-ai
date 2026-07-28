import { UserValidator } from "../user.validation";

describe("UserValidator.resetPassword", () => {
  const validData = {
    body: {
      email: "user@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      verificationToken: "token-123",
    },
  };

  it("should pass validation when password and confirmPassword match", async () => {
    const parsed = await UserValidator.resetPassword.parseAsync(validData);
    expect(parsed).toEqual(validData);
  });

  it("should fail validation when password and confirmPassword do not match", async () => {
    const invalidData = {
      body: {
        email: "user@example.com",
        password: "Password123!",
        confirmPassword: "DifferentPassword123!",
        verificationToken: "token-123",
      },
    };

    await expect(UserValidator.resetPassword.parseAsync(invalidData)).rejects.toThrow();

    try {
      await UserValidator.resetPassword.parseAsync(invalidData);
    } catch (err: any) {
      expect(err.errors[0].message).toBe("Passwords do not match");
      expect(err.errors[0].path).toEqual(["body", "confirmPassword"]);
    }
  });
});
