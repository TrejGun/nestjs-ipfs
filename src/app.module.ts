import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { IpfsModule } from "./ipfs/ipfs.module";

@Module({
  providers: [Logger],
  imports: [ConfigModule.forRoot(), IpfsModule],
  controllers: [AppController],
})
export class AppModule {}
