import { SgmRegistry, Sgm } from 'simple-geom-lib';

let circle1 = SgmRegistry.createShape('circle', 7) as any;

circle1.eventTarget.addEventListener('circle-edited', (e: CustomEvent) => {
  console.log('Круг изменён:', e.detail, '\n');
});

console.log(await Sgm.getShapeInfo(circle1) + '\n');

circle1 = circle1.editShape(5);

console.log(await Sgm.getShapeInfo(circle1) + '\n');


let rectangle1 = SgmRegistry.createShape('rectangle', 10, 5) as any;

rectangle1.eventTarget.addEventListener('rectangle-edited', (e: CustomEvent) => {
  console.log('Прямоугольник изменён:', e.detail, '\n');
});

console.log(await Sgm.getShapeInfo(rectangle1) + '\n');

rectangle1 = rectangle1.editShape(20, 10);

console.log(await Sgm.getShapeInfo(rectangle1) + '\n');


let triangle1 = SgmRegistry.createShape('triangle', 40, 50, 80.99) as any;

triangle1.eventTarget.addEventListener('triangle-edited', (e: CustomEvent) => {
  console.log('Треугольник изменён:', e.detail, '\n');
});

console.log(await Sgm.getShapeInfo(triangle1) + '\n');

triangle1 = triangle1.editShape(3, 5, 5.830952);

console.log(await Sgm.getShapeInfo(triangle1) + '\n');
