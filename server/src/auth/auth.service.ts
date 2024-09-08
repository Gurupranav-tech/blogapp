import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/Prisma.service';
import { z } from 'zod';
import argon = require('argon2');
import { JwtService } from '@nestjs/jwt';

const UserSigninObject = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signin(props: unknown) {
    try {
      const { username, email, password } =
        await UserSigninObject.parseAsync(props);

      try {
        const user = await this.prisma.user.create({
          data: {
            name: username,
            email,
            password: await argon.hash(password),
          },
        });

        user.password = '';
        const token = await this.jwtService.signAsync(user);
        return token;
      } catch {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async me(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async login(props: unknown) {
    try {
      const { email, password } = await UserLoginSchema.parseAsync(props);
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!(await argon.verify(user.password, password)))
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);

      user.password = '';
      const token = await this.jwtService.signAsync(user);
      return token;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
