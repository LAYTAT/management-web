/**
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：主体模块的定义文件
 */

import {
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Geometry,
  MeshPhongMaterial,
  Object3D,
  Shape,
  Texture,
  TextureLoader,
  TorusGeometry
} from 'three';
import {Common} from '../common';
import {BodyModule} from './body';

/* 主体模块类 */
export class MainBody extends BodyModule {
  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.speed = 0.008;
    this.rotates = 0;
    this.clockwise = true;
  }

  // 父类方法
  modeling(): void {
    // 声明常量
    const mainUnit = 0.3; // 0.3
    const mainLength = mainUnit * 3;
    const mainWidth = mainUnit * 9;
    const baseLength = mainLength / 3;
    const pipeLength = mainUnit * 4;
    const pipeHeight = baseLength * 1.5;
    const roomLength = mainUnit * 3;
    const axisRadius = mainUnit * 3;
    const axisHeight = mainUnit / 2;
    const lidLength = mainUnit * 6;
    const tubeRadius = mainUnit / 4;

    // 定义主体的形体和材质纹理
    const geometry = new Geometry();
    const material = new MeshPhongMaterial({shininess: 100});
    material.map = (new TextureLoader()).load('./assets/textures/yellow2.jpg',
      function (texture: Texture): void {
        material.map = texture;
      });

    // 定义拉伸属性
    const extrude = {
      amount: mainLength,
      curveSegments: 30,
      bevelEnabled: false
    };

    // 添加主体主体
    const main = new ExtrudeGeometry(this.getMainShape(mainUnit), extrude);
    main.rotateY(-Math.PI / 2);
    main.rotateZ(-Math.PI / 2);
    main.translate(-6 * mainUnit, 0, -mainWidth / 2);
    geometry.merge(main);

    // 添加机械臂基台
    extrude.amount = baseLength;
    const base = new ExtrudeGeometry(this.getBaseShape(mainUnit), extrude);
    base.rotateY(-Math.PI / 2);
    base.rotateZ(-Math.PI / 2);
    base.translate(0, 0, -1.5 * mainUnit);
    geometry.merge(base);

    // 添加连接管道
    extrude.amount = pipeLength;
    const pipe = new ExtrudeGeometry(this.getPipeShape(mainUnit, pipeHeight), extrude);
    pipe.translate(0, baseLength, -1.5 * mainUnit);
    geometry.merge(pipe);

    // 添加驾驶舱
    extrude.amount = roomLength;
    const room = new ExtrudeGeometry(this.getRoomShape(mainUnit), extrude);
    room.translate(0.5 * mainUnit, 0, -4.5 * mainUnit);
    geometry.merge(room);

    // 添加轴承
    const axis = new CylinderGeometry(axisRadius, axisRadius, axisHeight,
      30, 1, false);
    axis.translate(0, -axisHeight / 2, 0);
    geometry.merge(axis);

    // 定义引擎盖的形体和纹理
    const lidGeometry = new Geometry();
    const lidMaterial = new MeshPhongMaterial({shininess: 100});
    lidMaterial.side = DoubleSide;
    lidMaterial.map = (new TextureLoader()).load('./assets/textures/gray.jpg',
      function (texture: Texture): void {
        lidMaterial.map = texture;
      });

    // 添加引擎盖
    extrude.amount = lidLength;
    const lid = new ExtrudeGeometry(this.getLidShape(mainUnit), extrude);
    lid.translate(-6 * mainUnit, mainLength, -lidLength / 2);
    lidGeometry.merge(lid);

    // 添加排气管
    const tube = new TorusGeometry(6 * mainUnit, tubeRadius,
      30, 10, Math.PI / 9);
    tube.translate(-9 * mainUnit, mainLength, 2 * mainUnit);
    lidGeometry.merge(tube);

    // 合成物体
    this.model = new Object3D();
    this.model.add(Common.createMesh(geometry, material));
    this.model.add(Common.createMesh(lidGeometry, lidMaterial));
    this.model.position.set(0, axisHeight + 3 * mainUnit, 0);
  }

  // 获取主体的形状
  private getMainShape(u: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 6.5 * u);
    shape.lineTo(3 * u, 6.5 * u);
    shape.lineTo(3 * u, 6 * u);
    shape.lineTo(7 * u, 6 * u);
    shape.lineTo(7 * u, 8 * u);
    shape.lineTo(8.5 * u, 8 * u);
    shape.arc(0, -0.5 * u, 0.5 * u, Math.PI / 2, 0, true);
    shape.lineTo(9 * u, 0);
    shape.quadraticCurveTo(4.5 * u, -2 * u, 0, 0);
    return shape;
  }

  // 获取基台形状
  private getBaseShape(u: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 4 * u);
    shape.lineTo(5.5 * u, 4 * u);
    shape.arc(0, -0.5 * u, 0.5 * u, Math.PI / 2, 0, true);
    shape.lineTo(6 * u, 0);
    shape.lineTo(0, 0);
    return shape;
  }

  // 获取连接管道的形状
  private getPipeShape(u: number, h: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, h);
    shape.lineTo(1.5 * u, h);
    shape.quadraticCurveTo(2 * u, h, 4 * u, 0);
    shape.lineTo(0, 0);
    return shape;
  }

  // 获取驾驶舱的形状
  private getRoomShape(u: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 3 * u);
    shape.quadraticCurveTo(0, 5 * u, 0.5 * u, 5 * u);
    shape.lineTo(4.5 * u, 5 * u);
    shape.quadraticCurveTo(5 * u, 5 * u, 5 * u, 2 * u);
    shape.lineTo(5 * u, 0.5 * u);
    shape.arc(-0.5 * u, 0, 0.5 * u, 0, -Math.PI / 2, true);
    shape.lineTo(0, 0);
    return shape;
  }

  // 获取引擎盖的形状
  private getLidShape(u: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 0.25 * u);
    shape.arc(0.25 * u, 0, 0.25 * u, Math.PI, Math.PI / 2, true);
    shape.lineTo(3 * u, 0.5 * u);
    shape.quadraticCurveTo(4 * u, 0.5 * u, 4 * u, 0);
    shape.lineTo(0, 0);
    return shape;
  }

}
