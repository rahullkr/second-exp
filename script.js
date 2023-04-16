var scene = new THREE.Scene();
// this is where the object and light go

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xb3b5b5 });

// var mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 2;
// mesh.position.set(-2,2,2);
// mesh.position.x = 2;
// mesh.position.y = 2;
// mesh.position.z = 2;
// mesh.positiony = 2;

// mesh.position.x = -2;

// scene.add(mesh);

meshX = -10;
for (var i = 0; i < 15; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 8;
  mesh.position.y = (Math.random() - 0.5) * 8;
  mesh.position.z = (Math.random() - 0.5) * 8;
  scene.add(mesh);
  meshX += 1;
}

var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 25);
scene.add(light);

var render = function () {
  requestAnimationFrame(render);

  //   mesh.rotation.x +=0.01;
  //   mesh.rotation.y +=0.01;
  //   mesh.scale.x -= 0.01;
  //   mesh.rotation.x += 0.3;
  // mesh.rotation.y +=0.3;
  //   mesh.rotation.z +=0.1;

  renderer.render(scene, camera);
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // this is how you get mouse dot x and y
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    // intersects[i].object.material.color.set(0xff0000);
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.position, 0.5, {
      x: 2,
      ease: Expo.easeOut,
    });
    this.tl.to(
      intersects[i].object.rotation,
      0.5,
      { y: Math.PI * 5, ease: Expo.easeOut },
      "=1.5"
    );
  }
}
render();
// this.tl = new TimelineMax({ paused: true });
// this.tl.to(this.mesh.scale, 1, { x: 2, ease: Expo.easeOut });
// this.tl.to(this.mesh.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
// this.tl.to(this.mesh.position, 0.5, { x: 2, ease: Expo.easeOut });
// this.tl.to(
//   this.mesh.rotation,
//   0.5,
//   { y: Math.PI * 5, ease: Expo.easeOut },
//   "=1.5"
// );
//now all of this have to go in that loop to take the effect on mosue move.
window.addEventListener("mousemove", onMouseMove);
