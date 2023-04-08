import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CarObj = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.car;
  },
);
