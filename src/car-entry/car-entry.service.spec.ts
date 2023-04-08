import { Test, TestingModule } from "@nestjs/testing";
import { CarEntryService } from "./car-entry.service";

describe('CarEntryService', () => {
  let service: CarEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarEntryService],
    }).compile();

    service = module.get<CarEntryService>(CarEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
