import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Clock, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three';
import {OrbitControls} from 'three-orbitcontrols-ts';
import {Digger} from './digger/digger';
import {KeyboardEventService} from '../service/keyboard-event.service';
import {Controller} from './controller';
import {Ambient} from './ambient/ambient';
import {fromEvent} from 'rxjs';
import {map, throttleTime} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

const WINDOW_SCALE = 1.3; // 窗口缩放比

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit, AfterViewInit {
  @ViewChild('modelOutput')
  modelRef: ElementRef;

  public controller: Controller;
  private modelContainer: HTMLElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private orbit: OrbitControls;
  private clock: Clock;
  public ambient: Ambient;
  public digger: Digger;

  @Input()
  carId: number;

  constructor(private keyboardEventService: KeyboardEventService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.modelContainer = this.modelRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.initialize();
    this.controller = new Controller(this, this.keyboardEventService, this.authService);
    this.controller.subscribeKeyDown();
    this.controller.subscribeKeyUp();
    this.controller.subscribeTouchStart();
    this.controller.subscribeTouchEnd();
    this.subscribeModelWidth();
  }

  subscribeModelWidth(): void {
    fromEvent(window, 'resize').pipe(
      throttleTime(100),
      map(() => this.modelContainer.offsetWidth)
    ).subscribe(width => this.onResize(width));
  }

  private initialize(): void {
    // 创建场景对象
    this.scene = new Scene();

    // 创建相机对象
    this.camera = new PerspectiveCamera(50, WINDOW_SCALE, 0.1, 40);
    this.camera.position.set(-9, 9, 9);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.scene.add(this.camera);

    // 添加轨迹球控件
    this.orbit = new OrbitControls(this.camera, this.modelContainer);
    this.orbit.minPolarAngle = Math.PI / 6;  // 俯角
    this.orbit.maxPolarAngle = 2 * Math.PI / 5; // 仰角
    this.orbit.enableZoom = true;
    this.orbit.minDistance = 8;   // 距视点的最小距离
    this.orbit.maxDistance = 10;  // 最大距离

    // 创建渲染对象
    this.renderer = new WebGLRenderer({antialias: true});
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.modelContainer.offsetWidth,
      this.modelContainer.offsetWidth / WINDOW_SCALE);
    this.clock = new Clock();

    // 添加场景物体
    this.digger = new Digger(this.scene, 0.5);
    this.ambient = new Ambient();
    this.scene.add(this.ambient.model);

    // 与显示元素绑定并循环渲染
    this.modelContainer.appendChild(this.renderer.domElement);
    this.render();
  }

  private render(): void {
    this.orbit.update();
    const self: ModelComponent = this;
    (function render() {
      self.digger.turn();
      self.digger.move();
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
