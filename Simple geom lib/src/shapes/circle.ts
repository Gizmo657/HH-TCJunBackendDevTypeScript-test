import { Shape, ShapeFactory } from '../index';

export interface Circle extends Shape {
  readonly type: 'circle';
  readonly radius: number;
  readonly eventTarget: EventTarget;
  editShape(newRadius: number): Circle;
  getDiameter(): number;
}

export class CircleFactory implements ShapeFactory<Circle> {
  create(radius: number): Circle {
    const eventTarget = new EventTarget();
    const circle: Circle = {
      type: 'circle',
      radius,
      eventTarget,
      getArea: () => Math.PI * radius ** 2,
      getPerimeter: () => 2 * Math.PI * radius,
      editShape: (newRadius: number): Circle => {
        if (newRadius <= 0) {
          throw new Error('Радиус круга должен быть больше нуля.');
        }

        const editEvent = new CustomEvent('circle-edited', {
          detail: { oldRadius: radius, newRadius: newRadius },
        });
        circle.eventTarget.dispatchEvent(editEvent);

        return new CircleFactory().create(newRadius);
      },
      getDiameter: () => 2 * radius,
    };

    return circle;
  }
  
  validate(shape: Circle): boolean {
    return shape.radius > 0;
  }
}
