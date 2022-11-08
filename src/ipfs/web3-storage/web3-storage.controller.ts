import { Controller, Get } from "@nestjs/common";

import { Web3StorageService } from "./web3-storage.service";

@Controller("/web3storage")
export class Web3StorageController {
  constructor(private readonly web3storageService: Web3StorageService) {}

  @Get("/pin")
  public async test(): Promise<{ url: string }> {
    const url = await this.web3storageService.pin();
    return { url };
  }
}
