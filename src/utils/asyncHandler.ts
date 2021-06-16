import { Response, NextFunction, Handler, Request } from 'express'

const asyncHandler = (handler: Handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res, next)
    } catch (e) {
      next(e)
    }
  }
}

export default asyncHandler
