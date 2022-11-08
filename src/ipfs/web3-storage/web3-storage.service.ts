import { Inject, Injectable } from "@nestjs/common";
import { Web3Storage } from "web3.storage";
import { Readable } from "stream";
import fs from "fs";

import { DataService } from "../../data/data.service";
import { IpfsProviderType } from "../../common/constants";

const web3StorageBaseUrl = "https://w3s.link/ipfs";

@Injectable()
export class Web3StorageService {
  constructor(
    private readonly dataService: DataService,
    @Inject(IpfsProviderType.WEB3_STORAGE)
    private readonly client: Web3Storage,
  ) {}

  public async pin(): Promise<string> {
    const filePath = this.dataService.getFilePath();
    const attributes = this.dataService.getAttributes();

    const imageCid = await this.pinFileToIPFS(filePath);
    const jsonCid = await this.pinJSONToIPFS({
      image: `${web3StorageBaseUrl}/${imageCid}`,
      attributes,
    });

    return `${web3StorageBaseUrl}/${jsonCid}`;
  }

  public pinFileToIPFS(filePath: string): Promise<string> {
    const stream = fs.createReadStream(filePath);
    return this.client.put([{ name: "name", stream: () => stream }], {
      wrapWithDirectory: false,
    });
  }

  public async pinJSONToIPFS(data: Record<string, any>): Promise<string> {
    const stream = this.getReadableStream(Buffer.from(JSON.stringify(data)));
    return this.client.put([{ name: "name", stream: () => stream }], {
      wrapWithDirectory: false,
    });
  }

  public getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
