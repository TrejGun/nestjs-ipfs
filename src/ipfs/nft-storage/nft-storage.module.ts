import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { nftStorageProvider } from "./nft-storage.provider";
import { NftStorageService } from "./nft-storage.service";
import { NftStorageController } from "./nft-storage.controller";
import { DataModule } from "../../data/data.module";

@Module({
  imports: [DataModule, ConfigModule],
  providers: [nftStorageProvider, NftStorageService],
  controllers: [NftStorageController],
  exports: [NftStorageService],
})
export class NftStorageModule {}
