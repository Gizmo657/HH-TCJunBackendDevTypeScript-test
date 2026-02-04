import { SgmRegistry } from './shape';
import { RectangleFactory } from './shapes/rectangle';
import { CircleFactory } from './shapes/circle';
import { TriangleFactory } from './shapes/triangle';

SgmRegistry.register('rectangle', new RectangleFactory());
SgmRegistry.register('circle', new CircleFactory());
SgmRegistry.register('triangle', new TriangleFactory());

export { Shape, ShapeFactory, SgmRegistry, Sgm } from './shape';