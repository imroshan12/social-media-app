export class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof Conflict) {
      return 409;
    }
    if (this instanceof Forbidden) {
      return 403;
    }
    return 500;
  }
}

export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}
export class Conflict extends GeneralError {}
export class Forbidden extends GeneralError {}
