import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly registerStudent: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(
    @Body()
    { name, email, password }: CreateAccountBodySchema,
  ) {
    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    });
    if (result.isLeft()) {
      throw new Error();
    }
  }
}
