import './style.css'

import {AmbientLight, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, TorusGeometry, WebGLRenderer, TextureLoader, MeshBasicMaterial, BoxGeometry} from 'three';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, .01, 1000)
const renderer = new WebGLRenderer({
  canvas: document.querySelector('#app')!
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Shapes
const geometry = new TorusGeometry(10,3,16,100);
const material = new MeshStandardMaterial({color: 0x7cfc00});
const torus = new Mesh(geometry, material);
scene.add(torus);

const box = new BoxGeometry(3,3,3);
const samTexture = new TextureLoader().load('portrait.png');
const sphereMaterial = new MeshBasicMaterial({map: samTexture});
const sam = new Mesh(box,sphereMaterial);
scene.add(sam);
sam.position.z=35;
sam.position.x=-4;
sam.position.y=.5;

const heart = new SphereGeometry(15);
const pittTexture=new TextureLoader().load('pitt2.png');
const heartMaterial=new MeshBasicMaterial({map:pittTexture});
const Pitt = new Mesh(heart,heartMaterial);
scene.add(Pitt);
Pitt.position.z=120;
Pitt.position.x=-50;

function addStar() {
  const geometry = new SphereGeometry(0.25, 24, 24);
  const material = new MeshStandardMaterial({ color: 0xffffff });
  const star = new Mesh(geometry, material);

  const [x, y, z] = Array(3).fill(0).map(() => MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

const stars = Array(500).fill(0);
stars.forEach(addStar);

// Light Sources
const pointLight = new PointLight(0xffffff);
pointLight.position.set(0,0,0);

const ambientLight=new AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);


// Helpers
//TODO: Remove for prod
// const lightHelper = new PointLightHelper(pointLight)
// const controls = new OrbitControls(camera, renderer.domElement);
// const gridHelper = new GridHelper(200,50);
//  scene.add(lightHelper, gridHelper);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.05;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  sam.rotation.x += 0.01;
  sam.rotation.y += 0.005;
  sam.rotation.z += 0.01;

  Pitt.rotation.y += 0.05;

  renderer.render(scene, camera);
}

animate();
