import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla'
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic'
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee'
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => (car.id === id));
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(createCardDTO: CreateCarDTO) {
    const newCar = { id: uuid(), ...createCardDTO };
    this.cars.push(newCar);
    return this.cars;
  }

  update(id: string, updateCarDTO: UpdateCarDTO) {
    if (updateCarDTO.id && updateCarDTO.id !== id) {
      throw new BadRequestException(`Car id is not valid inside body`);
    }
    let carDB = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDTO, id };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
  
  delete(id: string) {
    const carToDeleted = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== carToDeleted.id);
    return carToDeleted;
  }
}
