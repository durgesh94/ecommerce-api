import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ApiResponse {
  static success(res: Response, data: unknown, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static paginated(
    res: Response,
    data: unknown,
    pagination: PaginationMeta,
    message = 'Success',
    statusCode = 200,
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination,
    });
  }
}
