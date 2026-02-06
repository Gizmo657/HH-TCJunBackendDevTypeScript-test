import { SgmRegistry, Sgm } from 'simple-geom-lib';

const availableTypes = SgmRegistry.getAvailableTypes()
console.log(availableTypes.join(", ") + '\n')
const rectangle1 = SgmRegistry.createShape('rectangle', 10, 5);
const triangle1 = SgmRegistry.createShape('triangle', 40, 50, 80.99);
const circle1 = SgmRegistry.createShape('circle', 7);

console.log(await Sgm.getType(rectangle1));
console.log(await Sgm.getArea(rectangle1));
console.log(await Sgm.getPerimeter(rectangle1));
console.log(await Sgm.getDiagonal(rectangle1))
console.log((await Sgm.getSides(rectangle1)).join(", "))
console.log(await Sgm.isSquare(rectangle1))
console.log(await Sgm.getShapeInfo(rectangle1) + '\n');

console.log(await Sgm.getShapeInfo(triangle1) + '\n');

console.log(await Sgm.getShapeInfo(circle1) + '\n');

const shapes = [rectangle1, triangle1, circle1];
shapes.sort(Sgm.areasDifference);
console.log('\nФигуры отсортированные по площади:');
shapes.forEach(shape => console.log(`${shape.type}: ${shape.getArea()}`));
shapes.sort(Sgm.PerimetersDifference);
console.log('\nФигуры отсортированные по периметру:');
shapes.forEach(shape => console.log(`${shape.type}: ${shape.getPerimeter()}`));
