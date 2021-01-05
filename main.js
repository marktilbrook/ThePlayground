var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ); // Perspective projection parameters
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Size of the 2D projection
document.body.appendChild(renderer.domElement); // Connecting to the canvas

// instantiate a loader
// const objLoader = new THREE.OBJLoader();
// objLoader.load('lighthouse_1.obj', function(object) {
//     scene.add(object);

// });


var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.screenSpacePanning = false;

// Add the ambient light
var lightAmbient = new THREE.AmbientLight( 0x222222 ); 
scene.add(lightAmbient);


// Add the spot light
var lightThis = new THREE.SpotLight(0xffffff);
lightThis.position.x = 0;
lightThis.position.y = 150;
lightThis.position.z = 20;
lightThis.intensity = 1.0;
lightThis.penumbra = 0.50;
lightThis.angle = Math.PI/6;
scene.add(lightThis);
lightThis.target.position.x = 0;
lightThis.target.position.y = -50;
lightThis.target.position.z = -100;
scene.add(lightThis.target);


var g = new THREE.SphereGeometry(1, 18, 18);
var m = [ 
    new THREE.MeshPhongMaterial( { color: 0x990000 } ), 
    new THREE.MeshPhongMaterial( { color: 0x996633 } ), 
    new THREE.MeshPhongMaterial( { color: 0x999900 } ), 
    new THREE.MeshPhongMaterial( { color: 0x009900 } ), 
    new THREE.MeshPhongMaterial( { color: 0x000099 } )
];

// add 5*5*5 spheres to the scene
var spacing = 10;
for (var i=0;i<5;i++) {
    for (var j=0;j<5;j++) {
        for (var k=0;k<5;k++) {
            var mesh = new THREE.Mesh(g, m[k]);

            // specifying the 3D coordinates of the sphere
            mesh.position.x = i*spacing - 20;
            mesh.position.y = j*spacing - 20;
            mesh.position.z = k*spacing - 100;

            // add the sphere to the scene
            scene.add(mesh);
        }
    }
}

function animate() 
{
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
