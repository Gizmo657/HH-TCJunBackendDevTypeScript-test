import { Rectangle } from './shapes/rectangle';
import { Circle } from './shapes/circle';
import { Triangle } from './shapes/triangle';

export interface Shape {
  readonly type: string;
  getArea(): number;
  getPerimeter(): number;
  editShape(...args: any[]): Shape;
}

export interface ShapeFactory<T extends Shape> {
  create(...args: any[]): T;
  validate(shape: T): boolean;
}

export class SgmRegistry {
  private static factories: Map<string, ShapeFactory<any>> = new Map();
  /**
   * Регистрирует фабрику фигур одного типа (класс, создающий объекты фигуры) в списке фабрик.
   * @param type - название фигуры, пример 'circle'.
   * @param factory - объект фабрики, реализующий интерфейс 'ShapeFactory<T>' и способный создавать экземпляры типа 'T', наследующего 'Shape'. Пример: 'new CircleFactory()', 'CircleFactory' имеет метод 'create(): Circle'.
   */
  static register<T extends Shape>(type: string, factory: ShapeFactory<T>): void {
    this.factories.set(type, factory);
  }
  /**
   * Создаёт объект конкретной фигуры.
   * @param type - название фигуры, пример 'circle'.
   * @param args - параметры фигуры, пример радиус круга '10'.
   * @returns Возвращает объект конкретной фигуры
   */
  static createShape(type: string, ...args: any[]): 
  Shape {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`Тип геометрической фигуры '${type}' не зарегистрирован`);
    }
    const shape = factory.create(...args);
    if (!factory.validate(shape)) {
      throw new Error(`Недопустимые параметры для геометрической фигуры типа '${type}'`);
    }
    return shape;
  }
  static getAvailableTypes(): string[] {
    return Array.from(this.factories.keys());
  }
}

export class Sgm {
  /**
   * @param shape - объект фигуры, пример 'circ_1_2'.
   * @returns Возвращает название типа фигуры этого объекта, пример 'circle'.
   */
  static async getType(shape: Shape): Promise<string> {
    return await new Promise((resolve) => resolve(shape.type));
  }
  static async getArea(shape: Shape): Promise<number> {
    return await new Promise((resolve) => resolve(Number(shape.getArea().toFixed(2))));
  }
  static async getPerimeter(shape: Shape): Promise<number> {
    return await new Promise((resolve) => resolve(Number(shape.getPerimeter().toFixed(2))));
  }
  static async getWidth(shape: Shape): Promise<number> {
    if (shape.type == 'rectangle') {
      const rect = shape as Rectangle;
      return await new Promise((resolve) => resolve(Number(rect.width.toFixed(2))));
    }
    throw new Error(`Геометрическая фигура типа '${shape.type} не имеет параметра 'ширина'`);
  }
  static async getHeight(shape: Shape): Promise<number> {
    if (shape.type == 'rectangle') {
      const rect = shape as Rectangle;
      return await new Promise((resolve) => resolve(Number(rect.height.toFixed(2))));
    }
    throw new Error(`Геометрическая фигура типа '${shape.type} не имеет параметра 'высота'`);
  }
  static async getDiagonal(shape: Shape): Promise<number> {
    if (shape.type == 'rectangle') {
      const rect = shape as Rectangle;
      return await new Promise((resolve) => resolve(Number((rect as any).getDiagonal().toFixed(2))));
    }
    throw new Error(`Геометрическая фигура типа '${shape.type} не имеет параметра 'диагональ'`);
  }
  static async getRadius(shape: Shape): Promise<number> {
    if (shape.type == 'circle') {
      const circ = shape as Circle;
      return await new Promise((resolve) => resolve(Number(circ.radius.toFixed(2))));
    }
    throw new Error(`Геометрическая фигура типа '${shape.type} не имеет параметра 'радиус'`);
  }
  static async getDiameter(shape: Shape): Promise<number> {
    if (shape.type == 'circle') {
      const circ = shape as Circle;
      return await new Promise((resolve) => resolve(Number((circ as any).getDiameter().toFixed(2))));
    }
    throw new Error(`Геометрическая фигура типа '${shape.type} не имеет параметра 'диаметр'`);
  }
  /**
   * @param shape - объект фигуры, пример 'rectangle_1_2'.
   * @returns Возвращает массив сторон объекта фигуры, пример '[6, 5, 6, 5]'.
   */
  static async getSides(shape: Shape): Promise<number[]> {
    if (shape.type == 'rectangle') {
      const rect = shape as Rectangle;
      return await new Promise((resolve) => resolve(rect.getSides()));
    }
    else if (shape.type == 'triangle') {
      const tria = shape as Triangle;
      return await new Promise((resolve) => resolve(tria.getSides()));
    }
    throw new Error(`Геометрическая фигура типа '${shape.type} не имеет параметра 'стороны'`);
  }
  static async getSubType(shape: Shape): Promise<string> {
    if (shape.type == 'triangle') {
      const tria = shape as Triangle;
      return await new Promise((resolve) => resolve(tria.getSubType()));
    }
    throw new Error(`Геометрическая фигура типа '${shape.type} не имеет подтипов`);
  }
  static async isSquare(shape: Shape): Promise<boolean> {
    if (shape.type == 'rectangle') {
      const rect = shape as Rectangle;
      return await new Promise((resolve) => resolve(rect.isSquare()));
    }
    return false
  }
  /**
   * @param shape - объект фигуры, пример 'circ_1_2'.
   * @returns Возвращает полную информацию про объект фигуры.
   */
  static async getShapeInfo(shape: Shape): Promise<string> {
    let info = `Тип фигуры: ${shape.type}\n`;
    info += `Площадь: ${Number(shape.getArea().toFixed(2))}\n`;
    info += `Периметр: ${Number(shape.getPerimeter().toFixed(2))}\n`;
    
    switch (shape.type) {
      case 'rectangle':
        const rect = shape as Rectangle;
        info += `Ширина: ${Number(rect.width.toFixed(2))}\n`;
        info += `Высота: ${Number(rect.height.toFixed(2))}\n`;
        info += `Диагональ: ${Number((rect as any).getDiagonal().toFixed(2))}\n`;
        info += `Стороны: ${rect.getSides().join(", ")}\n`;
        info += `Квадрат: ${rect.isSquare()}\n`
        break;
        
      case 'circle':
        const circ = shape as Circle;
        info += `Радиус: ${Number(circ.radius.toFixed(2))}\n`;
        info += `Диаметр: ${Number((circ as any).getDiameter().toFixed(2))}\n`;
        break;
      
      case 'triangle':
        const tria = shape as Triangle;
        info += `Стороны: ${tria.getSides().join(", ")}\n`;
        info += `Подтип: ${tria.getSubType()}`;
        break;
    }
    
    return await new Promise((resolve) => resolve(info));
  }
  /**
   * @param shape1 - объект фигуры, пример 'circ_1_2'.
   * @param shape2 - объект второй фигуры, пример 'tria_1_1'.
   * @returns Возвращает разность площадей двух объектов фигур.
   */
  static areasDifference(shape1: Shape, shape2: Shape): number {
    return shape1.getArea() - shape2.getArea();
  }
  
  static PerimetersDifference(shape1: Shape, shape2: Shape): number {
    return shape1.getPerimeter() - shape2.getPerimeter();
  }
}
