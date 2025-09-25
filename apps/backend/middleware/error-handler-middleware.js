class ErrorHandlerMiddleware {
  static logError(error, req, res, next) {
    console.error(error);
    next(error);
  }
  static boomHandler(error, req, res, next) {
    if (error.isBoom) {
      res.json(error);
    } else {
      next(error);
    }
  }
  static GlobalHandler(error, req, res, next) {
    res.status(500).json({
      message: `No boom error ${error.message}`,
      stack: error.stack,
    });
  }
}
