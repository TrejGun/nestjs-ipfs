import { ConfigService } from "@nestjs/config";
import  PinataClient from "@pinata/sdk";

import { IpfsProviderType } from "../../common/constants";

export const pinataProvider = {
  provide: IpfsProviderType.PINATA,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): PinataClient => {
    const pinataApiKey = configService.get<string>("PINATA_API_KEY", "");
    const pinataApiSecret = configService.get<string>("PINATA_API_SECRET", "");
    return new PinataClient(pinataApiKey, pinataApiSecret);
  },
};
