// import { Test, TestingModule } from "@nestjs/testing";
// import { ConfigModule } from "@nestjs/config";
//
// import { DataModule } from "../../data/data.module";
// import { DataService } from "../../data/data.service";
// import { HeliaModule } from "./helia.module";
// import { HeliaService } from "./helia.service";
//
// describe("HeliaService", () => {
//   let service: HeliaService;
//   let dataService: DataService;
//   let module: TestingModule;
//
//   beforeAll(async () => {
//     module = await Test.createTestingModule({
//       imports: [ConfigModule.forRoot(), DataModule, HeliaModule],
//     }).compile();
//
//     service = module.get<HeliaService>(HeliaService);
//     dataService = module.get<DataService>(DataService);
//   }, 30_000);
//
//   afterAll(async () => {
//     await module.close();
//   });
//
//   it("should pin file to IPFS", async () => {
//     const filePath = dataService.getFilePath();
//     const cid = await service.pinFileToIPFS(filePath);
//     expect(cid).toBeDefined();
//     expect(typeof cid).toBe("string");
//     expect(cid.length).toBeGreaterThan(0);
//   });
//
//   it("should pin JSON to IPFS", async () => {
//     const attributes = dataService.getAttributes();
//     const cid = await service.pinJSONToIPFS({ attributes });
//     expect(cid).toBeDefined();
//     expect(typeof cid).toBe("string");
//     expect(cid.length).toBeGreaterThan(0);
//   });
// });
