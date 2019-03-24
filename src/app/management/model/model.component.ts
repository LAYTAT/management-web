import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  CylinderGeometry,
  ExtrudeGeometry,
  Geometry,
  HemisphereLight,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Path,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Shape,
  SpotLight,
  Vector3,
  WebGLRenderer
} from 'three';
import {OrbitControls} from 'three-orbitcontrols-ts';
import {Digger} from './digger';
import {KeyboardEventService} from '../../shared/service/keyboard-event.service';
import {filter} from 'rxjs/operators';
import {WidthService} from '../../shared/service/width.service';
import Timer = NodeJS.Timer;
import {WidthService} from '../../shared/service/width.service';

const CLEAR_COLOR_HEX = 0x233333; // 渲染的背景色
const GROUND_COLOR_HEX = 0x373737; // 基础地面的颜色
const MAIN_LIGHT_COLOR_STRING = '#ffeedd'; // 场景主光源的颜色
const ADDITION_LIGHT_COLOR_HEX = 0xffeedd; // 附加光源的颜色
const ADDITION_LIGHT_OTHER_HEX = 0xffeedd; // 附加光源的其他颜色
const WALL_COLOR_HEX = 0x686868; // 墙体的颜色
// const WORD_COLOR_HEX = 0xffffff; // 文字的颜色
const STAGE_COLOR_HEX = 0x454545; // 展台的颜色
const AURA_COLOR_HEX = 0xeeeeee; // 光环的颜色
const PLATFORM_COLOR_HEX = 0x565656; // 平台的颜色
const PLATFORM_OTHER_HEX = 0xddccbb; // 平台的其他颜色
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {


  @ViewChild('statsOutput') statsRef: ElementRef;
  @ViewChild('modelOutput') modelRef: ElementRef;
  public digger: Digger;
  private statsCon: HTMLElement;
  private modelCon: HTMLElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private orbit: OrbitControls;
  private bucketUpTimer: Timer;
  private bucketDownTimer: Timer;

  private middleArmUpTimer: Timer;
  private middleArmDownTimer: Timer;

  private diggerLeftTimer: Timer;
  private diggerRightTimer: Timer;

  private longArmUpTimer: Timer;
  private longArmDowmTimer: Timer;

  private mainBodyLeftTimer: Timer;
  private mainBodyRightTimer: Timer;

  constructor(private keyboardEventService: KeyboardEventService,
              private widthService: WidthService) {
  }

  ngOnInit() {
    this.statsCon = this.statsRef.nativeElement;
    this.modelCon = this.modelRef.nativeElement;
    this.initialize();
    this.subscribeKeydown();
    this.subscribeKeyup();
    this.widthService.width$.subscribe(
      width => console.log(width)
    );
  }

  subscribeKeydown(): void {
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 't')
    ).subscribe(() => this.turnBucketUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'g')
    ).subscribe(() => this.turnBucketDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'y')
    ).subscribe(() => {
      this.turnDiggerLeft();
    });
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'h')
    ).subscribe(() => {
      console.log('h down');
      this.turnDiggerRight();
    });
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'u')
    ).subscribe(() => this.turnLongArmUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'j')
    ).subscribe(() => this.turnLongArmDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'i')
    ).subscribe(() => this.turnMainBodyLeft());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'k')
    ).subscribe(() => this.turnMainBodyRight());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'o')
    ).subscribe(() => this.turnMiddleArmUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'l')
    ).subscribe(() => this.turnMiddleArmDown());
  }

  subscribeKeyup(): void {
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 't')
    ).subscribe(() => clearInterval(this.bucketUpTimer));
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'g')
    ).subscribe(() => clearInterval(this.bucketDownTimer));
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'y')
    ).subscribe(() => {
      clearInterval(this.diggerLeftTimer);
    });
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'h')
    ).subscribe(() => {
      console.log('h up');
      clearInterval(this.diggerRightTimer);
    });
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'u')
    ).subscribe(() => clearInterval(this.longArmUpTimer));
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'j')
    ).subscribe(() => clearInterval(this.longArmDowmTimer));
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'i')
    ).subscribe(() => clearInterval(this.mainBodyLeftTimer));
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'k')
    ).subscribe(() => clearInterval(this.mainBodyRightTimer));
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'o')
    ).subscribe(() => clearInterval(this.middleArmUpTimer));
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'l')
    ).subscribe(() => clearInterval(this.middleArmDownTimer));
  }

  initialize(): void {
    // 创建场景对象
    this.scene = new Scene();

    // 创建相机对象
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight,
      0.1, 1000);
    this.camera.position.set(-8, 8, 8);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.scene.add(this.camera);

    // 添加轨迹球控件
    this.orbit = new OrbitControls(this.camera);
    this.orbit.minPolarAngle = Math.PI / 6;  // 俯角
    this.orbit.maxPolarAngle = 2 * Math.PI / 5; // 仰角
    this.orbit.minDistance = 8;            // 距视点的最小距离
    this.orbit.maxDistance = 10;           // 最大距离

    // 创建渲染对象：原渲染器对象，无法胜任平面光源渲染任务
    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor(CLEAR_COLOR_HEX);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // 添加场景物体
    this.addSceneObject();

    // 与显示元素绑定并循环渲染
    this.modelCon.appendChild(this.renderer.domElement);
    this.render();
  }

  /**********以下是挖掘机的控制函数：移动函数慎用，未完善，可能转动左右会相反，对调一下参数即可***********/

  // 挖掘机前进
  public moveDiggerForward(): boolean {
    return this.digger.moveMyself(0.01);
  }

  // 挖掘机后退
  public moveDiggerBackward(): boolean {
    return this.digger.moveMyself(-0.01);
  }

  // 挖掘机左转
  public turnDiggerLeft(): void {
    this.diggerLeftTimer = setInterval(
      () => {
        this.digger.turn(0.01);
      }, 20);
  }

  // 挖掘机右转
  public turnDiggerRight(): void {
    this.diggerRightTimer = setInterval(
      () => {
        this.digger.turn(-0.01);
        console.log('turn right');
      }, 20);
  }

  // 车身左转
  public turnMainBodyLeft(): void {
    this.mainBodyLeftTimer = setInterval(
      () => this.digger.turnMainBody(0.01), 20);
  }

  // 车身右转
  public turnMainBodyRight(): void {
    this.mainBodyRightTimer = setInterval(
      () => this.digger.turnMainBody(-0.01), 20);
  }

  // 长臂上转
  public turnLongArmUp(): void {
    this.longArmUpTimer = setInterval(
      () => this.digger.turnLongArm(0.01), 20);
  }

  // 长臂下转
  public turnLongArmDown(): void {
    this.longArmDowmTimer = setInterval(
      () => this.digger.turnLongArm(-0.01), 20);
  }

  // 中臂上转
  public turnMiddleArmUp(): void {
    this.middleArmUpTimer = setInterval(
      () => this.digger.turnMiddleArm(0.01), 20);
  }

  // 中臂下转
  public turnMiddleArmDown(): void {
    this.middleArmDownTimer = setInterval(
      () => this.digger.turnMiddleArm(-0.01), 20);
  }

  public turnBucketUp(): void {
    this.bucketUpTimer = setInterval(
      () => this.digger.turnBucket(0.02), 20);
  }

  public turnBucketDown(): void {
    this.bucketDownTimer = setInterval(
      () => this.digger.turnBucket(-0.02), 20);
  }

  // 开关照明灯
  public turnLightOn(on: boolean): boolean {
    return false;
  }

  // 排烟
  public ejectSmoke(): boolean {
    return false;
  }

  private getCastShadowMesh(geometry: Geometry, material: Material,
                            x: number, y: number, z: number): Mesh {
    const mesh = new Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    return mesh;
  }

  /**********结束***********/

  private render(): void {
    this.orbit.update();
    const self: ModelComponent = this;
    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
    }());
  }

  private addSceneObject(): void {
    // 添加参照地面
    const groundGeometry = new PlaneGeometry(20, 20, 1, 1);
    const groundMaterial = new MeshPhongMaterial({color: GROUND_COLOR_HEX});
    const ground = this.getCastShadowMesh(groundGeometry, groundMaterial, 0, 0, 0);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    // 添加场景光源
    const light = new SpotLight(MAIN_LIGHT_COLOR_STRING);
    light.position.set(0, 10, 0);
    light.castShadow = true;
    light.target = ground;
    light.angle = Math.PI / 2;
    light.exponent = 4;
    this.scene.add(light);

    // 添加附加光源
    const addition = new HemisphereLight(ADDITION_LIGHT_COLOR_HEX, ADDITION_LIGHT_OTHER_HEX, 0.4);
    addition.position.set(0, 10, 0);
    this.scene.add(addition);

    const option = {
      amount: 10,        // 墙体高度
      bevelEnabled: false// 禁止斜角
    };
    const wallGeometry = new ExtrudeGeometry(this.drawWall(), option);
    const wallMaterial = new MeshLambertMaterial({color: WALL_COLOR_HEX});
    const wall = this.getCastShadowMesh(wallGeometry, wallMaterial, 0, 0, 0);
    wall.rotation.x = -Math.PI / 2;
    this.scene.add(wall);

    /* 标志文字
    const secondOptions = {
      size : 1,
      height : 0.2,
      weight : 'normal',
      font : 'helvetiker',
      style : 'normal',
      bevelEnabled : false,
      curveSegments : 20,
      steps : 1
    };
    const wordGeometry = new THREE.TextGeometry('DIGGER');
    const wordMaterial = new THREE.MeshPhongMaterial({color: WORD_COLOR_HEX});
    const word = this.getCastShadowMesh(wordGeometry, wordMaterial, 10, 2, -2.42);
    word.rotation.set(0, -Math.PI / 2, 0);
    this.scene.add(word);*/

    // 展台
    const stageGeometry = new CylinderGeometry(5, 5.6, 0.02, 80, 1, false);
    const stageMaterial = new MeshLambertMaterial({color: STAGE_COLOR_HEX});
    const stage = this.getCastShadowMesh(stageGeometry, stageMaterial, 0, 0.01, 0);
    this.scene.add(stage);

    // 光环
    const thirdOptions = {
      amount: 0.002,       // 光环高度
      bevelEnabled: false, // 禁止斜角
      curveSegments: 80    // 曲线光滑度
    };
    const auraGeometry = new ExtrudeGeometry(this.drawAura(), thirdOptions);
    const auraMaterial = new MeshBasicMaterial({color: AURA_COLOR_HEX});
    const aura = this.getCastShadowMesh(auraGeometry, auraMaterial, 0, 0.021, 0);
    aura.rotation.x = Math.PI / 2;
    this.scene.add(aura);

    // 平台
    const platformGeometry = new CylinderGeometry(4.8, 4.8, 0.002, 80, 1, false);
    const platformMaterial = new MeshPhongMaterial({color: PLATFORM_COLOR_HEX, specular: PLATFORM_OTHER_HEX, shininess: 8000});
    const platform = this.getCastShadowMesh(platformGeometry, platformMaterial, 0, 0.021, 0);
    platform.receiveShadow = true;
    this.scene.add(platform);

    this.digger = new Digger(this.scene);
  }

  private drawWall(): Shape {
    const shape = new Shape();
    shape.moveTo(-11, -11);
    shape.lineTo(-11, 11);
    shape.lineTo(11, 11);
    shape.lineTo(11, -11);
    shape.lineTo(-11, -11);
    shape.moveTo(-10, -10);
    shape.lineTo(10, -10);
    shape.lineTo(10, -4);
    shape.lineTo(9.5, -4);
    shape.lineTo(9.5, -3);
    shape.lineTo(10, -3);
    shape.lineTo(10, 3);
    shape.lineTo(9.5, 3);
    shape.lineTo(9.5, 4);
    shape.lineTo(10, 4);
    shape.lineTo(10, 10);
    shape.lineTo(-10, 10);
    shape.lineTo(-10, -10);
    return shape;
  }

  private drawAura(): Shape {
    const shape = new Shape();
    shape.moveTo(5, 0);
    shape.arc(-5, 0, 5, 0, 6.3, true);
    const hole = new Path();
    hole.absarc(0, 0, 4.8, 0, 6.3, true);
    shape.holes.push(hole);
    return shape;
  }


}
