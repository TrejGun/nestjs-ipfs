import { Controller, Get } from "@nestjs/common";

import { PinataService } from "./pinata.service";

@Controller("/pinata")
export class PinataController {
  constructor(private readonly pinataService: PinataService) {}

  @Get("/pin")
  public async test(): Promise<{ url: string }> {
    const url = await this.pinataService.pin();
    return { url };
  }
}
