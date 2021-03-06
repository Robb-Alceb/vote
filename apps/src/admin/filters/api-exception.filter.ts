import {
  ArgumentsHost, BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import { Logger } from '@nestjs/common';
import { ResultData } from '../result';

const isDev: boolean = process.env.NODE_ENV === 'production';

/**
 * 异常接管，统一异常返回数据
 */
@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // check api exection
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // set json response
    response.header('Content-Type', 'application/json; charset=utf-8');
    // prod env will not return internal error message
    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrorCode()
        : status;
    let message = '服务器异常，请稍后再试';
    // 开发模式下提示500类型错误，生产模式下屏蔽500内部错误提示
    if (isDev || status < 500) {
      message =
        exception instanceof HttpException ? exception.message : `${exception}`;
    }
    if(status == 400 && exception instanceof BadRequestException){
      let badRequestException = exception instanceof BadRequestException ? (exception as BadRequestException).getResponse(): null;
      if(badRequestException instanceof Object){
        message = badRequestException['message'];
      }
    }

    // 记录 500 日志
    if (status >= 500) {
      Logger.error(exception, ApiExceptionFilter.name);
    }

    const path = request.url;
    const method  = request.method;
    const timestamp = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    const result = new ResultData(code, path, method, timestamp, null, message);
    console.log(result, 'result');
    response.status(status).send(result);
  }
}
