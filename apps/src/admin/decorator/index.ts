import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'passportNumber', async: false })
export class PassportNumber implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return /^[A-Za-z]\d{6}\(\d{1}\)$/gm.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '请使用正确的身份证号';
  }
}
