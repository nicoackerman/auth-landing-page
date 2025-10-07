import boom from "@hapi/boom";
export class Guard {
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
  static validateAccessToken() {
    return function (req, res, next) {
      const accessToken = req.cookies.access_token;
      if (!accessToken) {
        next(boom.unauthorized("access token was not provided"));
      }
      next();
    };
  }
  static validateRefreshToken() {
    return function (req, res, next) {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) {
        next(boom.unauthorized("refresh token was not provided"));
      }
      next();
    };
  }
}
