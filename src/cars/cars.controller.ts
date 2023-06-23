import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

  private cars = ['Toyota', 'Hiunday', 'Mazda', 'Renault'];

  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.cars[id] ?? 'No existe!';
  }

  @Get()
  getAllCars() {
    return this.cars; 
  }

}
