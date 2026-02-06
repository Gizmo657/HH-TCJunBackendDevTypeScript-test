import { Shape, ShapeFactory } from '../index';

export interface Triangle extends Shape {
  readonly type: 'triangle';
  readonly sideA: number;
  readonly sideB: number;
  readonly sideC: number;
  readonly eventTarget: EventTarget;
  editShape(newA: number, newB: number, newC: number): Triangle;
  getSubType(): string;
  getSides(): number[];
}

export class TriangleFactory implements ShapeFactory<Triangle> {
  create(sideA: number, sideB: number, sideC: number): Triangle {
    const eventTarget = new EventTarget();
    const halfPerimeter = (sideA + sideB + sideC) / 2;
    
    const triangle: Triangle =   {
      type: 'triangle',
      sideA,
      sideB,
      sideC,
      eventTarget,
      getArea: () => Math.sqrt(
        halfPerimeter * 
        (halfPerimeter - sideA) * 
        (halfPerimeter - sideB) * 
        (halfPerimeter - sideC)
      ),
      getPerimeter: () => sideA + sideB + sideC,
      editShape: (newA: number, newB: number, newC: number): Triangle => {
              if (newA <= 0 && newB <= 0 && newC <= 0 &&
                newA + newB <= newC &&
                newA + newC <= newB &&
                newB + newC <= newA) {
                  throw new Error(`Недопустимые параметры для геометрической фигуры типа 'triangle'`);
                }

              const editEvent = new CustomEvent('triangle-edited', {
                detail: { oldA: sideA, newA, oldB: sideB, newB, oldC: sideC, newC },
              });
              triangle.eventTarget.dispatchEvent(editEvent);

              return new TriangleFactory().create(newA, newB, newC);
            },
      getSubType: () => {
        let subType: string = ''
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
        if ((a - bc) < 1e-5) {
          subType = subType + ' rectangular triangle'
        }
        else if (a < bc) {
          subType = subType + ' sharp-angled triangle'
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

    return triangle;
  }
  
  validate(shape: Triangle): boolean {
    const { sideA, sideB, sideC } = shape;
    return sideA > 0 && sideB > 0 && sideC > 0 &&
           sideA + sideB > sideC &&
           sideA + sideC > sideB &&
           sideB + sideC > sideA;
  }
}
