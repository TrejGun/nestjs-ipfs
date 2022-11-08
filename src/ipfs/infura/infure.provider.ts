import { ConfigService } from "@nestjs/config";
import type { IPFSHTTPClient } from "ipfs-http-client";
import { create } from "ipfs-http-client";

import { IpfsProviderType } from "../../common/constants";

export const infuraProvider = {
  provide: IpfsProviderType.INFURA,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): IPFSHTTPClient => {
    const infuraId = configService.get<string>("INFURA_ID", "");
    const infuraSecretKey = configService.get<string>("INFURA_SECRET_KEY", "");
    return create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: "Basic " + Buffer.from(infuraId + ":" + infuraSecretKey).toString("base64"),
      },
    });
  },
};
