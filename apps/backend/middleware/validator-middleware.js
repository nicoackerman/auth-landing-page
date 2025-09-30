import boom from "@hapi/boom";
export class ValidatorMiddleware {
  static validateSchema(schema, property) {
    return function (req, res, next) {
      const data = req[property];
      const { error } = schema.safeParse(data);
      if (error) {
        next(boom.badRequest(error));
      }
      next();
    };
  }
}
