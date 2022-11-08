import { Module } from "@nestjs/common";

import { PinataModule } from "./pinata/pinata.module";
import { InfuraModule } from "./infura/infura.module";
import { Web3StorageModule } from "./web3-storage/web3-storage.module";
import { NftStorageModule } from "./nft-storage/nft-storage.module";

@Module({
  imports: [PinataModule, InfuraModule, Web3StorageModule, NftStorageModule],
})
export class IpfsModule {}
