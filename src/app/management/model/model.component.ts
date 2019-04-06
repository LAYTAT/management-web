import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three';
import {OrbitControls} from 'three-orbitcontrols-ts';
import {Digger} from './digger/digger';
import {ResizeService} from '../../shared/service/resize.service';
import {KeyboardEventService} from '../../shared/service/keyboard-event.service';
import {Controller} from './controller';
import {Ambient} from './ambient/ambient';

const CLEAR_COLOR_HEX = 0xc7edcc; // 渲染的背景色
const WINDOW_TIMES = 0.75; // 窗口实际比例
const WINDOW_SCALE = 1.3; // 窗口缩放比

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @ViewChild('statsOutput') statsRef: ElementRef;
  @ViewChild('modelOutput') modelRef: ElementRef;

  private controller: Controller;
  private statsContainer: HTMLElement;
  private modelContainer: HTMLElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private orbit: OrbitControls;
  private digger: Digger;

  constructor(private keyboardEventService: KeyboardEventService,
              private resizeService: ResizeService) {
  }

  ngOnInit() {
    this.statsContainer = this.statsRef.nativeElement;
    this.modelContainer = this.modelRef.nativeElement;
    this.initialize();
    this.controller = new Controller(this.digger, this.keyboardEventService);
    this.controller.subscribeKeyDown();
    this.controller.subscribeKeyUp();
    this.resizeService.width$.subscribe(
      width => this.onResize(width * WINDOW_TIMES)
    );
  }

  initialize(): void {
    // 创建场景对象
    this.scene = new Scene();

    // 创建相机对象
    this.camera = new PerspectiveCamera(45, WINDOW_SCALE, 0.1, 1000);
    this.camera.position.set(-8, 8, 8);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.scene.add(this.camera);

    // 添加轨迹球控件
    this.orbit = new OrbitControls(this.camera);
    this.orbit.minPolarAngle = Math.PI / 6;  // 俯角
    this.orbit.maxPolarAngle = 2 * Math.PI / 5; // 仰角
    this.orbit.enableZoom = true;
    // this.orbit.minDistance = 8;            // 距视点的最小距离
    // this.orbit.maxDistance = 10;           // 最大距离*/

    // 创建渲染对象
    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor(CLEAR_COLOR_HEX);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth * WINDOW_TIMES, window.innerWidth * WINDOW_TIMES / WINDOW_SCALE);

    // 添加场景物体
    this.digger = new Digger(this.scene);
    this.scene.add((new Ambient()).model);

    // 与显示元素绑定并循环渲染
    this.modelContainer.appendChild(this.renderer.domElement);
    this.render();
  }

  private render(): void {
    this.orbit.update();
    const self: ModelComponent = this;
    (function render() {
      self.digger.turn();
      self.orbit.update();
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
    }());
  }

  private onResize(width: number): void {
    this.camera.aspect = WINDOW_SCALE;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, width / WINDOW_SCALE);
  }

}
