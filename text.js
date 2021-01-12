var camera, scene, renderer;

init();
animate();

function init()
{

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 50 );
    camera.position.z = 10;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff );
    


    var loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) 
    {
      var geometry = new THREE.TextGeometry( 'Welcome to the Scene', 
        {
            font: font,
            size: 0.5,
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
        scene.add( mesh );
    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    //
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function animate()
     {

        requestAnimationFrame( animate );
        renderer.render( scene, camera );

    }