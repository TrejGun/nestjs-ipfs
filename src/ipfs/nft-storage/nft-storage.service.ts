import { Inject, Injectable } from "@nestjs/common";
import { Readable, Writable } from "stream";
import { Blob, NFTStorage } from "nft.storage";
import fs from "fs";

import { DataService } from "../../data/data.service";
import { IpfsProviderType } from "../../common/constants";

const nftStorageBaseUrl = "https://nftstorage.link/ipfs";

@Injectable()
export class NftStorageService {
  constructor(
    private readonly dataService: DataService,
    @Inject(IpfsProviderType.NFT_STORAGE)
    private readonly client: NFTStorage,
  ) {}

  public async pin(): Promise<string> {
    const filePath = this.dataService.getFilePath();
    const attributes = this.dataService.getAttributes();

    const imageCid = await this.pinFileToIPFS(filePath);
    const jsonCid = await this.pinJSONToIPFS({
      image: `${nftStorageBaseUrl}/${imageCid}`,
      attributes,
    });

    return `${nftStorageBaseUrl}/${jsonCid}`;
  }

  public async pinFileToIPFS(filePath: string): Promise<string> {
    const stream = fs.createReadStream(filePath);
    const buf = await this.streamAsPromise(stream);
    const blob = new Blob([buf]);
    return this.client.storeBlob(blob);
  }

  public async pinJSONToIPFS(data: Record<string, any>): Promise<string> {
    const blob = new Blob([JSON.stringify(data)]);
    return this.client.storeBlob(blob);
  }

  public streamAsPromise = (readable: Readable): Promise<Buffer> => {
    const result: Array<Buffer> = [];
    const w = new Writable({
      write(chunk, encoding, callback) {
        result.push(chunk);
        callback();
      },
    });
    readable.pipe(w);
    return new Promise((resolve, reject) => {
      w.on("finish", resolve);
      w.on("error", reject);
    }).then(() => Buffer.concat(result));
  };
}
