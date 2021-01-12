console.log("Create the scene");
var scene = new THREE.Scene();
console.log("Done");

console.log("Create the camera");
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 7;
console.log("Done");

console.log("Create the renderer");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log("Done");

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

console.log("Add Snow");
var geoSnowArray = [];
var matSnowArray = [];
var meshSnowArray = [];
var iParticleNumber = 3000;
for (var i =0; i < iParticleNumber; i++)
{
    geoSnowArray.push(new THREE.SphereGeometry(0.03, 0.05, 0.6, 18));
    matSnowArray.push(new THREE.MeshPhongMaterial({color: 0xFFFFFF, transparent: true, opacity: Math.random()*1.5}));
    meshSnowArray.push( new THREE.Mesh(geoSnowArray[i], matSnowArray[i]));
    meshSnowArray[i].position.x = Math.random()*20-10;
    meshSnowArray[i].position.y = Math.random()*12-6;
    meshSnowArray[i].position.z = Math.random()*10-5;
    scene.add(meshSnowArray[i]);
    console.log("Done");
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

console.log("Define the animation function");
var iFrame = 0;
function animate() 
{
    // Move the parciles
    for (var i =0; i<iParticleNumber; i++)
    { 
        meshSnowArray[i].position.y -= 0.05;
        if(meshSnowArray[i].position.y < -6)
        {
            meshSnowArray[i].position.y = 6.0
        }
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    iFrame = iFrame + 1;
}

animate();
console.log("Done");