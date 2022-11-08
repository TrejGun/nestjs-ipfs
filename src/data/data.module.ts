import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DataService } from "./data.service";

@Module({
  imports: [ConfigModule],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
