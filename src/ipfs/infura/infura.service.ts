import { Inject, Injectable } from "@nestjs/common";
import type { IPFSHTTPClient } from "ipfs-http-client";
import fs from "fs";

import { DataService } from "../../data/data.service";
import { IpfsProviderType } from "../../common/constants";

const infuraBaseUrl = "https://ipfs.io/ipfs";

@Injectable()
export class InfuraService {
  constructor(
    private readonly dataService: DataService,
    @Inject(IpfsProviderType.INFURA)
    private readonly infura: IPFSHTTPClient,
  ) {}

  public async pin(): Promise<string> {
    const filePath = this.dataService.getFilePath();
    const attributes = this.dataService.getAttributes();

    const imageCid = await this.pinFileToIPFS(filePath);
    const jsonCid = await this.pinJSONToIPFS({
      image: `${infuraBaseUrl}/${imageCid}`,
      attributes,
    });

    return `${infuraBaseUrl}/${jsonCid}`;
  }

  public pinFileToIPFS(filePath: string): Promise<string> {
    const stream = fs.createReadStream(filePath);
    return this.infura.add(stream).then(result => result.path);
  }

  public pinJSONToIPFS(data: Record<string, any>): Promise<string> {
    return this.infura.add(JSON.stringify(data)).then(result => result.path);
  }
}
