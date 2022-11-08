import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { infuraProvider } from "./infure.provider";
import { InfuraService } from "./infura.service";
import { InfuraController } from "./infura.controller";
import { DataModule } from "../../data/data.module";

@Module({
  imports: [DataModule, ConfigModule],
  providers: [infuraProvider, InfuraService],
  controllers: [InfuraController],
  exports: [InfuraService],
})
export class InfuraModule {}
