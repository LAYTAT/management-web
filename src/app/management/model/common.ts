/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是通用模块的定义文件
 */

import {Geometry, Material, Mesh} from 'three';

/* 包含通用函数的类 */
export class Common {
  // 网格生成函数
  static createMesh(geometry: Geometry, material: Material, x: number, y: number, z: number): Mesh {
    const mesh = new Mesh(geometry, material);
    // mesh.castShadow = true;
    mesh.position.set(x, y, z);
    return mesh;
  }
}
