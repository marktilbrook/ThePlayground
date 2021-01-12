// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

// create fog
scene.fog = new THREE.Fog(0xaaaaaa, 0.5, 200);

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
// position and point the camera to the center of the scene
camera.position.x = -150;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// create a render and set the size
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

//############################# FIRE WORKS CANVAS ####################################################
var canvas = document.getElementById( 'canvas' ),
    ctx = canvas.getContext( '2d' ),
    // full screen dimensions
    cw = window.innerWidth,
    ch = window.innerHeight/4.5,
    // firework collection
    fireworks = [],
    // particle collection
    particles = [],
    // starting hue
    hue = 120,
    // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
    limiterTotal = 5,
    limiterTick = 0,
    // this will time the auto launches of fireworks, one launch per 40 loop ticks
    timerTotal = 40,
    timerTick = 0,
    mousedown = false,
    // mouse x coordinate,
    mx,
    // mouse y coordinate
    my;

// set canvas dimensions
canvas.width = cw;
canvas.height = ch;
//######################################################################################################


//create orbit controls
var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.9;
orbitControls.screenSpacePanning = false;

//#################################CREATE GROUND PLANE##############################################
//grass texture
var textureGrass = THREE.ImageUtils.loadTexture('textures/grass.jpg');
textureGrass.wrapS = THREE.RepeatWrapping;
textureGrass.wrapT = THREE.RepeatWrapping;
textureGrass.repeat.set(4, 4);
// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(150, 100, 200, 200);
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
//###############################################################################################



//################################## UFO ##########################################
//create the ufo
//inner ring
var UFOBodyGeometry = new THREE.TorusGeometry( 8, 2, 16, 100 );
var UFOBodyMaterial = createDetailedTexture("textures/metal_c.jpg", "textures/metal_n.jpg", "textures/metal_r.jpg");
var UFOBody = new THREE.Mesh( UFOBodyGeometry, UFOBodyMaterial );
UFOBody.rotation.x = 1.6;
UFOBody.position.y = 5;
//cockpit
var UFOSphereGeometry = new THREE.SphereGeometry(5, 30 , 30, 0, Math.PI * 2, 0, 1.5);
var UFOSphereMaterial = new THREE.MeshPhongMaterial({color: 0x98D7C2, opacity: 0.7, transparent: true});
var UFOSphere = new THREE.Mesh(UFOSphereGeometry, UFOSphereMaterial);
UFOSphere.rotation.x = 4.6;
//main body
var UFORingGeometry1 = new THREE.RingGeometry( 0, 16, 32, 1, 0, Math.PI * 2);
var UFORingMaterial1 =  createDetailedTexture("textures/solar_c.jpg", "textures/solar_n.jpg", "textures/solar_r.jpg");
var UFORing1 = new THREE.Mesh( UFORingGeometry1, UFORingMaterial1 );
UFORing1.castShadow = true;
//outer ring
var UFOBodyGeometry1 = new THREE.TorusGeometry( 16, 0.75, 16, 100 );
var UFOBodyMaterial1 = createDetailedTexture("textures/metal_c.jpg", "textures/metal_n.jpg", "textures/metal_r.jpg");
var UFOBody1 = new THREE.Mesh( UFOBodyGeometry1, UFOBodyMaterial1 );
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
    geoRainArray.push(new THREE.CylinderGeometry(0.01*2, 0.03*2, 0.2*2, 18));
    matRainArray.push(new THREE.MeshPhongMaterial({color: 0xFFFFFF, transparent: true, opacity: Math.random()*1.5}));
    meshRainArray.push( new THREE.Mesh(geoRainArray[i], matRainArray[i]));
    meshRainArray[i].position.x = 7*(Math.random()*20-10);
    meshRainArray[i].position.y = 7*(Math.random()*20-10);
    meshRainArray[i].position.z = 7*(Math.random()*10-5);
    scene.add(meshRainArray[i]);
}
//##########################################################################################

//############################################### WELCOME TEXT #####################################################
var font_loader = new THREE.FontLoader();
var font_material;
var font_mesh;
font_loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font )
{
    var geometry = new THREE.TextGeometry( 'Welcome to the Scene',
        {
            font: font,
            size: 5,
            height: 0.2,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.05,
            bevelSegments: 3
        } );
    geometry.center();
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.y = 15;
    mesh.position.z = -40;
    scene.add( mesh );
} );
//#################################################################################################################


//############################################# CREATE ENVIRONMENT ##################################################
//road
var road_geo = new THREE.CubeGeometry(15, 1, 50, 24, 24, 24);
var road_mat =  createDetailedTexture("textures/road_c.jpg", "textures/road_n.jpg", "textures/road_r.jpg");
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

//tents
var tent = createDetailedMesh(new THREE.SphereGeometry(10, 16, 16 ),"textures/fabric_c.jpg", "textures/fabric_n.jpg",
    "textures/fabric_r.jpg"  );
tent.position.z = -25;
tent.castShadow = true;
scene.add(tent);
var tent1 = createDetailedMesh(new THREE.SphereGeometry(10, 16, 16 ),"textures/fabric_c.jpg", "textures/fabric_n.jpg",
    "textures/fabric_r.jpg"  );
tent1.position.z = 25;
tent1.position.x = 25;
tent1.castShadow = true;
scene.add(tent1);
var tent2 = createDetailedMesh(new THREE.SphereGeometry(10, 16, 16 ),"textures/fabric_c.jpg", "textures/fabric_n.jpg",
    "textures/fabric_r.jpg"  );
tent2.position.z = -25;
tent2.position.x = -30;
tent2.castShadow = true;
scene.add(tent2);

//obelisk
var box;
var boxGeom = new THREE.BoxGeometry(5, 25, 5, 10, 10, 10);
var twistM = new THREE.MeshPhongMaterial( {
    color: 0xC0C0C0,
    specular: 0x050505,
    shininess: 100
} );
box = new THREE.Mesh(boxGeom, twistM);
box.position.x = -15;
box.position.z = 25;
box.position.y = 6;
box.castShadow = true;
scene.add(box);

//flag
var flag = null;
var flagGeom = new THREE.PlaneGeometry(12.0, 6.0, 40, 40);
var loader = new THREE.TextureLoader();
var m = new THREE.MeshPhongMaterial(
    {
        map: loader.load("textures/solar_c.jpg"),
        shininess: 80,
    } );
flag = new THREE.Mesh(flagGeom, m);
flag.rotation.x = -Math.PI*(1/22);
flag.position.y = 8;
flag.position.x = 22;
flag.position.z = -15;
scene.add(flag);

//flagstick
var stick_geo = new THREE.CubeGeometry(1, 15, 1, 1,1,1);
var stick_mat = new THREE.MeshPhongMaterial(
    {
        map: loader.load("textures/solar_c.jpg"),
        shininess: 80,
    } );
var flag_stick = new THREE.Mesh(stick_geo, stick_mat);
flag_stick.position.y = 3;
flag_stick.position.x = 16.5;
flag_stick.position.z = -15;
scene.add(flag_stick);
//###############################################################################

//################################ LIGHTING #####################################
//add this is the ufo light
var pointColor = "#ccffcc";
var pointLight = new THREE.PointLight(pointColor);
pointLight.distance = 35;
pointLight.intensity = 25;
pointLight.castShadow = true;
scene.add(pointLight);


const dir_color = 0xFFFFFF;
const dir_intensity = 1;
const dir_light = new THREE.DirectionalLight(dir_color, dir_intensity);
dir_light.position.set(0, 10, 0);
dir_light.target.position.set(-5, 0, 0);
dir_light.castShadow = true;
scene.add(dir_light);
scene.add(dir_light.target);
//################################ END LIGHTING #####################################

//################################## GUI ###########################################
var controls = new function()
{
    //ufo light
    this.ufoLightColor = pointColor;
    this.ufoLightIntensity = 0.5;
};
//create the gui and add controls
var gui = new dat.GUI();

gui.addColor(controls, 'ufoLightColor').onChange(function (e) {
    pointLight.color = new THREE.Color(e);
});

gui.add(controls, 'ufoLightIntensity', 0, 25).onChange(function (e) {
    pointLight.intensity = e;
});

gui.add(dir_light, 'intensity', 0, 2, 0.01);
gui.add(dir_light.target.position, 'x', -10, 10, .01);
gui.add(dir_light.target.position, 'z', -10, 10, .01);
gui.add(dir_light.target.position, 'y', 0, 10, .01);
//##############################################################################



//this is for the ufo movement
var invert = 1;
var phase = 0;

//frame
var iFrame = 0;

//flag ratio
var ratio = 20;

var step = 0;


animate();
function animate()
{
    requestAnimationFrame(animate);
    iFrame ++;

    //flag motion
    frmOffset = iFrame%(flagGeom.parameters.width*ratio); // calculate offset based on frame number
    if (flag!=null)
    {
        wave(flagGeom, 2, 1, frmOffset/ratio);
    }

    //orbit controls
    orbitControls.update();
    ufoMovement();
    pointLight.position.copy(UFOBody.position);
    launchFireworks();
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
    UFOBody.position.y = 25+(5 * (Math.cos(phase)));
    UFOBody.rotation.z += 0.04;

    //this twists the obelisk
    twisting(boxGeom, 0.05* (Math.sin(phase)));

    // metal_cube.scale.z = +(0.5 * (Math.sin(phase)));
    // metal_cube.scale.x = +(0.5 * (Math.cos(phase)));
    if (invert < 0)
    {
        var pivot = 14;
        UFOBody.position.x = (invert * (UFOBody.position.x - pivot)) + pivot;
    }
}

//helper function
function createSimpleMesh(geometry, imageFile, roughness)
{
    var texture = THREE.ImageUtils.loadTexture( imageFile);
    var mat = new THREE.MeshStandardMaterial({ roughness: roughness});
    mat.map = texture;
    var mesh = new THREE.Mesh(geometry, mat);
    return mesh;
}
//helper function
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
//helper function
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

//wave function for the flag
function wave(geometry, cycle, height, frmOffset) // animate the wave by adding the offset to the x position at every frame
{
    for (var i = 0; i < geometry.vertices.length; i++)
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

//twisting function for the obelisk
function twisting(geometry, degree) {
    const quaternion = new THREE.Quaternion();
    for (var i = 0; i < geometry.vertices.length; i++) {
// a single vertex Y position
        const yPos = geometry.vertices[i].y;
        const upVec = new THREE.Vector3(0, 1, 0);
        quaternion.setFromAxisAngle(upVec, (Math.PI/180)*degree*yPos);
        geometry.vertices[i].applyQuaternion(quaternion);
    }
    geometry.verticesNeedUpdate = true;
}


// get a random number within a range
function random( min, max ) {
    return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
    var xDistance = p1x - p2x,
        yDistance = p1y - p2y;
    return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
    // actual coordinates
    this.x = sx;
    this.y = sy;
    // starting coordinates
    this.sx = sx;
    this.sy = sy;
    // target coordinates
    this.tx = tx;
    this.ty = ty;
    // distance from starting point to target
    this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
    this.distanceTraveled = 0;
    // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 3;
    // populate initial coordinate collection with the current coordinates
    while( this.coordinateCount-- ) {
        this.coordinates.push( [ this.x, this.y ] );
    }
    this.angle = Math.atan2( ty - sy, tx - sx );
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random( 70, 90 );
    // circle target indicator radius
    this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function( index ) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift( [ this.x, this.y ] );

    // cycle the circle target indicator radius
    if( this.targetRadius < 8 ) {
        this.targetRadius += 0.3;
    } else {
        this.targetRadius = 1;
    }

    // speed up the firework
    this.speed *= this.acceleration;

    // get the current velocities based on angle and speed
    var vx = Math.cos( this.angle ) * this.speed,
        vy = Math.sin( this.angle ) * this.speed;
    // how far will the firework have traveled with velocities applied
    this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );

    // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
    if( this.distanceTraveled >= this.distanceToTarget ) {
        createParticles( this.tx, this.ty );
        // remove the firework, use the index passed into the update function to determine which to remove
        fireworks.splice( index, 1 );
    } else {
        // target not reached, keep traveling
        this.x += vx;
        this.y += vy;
    }
}

// draw firework
Firework.prototype.draw = function() {
    ctx.beginPath();
    // move to the last tracked coordinate in the set, then draw a line to the current x and y
    ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
    ctx.lineTo( this.x, this.y );
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
    ctx.stroke();

    ctx.beginPath();
    // draw the target for this firework with a pulsing circle
    ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
    ctx.stroke();
}

// create particle
function Particle( x, y ) {
    this.x = x;
    this.y = y;
    // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 5;
    while( this.coordinateCount-- ) {
        this.coordinates.push( [ this.x, this.y ] );
    }
    // set a random angle in all possible directions, in radians
    this.angle = random( 0, Math.PI * 2 );
    this.speed = random( 1, 10 );
    // friction will slow the particle down
    this.friction = 0.95;
    // gravity will be applied and pull the particle down
    this.gravity = 1;
    // set the hue to a random number +-20 of the overall hue variable
    this.hue = random( hue - 20, hue + 20 );
    this.brightness = random( 50, 80 );
    this.alpha = 1;
    // set how fast the particle fades out
    this.decay = random( 0.015, 0.03 );
}

// update particle
Particle.prototype.update = function( index ) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift( [ this.x, this.y ] );
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos( this.angle ) * this.speed;
    this.y += Math.sin( this.angle ) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;

    // remove the particle once the alpha is low enough, based on the passed in index
    if( this.alpha <= this.decay ) {
        particles.splice( index, 1 );
    }
}

// draw particle
Particle.prototype.draw = function() {
    ctx. beginPath();
    // move to the last tracked coordinates in the set, then draw a line to the current x and y
    ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
    ctx.lineTo( this.x, this.y );
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    ctx.stroke();
}

// create particle group/explosion
function createParticles( x, y ) {
    // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
    for (var i = 0; i < 190; i++) {
        particles.push( new Particle( x, y ) );
    }
}

//this launches the fireworks in the canvas, you can click to launch fireworks too
function launchFireworks()
{
    // increase the hue to get different colored fireworks over time
    hue += 0.5;

    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    ctx.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect( 0, 0, cw, ch );
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    ctx.globalCompositeOperation = 'lighter';

    // loop over each firework, draw it, update it
    var i = fireworks.length;
    while( i-- ) {
        fireworks[ i ].draw();
        fireworks[ i ].update( i );
    }

    // loop over each particle, draw it, update it
    var i = particles.length;
    while( i-- ) {
        particles[ i ].draw();
        particles[ i ].update( i );
    }

    // launch fireworks automatically to random coordinates, when the mouse isn't down
    if( timerTick >= timerTotal ) {
        if( !mousedown ) {
            // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
            fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
            timerTick = 0;
        }
    } else {
        timerTick++;
    }

    // limit the rate at which fireworks get launched when mouse is down
    if( limiterTick >= limiterTotal ) {
        if( mousedown ) {
            // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
            fireworks.push( new Firework( cw / 2, ch, mx, my ) );
            limiterTick = 0;
        }
    }
    else {
        limiterTick++;
    }
}

// mouse event bindings
// update the mouse coordinates on mousemove
canvas.addEventListener( 'mousemove', function( e ) {
    mx = e.pageX - canvas.offsetLeft;
    my = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener( 'mousedown', function( e ) {
    e.preventDefault();
    mousedown = true;
});

canvas.addEventListener( 'mouseup', function( e ) {
    e.preventDefault();
    mousedown = false;
});








