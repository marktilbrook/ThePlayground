console.log("Create scene");
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff );
console.log("done");

console.log("Create camera");
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ); // Perspective projection parameters
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 50;
console.log("done");

console.log("Create renderer");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Size of the 2D projection
document.body.appendChild(renderer.domElement); // Connecting to the canvas
console.log("done");

console.log("Create the plane");
var plane = null;
var planeGeom = new THREE.PlaneGeometry(3.0, 3.0, 40, 40); 
var loader = new THREE.TextureLoader();
var m = new THREE.MeshPhongMaterial( 
{
    map: loader.load("solar_c.png"),
    shininess: 80,
} );
plane = new THREE.Mesh(planeGeom, m);
plane.rotation.x = -Math.PI*(1/22);
scene.add(plane);
console.log("done");

console.log("Create ambient light");
var lightAmbient = new THREE.AmbientLight( 0x222222, 5.0 ); 
scene.add(lightAmbient);
console.log("done");

console.log("Create spotlight");
var lightThis = new THREE.SpotLight(0xffffff);
lightThis.position.x = -20;
lightThis.position.y = 20;
lightThis.position.z = 20;
lightThis.intensity = 1.0;
lightThis.penumbra = 0.50;
lightThis.angle = Math.PI/6;
scene.add(lightThis);
lightThis.target.position.x = 0;
lightThis.target.position.y = 0;
lightThis.target.position.z = 0;
scene.add(lightThis.target);


var iFrame = 0;
console.log("done");

console.log("Wave function");
function wave(geometry, cycle, height, frmOffset) // animate the wave by adding the offset to the x position at every frame
 {
  for (var i = 0; i < geometry.vertices.
    length; i++) 
    {
      const width = geometry.parameters.width;
      const xPos = (((geometry.vertices[i].x+frmOffset)*cycle) / width)*(1*Math.PI); // controls how many creases in the plane

      // compute z-pos using sine function
      var zPos = Math.sin(xPos)*height;
      
      geometry.vertices[i].z = zPos;
    }
  
    geometry.verticesNeedUpdate = true;
    geometry.computeVertexNormals();
  }

var ratio = 25;
console.log("done");

console.log("Animation");
function animate() 
{
    requestAnimationFrame(animate);

    iFrame ++;
    frmOffset = iFrame%(planeGeom.parameters.width*ratio); // calculate offset based on frame number

    if (plane!=null) 
    {
        wave(planeGeom, 2, 1, frmOffset/ratio); 
    }

    renderer.render(scene, camera);

}
console.log("done");
animate();
