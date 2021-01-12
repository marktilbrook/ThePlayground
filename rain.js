console.log("Create the scene");
var scene = new THREE.Scene();
console.log("Done");

console.log("Create the camera");
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 10;
console.log("Done");

console.log("Create the renderer");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log("Done");

console.log("Add rain");
var geoRainArray = []; // Geometry array
var matRainArray = []; // Material array
var meshRainArray = []; // Array to store meshes
var iParticleNumber = 2000;
for (var i = 0; i<iParticleNumber; i++)
{
    geoRainArray.push(new THREE.CylinderGeometry(0.01, 0.03, 0.2, 18));
    matRainArray.push(new THREE.MeshPhongMaterial({color: 0xFFFFFF, transparent: true, opacity: Math.random()*0.8}));
    meshRainArray.push( new THREE.Mesh(geoRainArray[i], matRainArray[i]));
    // meshRainArray[i].position.x = (Math.random()*20-10);
    // meshRainArray[i].position.y = (Math.random()*12-6);
    // meshRainArray[i].position.z = (Math.random()*10-5);
    meshRainArray[i].position.x = (Math.random()*2000-1000);
    meshRainArray[i].position.y = (Math.random()*1200-600);
    meshRainArray[i].position.z = (Math.random()*1000-500);
    scene.add(meshRainArray[i]);
}

console.log("Add a spotlight");
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-0, 30, 60);
spotLight.intensity = 0.6;
scene.add(spotLight);
console.log("Done");

console.log("Allows window resize");
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
console.log("done");

console.log("Animation function");
var iFrame = 0;
function animate() 
{

    // Move the parciles
    for (var i =0; i<iParticleNumber; i++)
    {
        meshRainArray[i].position.y -= 0.05;
        if(meshRainArray[i].position.y < -6)
        {
            meshRainArray[i].position.y = 6.0
        }
    }
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    iFrame = iFrame + 1;
}
animate();
console.log("Done");