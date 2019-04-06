/**
 * 作者：郑庆文
 * 时间：2019-03-30
 * 邮箱：quinceyzheng@126.com
 * 说明：模型展示场景的模型定义文件
 */

import {
  CylinderGeometry,
  HemisphereLight,
  Material,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  SpotLight,
  Texture,
  TextureLoader
} from 'three';
import {Common} from '../common';

/* 场景模块类 */
export class Ambient {
  // 场景模型对象
  public model: Object3D;
  // 虚拟光环材质
  private auraMaterial: MeshPhongMaterial;

  // 初始化时设置一些属性值和建模
  constructor() {
    // to be set
    this.modeling();
  }

  // 错误
  public onError(): void {
    this.auraMaterial.color.set(0xff5555);
  }

  // 警告
  public onWarning(): void {
    this.auraMaterial.color.set(0xffff55);
  }

  // 正常
  public onNormal(): void {
    this.auraMaterial.color.set(0xdddddd);
  }

  // 场景建模函数，最好建模为一个网格
  private modeling(): void {
    // 定义常量
    const size = 24;
    const half = size / 2;
    const pi = Math.PI;
    const haPI = pi / 2;

    // 初始化场景模型对象
    this.model = new Object3D();

    // 添加天空盒子
    this.model.add(this.createSkyBoxPanel(size, 'py', 0, size, 0, haPI, 0, 0));
    this.model.add(this.createSkyBoxPanel(size, 'px', half, half, 0, 0, -haPI, pi));
    this.model.add(this.createSkyBoxPanel(size, 'pz', 0, half, half, 0, pi, pi));
    this.model.add(this.createSkyBoxPanel(size, 'nx', -half, half, 0, 0, haPI, pi));
    this.model.add(this.createSkyBoxPanel(size, 'nz', 0, half, -half, 0, 0, pi));
    this.model.add(this.createSkyBoxPanel(size, 'ny', 0, 0, 0, -haPI, 0, 0));

    // 添加光源
    const light = new SpotLight(0xffeedd);
    light.position.set(0, 9, 0);
    light.castShadow = true;
    light.intensity = 1; // 光强
    light.exponent = 0.8; // 衰减
    light.angle = Math.PI * 0.3;
    light.penumbra = 0.3; // 虚化边缘
    this.model.add(light);
    this.model.add(new HemisphereLight(0xffeedd, 0xeeddcc, 0.4));

    // 添加展台
    this.model.add(this.createCylinderMesh(0.5 * half, 0.6 * half, 0.02, 0.01));

    // 添加平台
    this.model.add(this.createCylinderMesh(0.45 * half, 0.45 * half, 0.01, 0.025));

    // 添加虚拟光环
    this.auraMaterial = new MeshPhongMaterial({color: 0xdddddd});
    this.model.add(this.createCylinderMesh(0.5 * half, 0.5 * half, 0.008, 0.024, this.auraMaterial));

    // 降低高度
    this.model.translateY(-0.03);
  }

  // 创建天空盒面板
  private createSkyBoxPanel(size: number, name: string, px: number, py: number, pz: number,
                            rx: number, ry: number, rz: number): Mesh {
    const geometry = new PlaneGeometry(size, size);
    const material = new MeshPhongMaterial();
    material.map = (new TextureLoader()).load('./assets/textures/' + name + '.jpg',
      function (texture: Texture): void {
        material.map = texture;
      });
    const mesh = Common.createMesh(geometry, material, px, py, pz);
    mesh.receiveShadow = true;
    mesh.rotation.set(rx, ry, rz);
    return mesh;
  }

  // 创建圆柱型网格
  private createCylinderMesh(rT: number, rB: number, h: number, y: number, mat?: Material): Mesh {
    const cylinderGeometry = new CylinderGeometry(rT, rB, h, 80, 1, false);
    let cylinderMaterial = mat;
    if (!cylinderMaterial) {
      cylinderMaterial = new MeshPhongMaterial({color: 0x454545});
    }
    const cylinder = Common.createMesh(cylinderGeometry, cylinderMaterial, 0, y, 0);
    cylinder.receiveShadow = true;
    return cylinder;
  }

}
