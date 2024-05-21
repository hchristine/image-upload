import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";

export function IsArrayOfUrls(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isArrayOfUrls',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(values: string[], args: ValidationArguments) {
            return values.every((url) => url.startsWith('http://localhost'));
          },
        },
      });
    };
  }