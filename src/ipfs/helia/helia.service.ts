// import { Inject, Injectable } from "@nestjs/common";
// import { json } from "@helia/json";
// import { unixfs } from "@helia/unixfs";
// import fs from "fs";
//
// import { DataService } from "../../data/data.service";
// import { IpfsProviderType } from "../../common/constants";
//
// const heliaBaseUrl = "https://ipfs.io/ipfs";
//
// @Injectable()
// export class HeliaService {
//   constructor(
//     private readonly dataService: DataService,
//     @Inject(IpfsProviderType.HELIA)
//     private readonly helia: any,
//   ) {}
//
//   public async pin(): Promise<string> {
//     const filePath = this.dataService.getFilePath();
//     const attributes = this.dataService.getAttributes();
//
//     const imageCid = await this.pinFileToIPFS(filePath);
//     const jsonCid = await this.pinJSONToIPFS({
//       image: `${heliaBaseUrl}/${imageCid}`,
//       attributes,
//     });
//
//     return `${heliaBaseUrl}/${jsonCid}`;
//   }
//
//   public pinFileToIPFS(filePath: string): Promise<string> {
//     const stream = fs.createReadStream(filePath);
//     return unixfs(this.helia).addByteStream(stream).then(result => result.toString());
//   }
//
//   public pinJSONToIPFS(data: Record<string, any>): Promise<string> {
//     return json(this.helia).add(data).then(result => result.toString());
//   }
// }
