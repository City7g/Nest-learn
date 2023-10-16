import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export class CustomBadRequestException extends HttpException {
  constructor(errors: any) {
    super(
      {
        message: errors,
        errors: 'Bad request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class CustomValidationPipe extends ValidationPipe {
  exceptionFactory: (errors: ValidationError[]) => any = errors => {
    const errorList = {}
    errors.forEach(error => {
      errorList[error.property] = Object.values(error.constraints)[0]
    })
    return new CustomBadRequestException(errorList)
  }
}
