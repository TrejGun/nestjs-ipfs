import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { web3StorageProvider } from "./web3-storage.provider";
import { Web3StorageService } from "./web3-storage.service";
import { Web3StorageController } from "./web3-storage.controller";
import { DataModule } from "../../data/data.module";

@Module({
  imports: [DataModule, ConfigModule],
  providers: [web3StorageProvider, Web3StorageService],
  controllers: [Web3StorageController],
  exports: [Web3StorageService],
})
export class Web3StorageModule {}
