import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) { }

  populateDB() {
    this.carsService.fillCarsWithSeedDta(CARS_SEED);
    this.brandsService.fillBransWithSeedDta(BRANDS_SEED);
    return 'SEED EXCUTED!'
  }
}
