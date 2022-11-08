import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { pinataProvider } from "./pinata.provider";
import { PinataService } from "./pinata.service";
import { PinataController } from "./pinata.controller";
import { DataModule } from "../../data/data.module";

@Module({
  imports: [DataModule, ConfigModule],
  providers: [pinataProvider, PinataService],
  controllers: [PinataController],
  exports: [PinataService],
})
export class PinataModule {}
