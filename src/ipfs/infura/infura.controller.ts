import { Controller, Get } from "@nestjs/common";

import { InfuraService } from "./infura.service";

@Controller("/infura")
export class InfuraController {
  constructor(private readonly infuraService: InfuraService) {}

  @Get("/pin")
  public async test(): Promise<{ url: string }> {
    const url = await this.infuraService.pin();
    return { url };
  }
}
