import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ApiAuthService implements OnModuleInit {
  constructor(private jwt: JwtService) {}

  onModuleInit() {
    console.log("INIT")
  }
}
