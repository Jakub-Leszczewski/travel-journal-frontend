export class Validation {
  public static passwordValidation(password: string): boolean {
    const regularExpression = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return !!(password && regularExpression.test(password));
  }
}
