import { Inject, Injectable } from "@nestjs/common";
import type { PinataClient } from "@pinata/sdk";
import fs from "fs";

import { DataService } from "../../data/data.service";
import { IpfsProviderType } from "../../common/constants";

const pinataBaseUrl = "https://gateway.pinata.cloud/ipfs";

@Injectable()
export class PinataService {
  constructor(
    private readonly dataService: DataService,
    @Inject(IpfsProviderType.PINATA)
    private readonly client: PinataClient,
  ) {}

  public async pin(): Promise<string> {
    const filePath = this.dataService.getFilePath();
    const attributes = this.dataService.getAttributes();

    const imageCid = await this.pinFileToIPFS(filePath);
    const jsonCid = await this.pinJSONToIPFS({
      image: `${pinataBaseUrl}/${imageCid}`,
      attributes,
    });

    return `${pinataBaseUrl}/${jsonCid}`;
  }

  public pinFileToIPFS(filePath: string): Promise<string> {
    const stream = fs.createReadStream(filePath);

    // https://github.com/PinataCloud/Pinata-SDK/issues/28#issuecomment-816439078
    // @ts-ignore
    stream.path = filePath;

    return this.client
      .pinFileToIPFS(stream, {
        pinataMetadata: {
          name: "name",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      })
      .then(result => result.IpfsHash);
  }

  public pinJSONToIPFS(data: Record<string, any>): Promise<string> {
    return this.client
      .pinJSONToIPFS(data, {
        pinataMetadata: {
          name: "name",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      })
      .then(result => result.IpfsHash);
  }
}
