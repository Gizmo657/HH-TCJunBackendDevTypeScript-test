import { Shape, ShapeFactory } from '../index';

export interface Rectangle extends Shape {
  readonly type: 'rectangle';
  readonly width: number;
  readonly height: number;
  getDiagonal(): number;
  isSquare(): boolean;
  getSides(): number[];
}

export class RectangleFactory implements ShapeFactory<Rectangle> {
  create(width: number, height: number): Rectangle {
    return {
      type: 'rectangle',
      width,
      height,
      getArea: () => width * height,
      getPerimeter: () => 2 * (width + height),
      getDiagonal: () => Math.sqrt(width * width + height * height),
      isSquare: () => {
        if (width == height) {
          return true
        }
        else {
          return false
        }
      },
      getSides: () => {
        const a = Number(width.toFixed(2))
        const b = Number(height.toFixed(2))
        return [a, b, a, b];
      }
    };
  }
  
  validate(shape: Rectangle): boolean {
    return shape.width > 0 && shape.height > 0;
  }
}