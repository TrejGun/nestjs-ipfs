import { Controller, Get } from "@nestjs/common";

import { NftStorageService } from "./nft-storage.service";

@Controller("/nftstorage")
export class NftStorageController {
  constructor(private readonly nftstorageService: NftStorageService) {}

  @Get("/pin")
  public async test(): Promise<{ url: string }> {
    const url = await this.nftstorageService.pin();
    return { url };
  }
}
