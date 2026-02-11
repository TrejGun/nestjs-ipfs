import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";

import { DataModule } from "../../data/data.module";
import { DataService } from "../../data/data.service";
import { PinataModule } from "./pinata.module";
import { PinataService } from "./pinata.service";

describe("PinataService", () => {
  let service: PinataService;
  let dataService: DataService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DataModule, PinataModule],
    }).compile();

    service = module.get<PinataService>(PinataService);
    dataService = module.get<DataService>(DataService);
  });

  afterAll(async () => {
    await module.close();
  });

  it("should pin file to IPFS", async () => {
    const filePath = dataService.getFilePath();
    const cid = await service.pinFileToIPFS(filePath);
    expect(cid).toBeDefined();
    expect(typeof cid).toBe("string");
    expect(cid.length).toBeGreaterThan(0);
  });

  it("should pin JSON to IPFS", async () => {
    const attributes = dataService.getAttributes();
    const cid = await service.pinJSONToIPFS({ attributes });
    expect(cid).toBeDefined();
    expect(typeof cid).toBe("string");
    expect(cid.length).toBeGreaterThan(0);
  });
});
