import { Shape, ShapeFactory } from '../index';

export interface Circle extends Shape {
  readonly type: 'circle';
  readonly radius: number;
  getDiameter(): number;
}

export class CircleFactory implements ShapeFactory<Circle> {
  create(radius: number): Circle {
    return {
      type: 'circle',
      radius,
      getArea: () => Math.PI * radius ** 2,
      getPerimeter: () => 2 * Math.PI * radius,
      getDiameter: () => 2 * radius
    };
  }
  
  validate(shape: Circle): boolean {
    return shape.radius > 0;
  }
}