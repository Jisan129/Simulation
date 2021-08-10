import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { ShaderLib as moonLightlight} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorText = textureLoader.load('/textures/door/color.jpg')
const brickText = textureLoader.load('/textures/bricks/color.jpg')
const roofText = textureLoader.load('/textures/bricks/roughness.jpg')
const grassText = textureLoader.load('/textures/grass/color.jpg')

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(80, 80),
    new THREE.MeshStandardMaterial({color: 'green'})
)
floor.receiveShadow = true
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * House
 */
console.log("No")
const loader=new GLTFLoader()
loader.load('/models/Fox/glTF/Fox.gltf',(gltf)=>{
    console.log(gltf)
    gltf.scene.children[0].scale.set(.25,.25,.25)
    //scene.add(gltf.scene.children[0])
})


const objLoader=new OBJLoader()
const mtlLoader=new MTLLoader()
mtlLoader.load('/models/Tree/tree_texture.mtl',(mtl)=>{
    mtl.preload();
    objLoader.setMaterials(mtl)
    objLoader.load('/models/Tree/tree.obj',(root)=>{
        scene.add(root)
    })
})

const house = new THREE.Group()
/*
scene.add(house)
*/

//walls
const walls = new THREE.Mesh(new THREE.BoxBufferGeometry(3, 2, 4), new THREE.MeshStandardMaterial({map: brickText}))
walls.position.y = 1
house.add(walls)

//Roof
const roof = new THREE.Mesh(new THREE.ConeGeometry(3, 1, 4), new THREE.MeshStandardMaterial({map: roofText}))
roof.position.y = 2.5
roof.rotation.y = Math.PI * .25
house.add(roof)

const door = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1.5), new THREE.MeshStandardMaterial({map: doorText}))
door.position.z = 2 + .005
door.position.y = 1 - .3
house.add(door)
house.scale.set(4, 4, 4)


const tree = new THREE.Group()
const body = new THREE.Mesh(new THREE.CylinderBufferGeometry(1, 1, 10, 8), new THREE.MeshBasicMaterial({color: '#4F0E0E'}))
const leaf = new THREE.Mesh(new THREE.SphereBufferGeometry(4, 32, 32), new THREE.MeshBasicMaterial({color: 'green'}))
leaf.position.y = 10
body.position.y = 5
tree.add(leaf)
tree.add(body)
tree.position.x = 12
tree.scale.set(1, 1, 1)
//scene.add(tree)
const tree2 = tree.clone();
tree2.position.x = -12
//scene.add(tree2)

//bushes
const bush_jhar = []
const bushesGeometry = new THREE.SphereBufferGeometry(.5, 32, 32)
const bushesMaterial = new THREE.MeshStandardMaterial({color: '#4AA96C'})
const bush1 = new THREE.Mesh(bushesGeometry, bushesMaterial)
const bush2 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bush1.position.set(2, .2, .2)
bush1.scale.set(1, 1, 1)
bush2.position.set(2, .2, 1)
bush2.scale.set(.5, .5, .5)
//scene.add(bush2)
//scene.add(bush1)
for (let i = 0; i < 10; i++) {
    bush_jhar[i] = new THREE.Mesh(bushesGeometry, bushesMaterial)
    const angle = Math.random() * Math.PI * 3 - 2
    const distortion = Math.random() * 2 + 1
    const x = Math.sin(angle) * 4 * distortion
    const z = Math.cos(angle) * 4 * distortion
    bush_jhar[i].position.set(x * 2, .2, z * 2)
    bush_jhar[i].scale.set(4, 4, 4)
    //scene.add(bush_jhar[i])

}


//Wind turbine
const windTurbine = new THREE.Group()
const bodyTurbine = new THREE.Mesh(new THREE.CylinderBufferGeometry(.5, 2, 20, 8), new THREE.MeshBasicMaterial({color: '#A0937D'}))
windTurbine.add(bodyTurbine)
windTurbine.position.z = 15
windTurbine.position.y = 8
windTurbine.position.x = -15
windTurbine.scale.set(1, .8, 1)

scene.add(windTurbine)

const wind_component = new THREE.Group()
const windFan = new THREE.Mesh(new THREE.ConeGeometry(2, 6, 3), new THREE.MeshBasicMaterial({color: '#4F0E0E'}))
windFan.position.y = 9
windFan.position.z = 10.5
const windFan2 = windFan.clone()
windFan2.position.y = 6
windFan2.position.z = 14

windFan2.rotation.x = Math.PI * .5
const windFan3 = windFan2.clone()
windFan3.rotation.z = (Math.PI)
windFan3.rotation.y = -2
windFan3.position.z = 8
wind_component.add(windFan, windFan3, windFan2)
wind_component.position.set(-15, 11, 4)
wind_component.rotation.y = Math.PI * .5
wind_component.position.z = 15
wind_component.position.x = -26
wind_component.castShadow = true

scene.add(wind_component)

//car
const geometry = new THREE.ConeGeometry(5, 20, 32);
const material = new THREE.MeshBasicMaterial({color: 0xffff00});

/*
    scene.add(cylinder_river[i])
*//*function TreePosition(pTree, pTreeBody) {
    pTree.position.y=20
    pTree.position.x=30
    pTree.position.z=30
    pTreeBody.Position.x=30
    pTreeBody.Position.y=0
    pTreeBody.Position.z=30

    scene.add(pTree)
    scene.add(pTreeBody)
}*/

// Project Tree
const pTree=new THREE.Mesh(new THREE.DodecahedronGeometry(3,0),new THREE.MeshBasicMaterial({color:'green'}))
const pTree2=new THREE.Mesh(new THREE.TetrahedronGeometry(2,1),new THREE.MeshBasicMaterial({color:'green'}))
const pTreeBody = new THREE.Mesh(new THREE.CylinderBufferGeometry(.5, .5, 10, 8), new THREE.MeshBasicMaterial({color: '#4F0E0E'}))
const pTreeBody2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,.5,10,8),new THREE.MeshBasicMaterial({color: '#4F0E0E'}))
const pTreeBranch=new THREE.Mesh(new THREE.CylinderBufferGeometry(.08,.1,2,8),new THREE.MeshBasicMaterial({color:'#4F0E0E'}))

pTree.position.y=11
pTree.position.x=30
pTree.position.z=30
pTree2.position.y=11
pTree2.position.x=25
pTree2.position.z=30
pTreeBody.position.x=30
pTreeBody.position.y=5
pTreeBody.position.z=30
pTreeBody2.position.x=24
pTreeBody2.position.y=5
pTreeBody2.position.z=30
pTreeBranch.position.x=23.2
pTreeBranch.position.y=10
pTreeBranch.position.z=30
pTreeBranch.rotation.z=.7

scene.add(pTreeBody2)

scene.add(pTree)
scene.add(pTreeBody)
scene.add(pTreeBranch)
scene.add(pTree2)
/*
TreePosition(pTree2,pTreebody)
*/

//hills
const hill_1 = new THREE.Mesh(new THREE.ConeGeometry(5, 9, 10, 12, false, 4, 6.5)
    , new THREE.MeshBasicMaterial({color: "#BB8760"}))
hill_1.position.y = 15
hill_1.position.x = -15
hill_1.position.z = -25
hill_1.scale.set(5, 5, 5)
//scene.add(hill_1)


//cars
const car = new THREE.Group()
//scene.add(car)
const carBody = new THREE.Mesh(new THREE.BoxBufferGeometry(6, 2, 2), new THREE.MeshBasicMaterial({color: 'red'}))
carBody.position.set(0, 3, 35)
car.add(carBody)
const wheel = new THREE.Mesh(new THREE.CylinderBufferGeometry(2, 2, 2), new THREE.MeshBasicMaterial({color: '#2C2E43'}))
wheel.scale.set(.5, .5, .5)
wheel.rotation.z = Math.PI * .5
wheel.rotation.y = Math.PI * .5
wheel.position.set(1.5, 2, 36)
const wheel4 = wheel.clone()
wheel4.position.z = 34
const wheel2 = wheel.clone()
wheel2.position.x = -1.5
const wheel3 = wheel2.clone()
wheel3.position.z = 34
car.add(wheel)
car.add(wheel3)
car.add(wheel2)
car.add(wheel4)
car.position.y = -1

//road
const road = new THREE.Mesh(new THREE.BoxBufferGeometry(78, .5, 5), new THREE.MeshBasicMaterial({color: '#F1ECC3'}))
road.position.z = 35
road.position.x = -4
//scene.add(road)




/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)

scene.add(ambientLight)

//c
// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 1)
moonLight.position.set(4, 5, 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
moonLight.shadow.mapSize.width = 512; // default
moonLight.shadow.mapSize.height = 512; // default
moonLight.shadow.camera.near = 0.5; // default
moonLight.shadow.camera.far = 500; // default

moonLight.castShadow = true
scene.add(moonLight)

const doorLight = new THREE.PointLight('red', 10, 9)
doorLight.position.set(0, 2, 1.4)
house.add(doorLight)
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor('#B5EAEA', 1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap;


const clock = new THREE.Clock()
let temp = 0;
let count = 0;
let current = 0
let number=0
const tick = () => {
    const elapsedTime = Math.ceil(clock.getElapsedTime())

    if (elapsedTime - temp > 0) {
        if (elapsedTime % 10 === 0) {
            console.log("Nice 5 secs")
            tree.scale.set(1.1, 1.1, 1.1)
        }
    }


    car.position.x = Math.sin(elapsedTime) * 20

    controls.update()

    // Render

    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()