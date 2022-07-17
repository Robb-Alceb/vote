import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { ApiExceptionFilter } from './admin/filters/api-exception.filter';
import { ApiTransformInterceptor } from './admin/interceptor/api-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 异常接管，统一异常返回数据
  app.useGlobalFilters(new ApiExceptionFilter());
  // 统一处理返回接口结果，如果不需要则添加
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  // 设置一个全局作用域的管道
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
