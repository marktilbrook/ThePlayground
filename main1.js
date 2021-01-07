// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
// position and point the camera to the center of the scene
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// create a render and set the size
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );


//create orbit controls 
var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.9;
orbitControls.screenSpacePanning = false;

//##############CREATE GROUND PLANE#######################
// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(100, 50, 50, 50);
var planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
// add the plane to the scene
scene.add(plane);
//########################################################

// // instantiate a loader
// var ufo;

// var loader = new THREE.OBJLoader();
// loader.load('models/UFO.obj', function (loadedMesh) {
//     var material = new THREE.MeshLambertMaterial({color:  0xff0000});


//     ufo = loadedMesh;
//     loadedMesh.scale.set(10, 10, 10);
//     loadedMesh.rotation.x = 180;
//     scene.add(loadedMesh);
// });

//################################## UFO ##########################################
//create the ufo
const UFOBodyGeometry = new THREE.TorusGeometry( 8, 2, 16, 100 );
const UFOBodyMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
const UFOBody = new THREE.Mesh( UFOBodyGeometry, UFOBodyMaterial );
UFOBody.rotation.x = 1.6;
UFOBody.position.y = 5;


var UFOSphereGeometry = new THREE.SphereGeometry(7, 30 , 30, 0, Math.PI * 2, 0, 1.5);
var UFOSphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
var UFOSphere = new THREE.Mesh(UFOSphereGeometry, UFOSphereMaterial);
// UFOSphere.position.y = 5;
UFOSphere.rotation.x = 4.6;

const UFORingGeometry1 = new THREE.RingGeometry( 0, 16, 32, 1, 0, Math.PI * 2);
const UFORingMaterial1 = new THREE.MeshBasicMaterial( { color: 0xac6c25, side: THREE.DoubleSide } );
const UFORing1 = new THREE.Mesh( UFORingGeometry1, UFORingMaterial1 );
UFORing1.castShadow = true;
// UFORing1.rotation.x = 1.6;
// UFORing1.position.y = 5;


const UFOBodyGeometry1 = new THREE.TorusGeometry( 16, 0.75, 16, 100 );
const UFOBodyMaterial1 = new THREE.MeshPhongMaterial( { color: 0x7777ff } );
const UFOBody1 = new THREE.Mesh( UFOBodyGeometry1, UFOBodyMaterial1 );
// UFOBody1.rotation.x = 1.6;
// UFOBody1.position.y = 5;

//scene graph for ufo
scene.add( UFOBody );
UFOBody.add(UFOBody1);
UFOBody1.add(UFORing1);
UFORing1.add(UFOSphere);
//#################################################################################


//################################ LIGHTING #####################################
//add subtle ambient lighting
// var ambiColor = "#0c0c0c";
// var ambientLight = new THREE.AmbientLight(ambiColor);
// scene.add(ambientLight);

//add pointlight
var pointColor = "#ccffcc";
var pointLight = new THREE.PointLight(pointColor);
pointLight.distance = 20;
pointLight.intensity = 5;
pointLight.castShadow = true;
scene.add(pointLight);
        
// this just shows you where the pointlight is
// var sphereLight = new THREE.SphereGeometry(0.2);
// var sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
// var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
// sphereLightMesh.castShadow = true;
// sphereLightMesh.position = new THREE.Vector3(3, 0, 3);
// scene.add(sphereLightMesh);
        
//add spotlight
// var spotLightColor = "#ffffff"
// var spotLight0 = new THREE.SpotLight(spotLightColor);
// spotLight0.position.set(-40, 60, -10);
// spotLight0.castShadow = true;
// spotLight0.target = plane;
// scene.add(spotLight0);




    
//################################ END LIGHTING #####################################
var controls = new function()
{
    //ambient light
    // this.ambientColor = ambiColor;

    //pointlight
    this.pointColor = pointColor;
    

    //spotlight
    // this.spotLightColor = spotLightColor;
    // this.intensity = 1;
    // this.angle = 0.1;
    // this.castShadow = true;

    //ufo light
    

}

//######################## GUI #################################
//create the gui and add controls
var gui = new dat.GUI();
// gui.addColor(controls, 'ambientColor').onChange(function (e) {
//     ambientLight.color = new THREE.Color(e);
// });
        
gui.addColor(controls, 'pointColor').onChange(function (e) {
    pointLight.color = new THREE.Color(e);
});

// gui.add(controls, 'pointIntensity', 0, 3).onChange(function (e) {
//     pointLight.intensity = e;
// });

// gui.add(controls, 'pointDistance', 0, 100).onChange(function (e) {
//     pointLight.distance = e;
// });
    

// gui.addColor(controls, 'spotLightColor').onChange(function (e) {
//     spotLight0.color = new THREE.Color(e);
// });

// gui.add(controls, 'angle', 0, 1).onChange(function (e) {
//     spotLight0.angle = e;
// });

// gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
//     spotLight0.intensity = e;
// });


// gui.add(controls, 'castShadow').onChange(function (e) {
//     spotLight0.castShadow = e;
// });



//###############################################################



//this is for the ufo movement
var invert = 1;
var phase = 0;

animate();
function animate() 
{
    requestAnimationFrame(animate);
    orbitControls.update();

    
   
    ufoMovement();
    // spotlight
    pointLight.position.copy(UFOBody.position);
    




    renderer.render(scene, camera);
}

function ufoMovement()
{
    
    
    if (phase > 2 * Math.PI) 
    {
        invert = invert * -1;
        phase -= 2 * Math.PI;
    } 
    else 
    {
        phase += 0.025;
    }
    UFOBody.position.z = +(7 * (Math.sin(phase)));
    UFOBody.position.x = +(14 * (Math.cos(phase)));
    UFOBody.position.y = 15;

    if (invert < 0) 
    {
        var pivot = 14;
        UFOBody.position.x = (invert * (UFOBody.position.x - pivot)) + pivot;
    }
}


