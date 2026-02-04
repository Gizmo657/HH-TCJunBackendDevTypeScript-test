import { Shape, ShapeFactory } from '../index';

export interface Triangle extends Shape {
  readonly type: 'triangle';
  readonly sideA: number;
  readonly sideB: number;
  readonly sideC: number;
  getSubType(): string;
  getSides(): number[];
}

export class TriangleFactory implements ShapeFactory<Triangle> {
  create(sideA: number, sideB: number, sideC: number): Triangle {
    const semiPerimeter = (sideA + sideB + sideC) / 2;
    
    return {
      type: 'triangle',
      sideA,
      sideB,
      sideC,
      getArea: () => Math.sqrt(
        semiPerimeter * 
        (semiPerimeter - sideA) * 
        (semiPerimeter - sideB) * 
        (semiPerimeter - sideC)
      ),
      getPerimeter: () => sideA + sideB + sideC,
      getSubType: () => {
        let subType: string = 'regular'
        if (sideA == sideB && sideA == sideC) {
          subType = 'equilateral'
          return subType
        }
        else if (sideA == sideB || sideA == sideC || sideB == sideC) {
          subType = 'isosceles'
        }
        else {
          subType = 'versatile'
        }
        const sides = [sideA, sideB, sideC].sort((a, b) => a - b);
        const bc = sides[0] ** 2 + sides[1] ** 2
        const a = sides[2] ** 2
        if (a < bc) {
          subType = subType + ' sharp-angled triangle'
        }
        else if (a == bc) {
          subType = subType + ' rectangular'
        }
        else if (a > bc) {
          subType = subType + ' blunt-angled triangle'
        }
        return subType
      },
      getSides: () => {
        return [Number(sideA.toFixed(2)), Number(sideB.toFixed(2)), Number(sideC.toFixed(2))];
      }
    };
  }
  
  validate(shape: Triangle): boolean {
    const { sideA, sideB, sideC } = shape;
    return sideA > 0 && sideB > 0 && sideC > 0 &&
           sideA + sideB > sideC &&
           sideA + sideC > sideB &&
           sideB + sideC > sideA;
  }
}