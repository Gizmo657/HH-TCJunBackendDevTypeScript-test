import { Shape, ShapeFactory } from '../index';

export interface Rectangle extends Shape {
  readonly type: 'rectangle';
  readonly width: number;
  readonly height: number;
  readonly eventTarget: EventTarget;
  editShape(newWidth: number, newHeight: number): Rectangle;
  getDiagonal(): number;
  isSquare(): boolean;
  getSides(): number[];
}

export class RectangleFactory implements ShapeFactory<Rectangle> {
  create(width: number, height: number): Rectangle {
    const eventTarget = new EventTarget();
    const rectangle: Rectangle =  {
      type: 'rectangle',
      width,
      height,
      eventTarget,
      getArea: () => width * height,
      getPerimeter: () => 2 * (width + height),
      editShape: (newWidth: number, newHeight: number): Rectangle => {
        if (newWidth <= 0 && newHeight <= 0) {
          throw new Error('Стороны прямоугольника должны быть больше или равны нулю.');
        }

        const editEvent = new CustomEvent('rectangle-edited', {
          detail: { oldWidth: width, newWidth, oldHeight: height, newHeight },
        });
        rectangle.eventTarget.dispatchEvent(editEvent);

        return new RectangleFactory().create(newWidth, newHeight);
      },
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

    return rectangle;
  }
  
  validate(shape: Rectangle): boolean {
    return shape.width > 0 && shape.height > 0;
  }
}
