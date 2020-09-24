
$(document).ready(function(){

function checkWidth() {
  windowSize = $(window).width();
}
checkWidth();
$(window).resize(checkWidth);


var scene, camera;
var controls;
var geometry;
var material;
var renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mesh1, mesh2, mesh3, mesh4;

init();
animate();


function init() {

  //Scene
  scene = new THREE.Scene();

  //camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100000);
  camera.position.set( 0, 0, 6000 );

  scene.add(camera);

  //Light
  var ambientLight = new THREE.AmbientLight( 0xffffff, 2);
  scene.add(ambientLight);

  //Render
  renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setPixelRatio( window.devicePixelRatio );
  if (window.innerWidth > 950) {
    renderer.setSize( (window.innerWidth) - 0, (window.innerHeight) - 0 );
  } else {
    renderer.setSize( window.innerWidth, window.innerHeight);
  }
  document.getElementById('three-wrapper').appendChild( renderer.domElement );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  //Controls
  if (windowSize < 400) {
    controls = new THREE.DeviceOrientationControls( camera , renderer.domElement );
  } else {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5500;
    controls.maxDistance = 5500;
  }

  // Textures
  var textureLoader = new THREE.TextureLoader();
  textureEquirec1 = textureLoader.load( "/assets/textures/Mantra.jpg" );
  textureEquirec1.mapping = THREE.EquirectangularRefractionMapping;
  textureEquirec1.magFilter = THREE.LinearFilter;
  textureEquirec1.minFilter = THREE.LinearMipMapLinearFilter;
  textureEquirec1.encoding = THREE.sRGBEncoding;

  textureEquirec2 = textureLoader.load( "/assets/textures/Office.jpg" );
  textureEquirec2.mapping = THREE.EquirectangularRefractionMapping;
  textureEquirec2.magFilter = THREE.LinearFilter;
  textureEquirec2.minFilter = THREE.LinearMipMapLinearFilter;
  textureEquirec2.encoding = THREE.sRGBEncoding;




  //create Equirectangular shader
  var equirectShader = THREE.ShaderLib[ "equirect" ];
  var equirectMaterial = new THREE.ShaderMaterial( {
    fragmentShader: equirectShader.fragmentShader,
    vertexShader: equirectShader.vertexShader,
    uniforms: equirectShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  } );

  //create Equirectangular uniforms
  equirectMaterial.uniforms[ "tEquirect" ].value = textureEquirec1;
  Object.defineProperty( equirectMaterial, 'map', {
    get: function () {
      return this.uniforms.tEquirect.value;
    }
  } );

  //skybox
  skyBox = new THREE.Mesh( new THREE.BoxBufferGeometry( 100000, 100000, 100000 ), equirectMaterial );
  scene.add( skyBox );
  skyBox.material = equirectMaterial;
  skyBox.visible = true;

  //materials
  var screen1 = new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xffffff,
    envMap: textureEquirec1,
    refractionRatio: 0.8
  });
  var screen2 = new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xffffff,
    envMap: textureEquirec1,
    refractionRatio: 0.8
  });
  var screen3 = new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xffffff,
    envMap: textureEquirec1,
    refractionRatio: 0.8
  });
  var screen4 = new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xffffff,
    envMap: textureEquirec1,
    refractionRatio: 0.8
  });

  //load model
  var loader = new THREE.PLYLoader();
  loader.load( '/assets/models/ply/Monitor.ply', function ( geometry ) {
    geometry.center()
    createScene( geometry, screen1, screen2, screen3, screen4 );
  } );

  //rezise window
  window.addEventListener( 'resize', onWindowResize, false );

  $('#sceneButton').click(function(){
    if (!$('#sceneButton').hasClass('active')) {
      $('#sceneButton').addClass('active').html('Mantra');
        equirectMaterial.uniforms[ "tEquirect" ].value = textureEquirec2;
        screen1.envMap = textureEquirec2;
        screen2.envMap = textureEquirec2;
        screen3.envMap = textureEquirec2;
        screen4.envMap = textureEquirec2;
    } else {
      $('#sceneButton').removeClass('active').html('Office');
      equirectMaterial.uniforms[ "tEquirect" ].value = textureEquirec1;
      screen1.envMap = textureEquirec1;
      screen2.envMap = textureEquirec1;
      screen3.envMap = textureEquirec1;
      screen4.envMap = textureEquirec1;
    }
  });

  THREE.DefaultLoadingManager.onLoad = function (){
     $('#preloader').fadeOut(200);
     $('html,body').animate({scrollTop:0},0);
  };


  //end int
}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if (window.innerWidth > 950) {
    renderer.setSize( (window.innerWidth) - 120, (window.innerHeight) - 120 );
  } else {
    renderer.setSize( window.innerWidth, window.innerHeight);
  }
}

function createScene( geometry, m1, m2, m3, m4 ) {

  geometry.computeVertexNormals();

  var s =100;

  var pivotSphere = new THREE.SphereBufferGeometry( 1, 1, 1 );
  var pivotMesh = new THREE.Mesh( pivotSphere, new THREE.MeshBasicMaterial( {
    color: 0xffffff
  } ) );
  pivotMesh.position.set(0, 500, -6000);
  pivotMesh.rotation.x = Math.PI/10;
  camera.add( pivotMesh );


  mesh1 = new THREE.Mesh( geometry, m1 );
  mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = s;
  pivotMesh.add( mesh1 );

  mesh2 = new THREE.Mesh( geometry, m2 );
  mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = s;
  pivotMesh.add( mesh2 );

  mesh3 = new THREE.Mesh( geometry, m3 );
  mesh3.scale.x = mesh3.scale.y = mesh3.scale.z = s;
  pivotMesh.add( mesh3 );

  mesh4 = new THREE.Mesh( geometry, m4 );
  mesh4.scale.x = mesh4.scale.y = mesh4.scale.z = s;
  pivotMesh.add( mesh4 );

}

function animate(){
  if ( mesh1, mesh2, mesh3, mesh4 ) {
    var timer = - 0.0002 * Date.now();
    mesh1.position.x = 2000 * Math.cos( timer );
    mesh1.position.z = 2000 * Math.sin( timer );
    mesh1.position.y = -500 * Math.sin( timer );
    mesh2.position.x = -2000 * Math.cos( timer );
    mesh2.position.z = -2000 * Math.sin( timer );
    mesh2.position.y = 500 * Math.sin( timer );
    mesh3.position.x = -2000 * Math.sin( timer );
    mesh3.position.z = 2000 * Math.cos( timer );
    mesh3.position.y = -500 * Math.cos( timer );
    mesh4.position.x = 2000 * Math.sin( timer );
    mesh4.position.z = -2000 * Math.cos( timer );
    mesh4.position.y = 500 * Math.cos( timer );
    renderer.render( scene, camera );
  }

  controls.update();
  requestAnimationFrame(animate);
  render();
}

function render(){
  renderer.render( scene, camera );
}


});
