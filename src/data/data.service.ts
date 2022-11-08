import { Injectable } from "@nestjs/common";
import path from "path";

@Injectable()
export class DataService {
  public getAttributes(): Record<string, any> {
    return [
      {
        trait_type: "Clothes",
        value: "Tanktop",
      },
      {
        trait_type: "Fur",
        value: "Cream",
      },
      {
        trait_type: "Eyes",
        value: "Coins",
      },
      {
        trait_type: "Background",
        value: "Blue",
      },
      {
        trait_type: "Mouth",
        value: "Bored Unshaven Cigarette",
      },
      {
        trait_type: "Hat",
        value: "Bowler",
      },
    ];
  }

  public getFilePath(): string {
    return path.join(__dirname, "../../static/logo.png");
  }
}
