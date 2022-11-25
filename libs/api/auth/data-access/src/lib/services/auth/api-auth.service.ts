import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ApiAuthService  {
  constructor(private jwt: JwtService) {}
}
