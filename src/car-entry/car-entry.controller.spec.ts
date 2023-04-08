import { Test, TestingModule } from "@nestjs/testing";
import { CarEntryController } from "./car-entry.controller";
import { CarEntryService } from "./car-entry.service";

describe('CarEntryController', () => {
  let controller: CarEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarEntryController],
      providers: [CarEntryService],
    }).compile();

    controller = module.get<CarEntryController>(CarEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
