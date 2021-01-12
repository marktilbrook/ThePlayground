console.log("Create the scene");
var scene = new THREE.Scene();
scene.fog=new THREE.Fog( 0xffffff, 15, 54 );
scene.background = new THREE.Color(0xffffff );
console.log("Done");

console.log("Create the camera");
var camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 30;
console.log("Done");

console.log("Create the renderer");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMapEnabled = true;
console.log("Done");

console.log("Create first cube");
const geoBox1 = new THREE.BoxGeometry(5,5,5);
const matBox1 = new THREE.MeshPhongMaterial( { color: 0xFF00FF, } );
const meshBox1 = new THREE.Mesh( geoBox1, matBox1 );
scene.add( meshBox1 );
meshBox1.position.x = 10;
meshBox1.position.y = 0;
meshBox1.position.z = 0;
console.log("Done");

console.log("Create second cube");
const geoBox2 = new THREE.BoxGeometry(5,5,5);
const matBox2 = new THREE.MeshPhongMaterial( { color: 0x4169E1, } );
const meshBox2 = new THREE.Mesh( geoBox2, matBox2 );
scene.add( meshBox2 );
meshBox2.position.x = -10;
meshBox2.position.y = 0;
meshBox2.position.z = 0;
console.log("Done");

console.log("Create the first sphere");
var geoSphere1= new THREE.SphereGeometry(2, 18, 18);
var matSphere1 = new THREE.MeshPhongMaterial({color: 0x669900});
var meshSphere1 = new THREE.Mesh(geoSphere1, matSphere1);
meshSphere1.position.x = -2.5;
meshSphere1.position.y = 0;
meshSphere1.position.z = 0;
scene.add( meshSphere1 );
console.log("Done");

console.log("Create the second sphere");
var geoSphere2= new THREE.SphereGeometry(2, 18, 18);
var matSphere2 = new THREE.MeshPhongMaterial({color: 0xFF8C00});
var meshSphere2 = new THREE.Mesh(geoSphere2, matSphere2);
meshSphere2.position.x = 2.5;
meshSphere2.position.y = 0;
meshSphere2.position.z = 0;
scene.add( meshSphere2 );
console.log("Done");

console.log("Add a spotlight");
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-0, 30, 60);
spotLight.intensity = 0.6;
spotLight.castShadow = true;
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

	meshBox1.position.z -= 0.05; // speed of the cubes
        if(meshBox1.position.z < -11) // The position the object must reach to be restarted
        {
            meshBox1.position.z = 6.0 // restart position
        }
        meshBox2.position.z -= 0.05;
        	if(meshBox2.position.z < -11)
        	{
           	 	meshBox2.position.z = 7.0
        	}
        	meshSphere1.position.z -= 0.05;
        		if(meshSphere1.position.z < -11)
        		{
            		meshSphere1.position.z = 8.0
        		}	
        		meshSphere2.position.z -= 0.05;
        			if(meshSphere2.position.z < -11)
        			{
            			meshSphere2.position.z = 9.0
        			}

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    iFrame = iFrame + 1;

    
}


animate();
console.log("Done");

