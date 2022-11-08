import { ConfigService } from "@nestjs/config";
import { Web3Storage } from "web3.storage";

import { IpfsProviderType } from "../../common/constants";

export const web3StorageProvider = {
  provide: IpfsProviderType.WEB3_STORAGE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Web3Storage => {
    const web3StorageApiToken = configService.get<string>("WEB3_STORAGE_API_TOKEN", "");
    return new Web3Storage({ token: web3StorageApiToken });
  },
};
