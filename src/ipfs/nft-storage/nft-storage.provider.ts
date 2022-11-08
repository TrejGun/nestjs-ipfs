import { ConfigService } from "@nestjs/config";
import { NFTStorage } from "nft.storage";

import { IpfsProviderType } from "../../common/constants";

export const nftStorageProvider = {
  provide: IpfsProviderType.NFT_STORAGE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): NFTStorage => {
    const nftStorageApiToken = configService.get<string>("NFT_STORAGE_API_TOKEN", "");
    return new NFTStorage({ token: nftStorageApiToken });
  },
};
