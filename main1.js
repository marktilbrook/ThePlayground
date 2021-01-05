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


// create a cube
        var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;

        // add the cube to the scene
        scene.add(cube);

        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 2;
        sphere.castShadow = true;

        // add the sphere to the scene
        scene.add(sphere);

        // position and point the camera to the center of the scene
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);

//################################ LIGHTING #####################################
//add subtle ambient lighting
var ambiColor = "#0c0c0c";
var ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);

//add pointlight
var pointColor = "#ccffcc";
var pointLight = new THREE.PointLight(pointColor);
pointLight.distance = 100;
pointLight.castShadow = true;
scene.add(pointLight);
        
// this just shows you where the pointlight is
var sphereLight = new THREE.SphereGeometry(0.2);
var sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
sphereLightMesh.castShadow = true;
sphereLightMesh.position = new THREE.Vector3(3, 0, 3);
scene.add(sphereLightMesh);
        
//add spotlight
var spotLightColor = "#ffffff"
var spotLight0 = new THREE.SpotLight(spotLightColor);
spotLight0.position.set(-40, 60, -10);
spotLight0.castShadow = true;
spotLight0.target = plane;
scene.add(spotLight0);
    
//################################ END LIGHTING #####################################
var controls = new function()
{
    //ambient light
    this.ambientColor = ambiColor;

    //pointlight
    this.pointColor = pointColor;
    this.pointIntensity = 1;
    this.pointDistance = 100;

    //spotlight
    this.spotLightColor = spotLightColor;
    this.intensity = 1;
    this.angle = 0.1;
    this.debug = false;
    this.castShadow = true;
}

//######################## GUI #################################
//create the gui and add controls
var gui = new dat.GUI();
gui.addColor(controls, 'ambientColor').onChange(function (e) {
    ambientLight.color = new THREE.Color(e);
});
        
gui.addColor(controls, 'pointColor').onChange(function (e) {
    pointLight.color = new THREE.Color(e);
});

gui.add(controls, 'pointIntensity', 0, 3).onChange(function (e) {
    pointLight.intensity = e;
});

gui.add(controls, 'pointDistance', 0, 100).onChange(function (e) {
    pointLight.distance = e;
});
    

gui.addColor(controls, 'spotLightColor').onChange(function (e) {
    spotLight0.color = new THREE.Color(e);
});

gui.add(controls, 'angle', 0, 1).onChange(function (e) {
    spotLight0.angle = e;
});

gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
    spotLight0.intensity = e;
});

gui.add(controls, 'debug').onChange(function (e) {
    spotLight0.shadowCameraVisible = e;
});

gui.add(controls, 'castShadow').onChange(function (e) {
    spotLight0.castShadow = e;
});
//###############################################################

animate();


function animate() 
{
    requestAnimationFrame(animate);
    orbitControls.update();
    renderer.render(scene, camera);
}

