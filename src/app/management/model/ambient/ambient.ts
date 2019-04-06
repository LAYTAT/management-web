/**
 * 作者：郑庆文
 * 时间：2019-03-30
 * 邮箱：quinceyzheng@126.com
 * 说明：模型展示场景的模型定义文件
 */

import {AxesHelper, DirectionalLight, HemisphereLight, MeshPhongMaterial, Object3D, PlaneGeometry, Texture, TextureLoader} from 'three';
import {Common} from '../common';

/* 场景模块类 */
export class Ambient {
  // 场景模型对象
  public model: Object3D;

  // 初始化时设置一些属性值和建模
  constructor() {
    // to be set
    this.modeling();
  }

  // 场景建模函数，最好建模为一个网格
  private modeling(): void {
    // 初始化场景模型对象
    this.model = new Object3D();

    // 添加参考坐标轴，实际应用要删除该物体
    const coordinateAxis = new AxesHelper(20);
    this.model.add(coordinateAxis);

    // 添加方向光源
    const light = new DirectionalLight(0xffeedd);
    light.position.set(20, 20, 20);
    light.castShadow = true;
    light.intensity = 0.6;
    this.model.add(light);

    // 添加环境光源
    const heme = new HemisphereLight(0xeeeeee, 0xffeedd, 0.5);
    heme.position.set(0, 20, 0);
    this.model.add(heme);

    // 添加地板
    const groundGeometry = new PlaneGeometry(10, 10);
    const groundMaterial = new MeshPhongMaterial();
    groundMaterial.map = (new TextureLoader()).load('./assets/textures/ground.jpg',
      function (texture: Texture): void {
        groundMaterial.map = texture;
      });
    const ground = Common.createMesh(groundGeometry, groundMaterial, 0, 0, 0);
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    this.model.add(ground);
  }

}
