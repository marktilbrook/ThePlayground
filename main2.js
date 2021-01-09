// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();


scene.fog = new THREE.Fog(0xaaaaaa, 0.5, 200);

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

//grass texture
var textureGrass = THREE.ImageUtils.loadTexture('grass.jpg');
textureGrass.wrapS = THREE.RepeatWrapping;
textureGrass.wrapT = THREE.RepeatWrapping;
textureGrass.repeat.set(4, 4);


// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(150, 100, 200, 200);
// var planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff,
//     specular: 0xffffff, shininess: 100});
var planeMaterial = new THREE.MeshLambertMaterial({map: textureGrass});
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


//################################## UFO ##########################################
//create the ufo
var UFOBodyGeometry = new THREE.TorusGeometry( 8, 2, 16, 100 );
var UFOBodyMaterial = createDetailedTexture("metal_c.jpg", "metal_n.jpg", "metal_r.jpg");
var UFOBody = new THREE.Mesh( UFOBodyGeometry, UFOBodyMaterial );
UFOBody.rotation.x = 1.6;
UFOBody.position.y = 5;

//cockpit
var UFOSphereGeometry = new THREE.SphereGeometry(5, 30 , 30, 0, Math.PI * 2, 0, 1.5);
var UFOSphereMaterial = new THREE.MeshPhongMaterial({color: 0x98D7C2, opacity: 0.7, transparent: true});
var UFOSphere = new THREE.Mesh(UFOSphereGeometry, UFOSphereMaterial);
// UFOSphere.position.y = 5;
UFOSphere.rotation.x = 4.6;

var UFORingGeometry1 = new THREE.RingGeometry( 0, 16, 32, 1, 0, Math.PI * 2);
var UFORingMaterial1 =  createDetailedTexture("plate_c.jpg", "plate_n.jpg", "plate_r.jpg");
var UFORing1 = new THREE.Mesh( UFORingGeometry1, UFORingMaterial1 );
UFORing1.castShadow = true;
// UFORing1.rotation.x = 1.6;
// UFORing1.position.y = 5;


var UFOBodyGeometry1 = new THREE.TorusGeometry( 16, 0.75, 16, 100 );
var UFOBodyMaterial1 = createDetailedTexture("metal_c.jpg", "metal_n.jpg", "metal_r.jpg");
var UFOBody1 = new THREE.Mesh( UFOBodyGeometry1, UFOBodyMaterial1 );
// UFOBody1.rotation.x = 1.6;
// UFOBody1.position.y = 5;


//scene graph for ufo
scene.add( UFOBody );
UFOBody.add(UFOBody1);
UFOBody1.add(UFORing1);
UFORing1.add(UFOSphere);



//#################################################################################

//################################ RAIN PARTICLES ##########################################
var geoRainArray = []; // Geometry array
var matRainArray = []; // Material array
var meshRainArray = []; // Array to store meshes
var iParticleNumber = 2000;
for (var i =0; i<iParticleNumber; i++)
{
    geoRainArray.push(new THREE.CylinderGeometry(0.01, 0.03, 0.2, 18));
    matRainArray.push(new THREE.MeshPhongMaterial({color: 0xFFFFFF, transparent: true, opacity: Math.random()*0.8}));
    meshRainArray.push( new THREE.Mesh(geoRainArray[i], matRainArray[i]));
    meshRainArray[i].position.x = Math.random()*20-10;
    meshRainArray[i].position.y = Math.random()*12-6;
    meshRainArray[i].position.z = Math.random()*10-5;
    scene.add(meshRainArray[i]);
}



//############################################# CREATE ENVIRONMENT ##################################################

//road
var road_geo = new THREE.CubeGeometry(15, 1, 50, 24, 24, 24);
var road_mat =  createDetailedTexture("road_c.jpg", "road_n.jpg", "road_r.jpg");
var road1 = new THREE.Mesh( road_geo, road_mat);
var road2 = new THREE.Mesh( road_geo, road_mat);
var road3 = new THREE.Mesh( road_geo, road_mat);
road1.rotation.y = 1.6;
road1.position.x = -50;
road2.position.z = 50;
road3.position.z = 50;
//road scenegraph
scene.add(road1);
road1.add(road2);
road2.add(road3);
//
//tents
var tent = createDetailedMesh(new THREE.SphereGeometry(10, 16, 16 ),"fabric_c.jpg", "fabric_n.jpg",
    "fabric_r.jpg"  );
tent.position.z = -25;
tent.castShadow = true;
scene.add(tent);
var tent1 = createDetailedMesh(new THREE.SphereGeometry(10, 16, 16 ),"fabric_c.jpg", "fabric_n.jpg",
    "fabric_r.jpg"  );
tent1.position.z = 25;
tent1.position.x = 25;
tent1.castShadow = true;
scene.add(tent1);
var tent2 = createDetailedMesh(new THREE.SphereGeometry(10, 16, 16 ),"fabric_c.jpg", "fabric_n.jpg",
    "fabric_r.jpg"  );
tent2.position.z = -25;
tent2.position.x = -30;
tent2.castShadow = true;
scene.add(tent2);
//
//obelisk
var cube = new THREE.CubeGeometry(3, 10, 3);
var mat = createDetailedTexture("shiny_c.jpg", "shiny_n.jpg", "shiny_r.jpg");
var metal_cube = new THREE.Mesh( cube, mat);
metal_cube.position.x = -15;
metal_cube.position.z = 25;
metal_cube.position.y = 4;
metal_cube.castShadow = true;
scene.add(metal_cube);







//###############################################################################

//################################ LIGHTING #####################################

// var sunLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1);
// scene.add( sunLight );

//add pointlight
var pointColor = "#ccffcc";
var pointLight = new THREE.PointLight(pointColor);
pointLight.distance = 35;
pointLight.intensity = 25;
pointLight.castShadow = true;
scene.add(pointLight);

//todo add directional light
const dir_color = 0xFFFFFF;
const dir_intensity = 1;
const dir_light = new THREE.DirectionalLight(dir_color, dir_intensity);
dir_light.position.set(0, 10, 0);
dir_light.target.position.set(-5, 0, 0);
dir_light.castShadow = true;
scene.add(dir_light);
scene.add(dir_light.target);




//################################ END LIGHTING #####################################
var controls = new function()
{
    //ambient light
    // this.ambientColor = ambiColor;

    //ufo light
    this.ufoLightColor = pointColor;
    this.ufoLightIntensity = 0.5;

    // this.hemisphere = true;
    // this.skyColor = 0x0000ff;
    // this.sunlightIntensity = 0.6;



};

//######################## GUI #################################
//create the gui and add controls
var gui = new dat.GUI();



gui.addColor(controls, 'ufoLightColor').onChange(function (e) {
    pointLight.color = new THREE.Color(e);
});

gui.add(controls, 'ufoLightIntensity', 0, 25).onChange(function (e) {
    pointLight.intensity = e;
});


// gui.add(controls, 'hemisphere').onChange(function (e) {
//
//     if (!e) {
//         sunLight.intensity = 0;
//     } else {
//         sunLight.intensity = controls.intensity;
//     }
// });
//
// gui.addColor(controls, 'skyColor').onChange(function (e) {
//     sunLight.color = new THREE.Color(e);
// });
// gui.add(controls, 'sunlightIntensity', 0, 5).onChange(function (e) {
//     sunLight.intensity = e;
// });
gui.add(dir_light, 'intensity', 0, 2, 0.01);
gui.add(dir_light.target.position, 'x', -10, 10, .01);
gui.add(dir_light.target.position, 'z', -10, 10, .01);
gui.add(dir_light.target.position, 'y', 0, 10, .01);


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


    pointLight.position.copy(UFOBody.position);


    UFOBody.rotation.z += 0.01;
    animateRain();

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
        phase += 0.020;
    }
    UFOBody.position.z = +(28 * (Math.sin(phase)));
    UFOBody.position.x = +(14 * (Math.cos(phase)));
    UFOBody.position.y = 15+(5 * (Math.cos(phase)));

    if (invert < 0)
    {
        var pivot = 14;
        UFOBody.position.x = (invert * (UFOBody.position.x - pivot)) + pivot;
    }
}

function createSimpleMesh(geometry, imageFile, roughness)
{
    var texture = THREE.ImageUtils.loadTexture( imageFile);
    var mat = new THREE.MeshStandardMaterial({ roughness: roughness});
    mat.map = texture;
    var mesh = new THREE.Mesh(geometry, mat);
    return mesh;
}

function createDetailedMesh(geom, imageFile, normal, roughness) {
    var t = THREE.ImageUtils.loadTexture(  imageFile);
    var m = THREE.ImageUtils.loadTexture(  normal);
    var r = THREE.ImageUtils.loadTexture(  roughness);


    var mat2 = new THREE.MeshStandardMaterial();

    mat2.map = t;
    mat2.normalMap = m;
    mat2.roughnessMap = r;


    var mesh = new THREE.Mesh(geom, mat2);
    return mesh;
}

function createDetailedTexture(imageFile, normal, roughness)
{
    var t = THREE.ImageUtils.loadTexture( imageFile);
    var m = THREE.ImageUtils.loadTexture(normal);
    var r = THREE.ImageUtils.loadTexture(roughness);


    var mat2 = new THREE.MeshStandardMaterial( {side: THREE.DoubleSide});

    mat2.map = t;
    mat2.normalMap = m;
    mat2.roughnessMap = r;



    return mat2;
}

function animateRain()
{
    // Move the partciles
    for (var i =0; i<iParticleNumber; i++)
    {
        meshRainArray[i].position.y -= 0.05;
        if(meshRainArray[i].position.y < -6)
        {
            meshRainArray[i].position.y = 6.0;
        }
    }
}
