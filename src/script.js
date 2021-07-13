import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

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
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * House
 */

const house = new THREE.Group()
scene.add(house)

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
scene.add(tree)
const tree2 = tree.clone();
tree2.position.x = -12
scene.add(tree2)


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
scene.add(bush2)
scene.add(bush1)
for (let i = 0; i < 10; i++) {
    bush_jhar[i] = new THREE.Mesh(bushesGeometry, bushesMaterial)
    const angle = Math.random() * Math.PI * 3 - 2
    const distortion = Math.random() * 2 + 1
    const x = Math.sin(angle) * 4 * distortion
    const z = Math.cos(angle) * 4 * distortion
    bush_jhar[i].position.set(x * 2, .2, z * 2)
    bush_jhar[i].scale.set(4, 4, 4)
    scene.add(bush_jhar[i])

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

scene.add(wind_component)

//car
const geometry = new THREE.ConeGeometry(5, 20, 32);
const material = new THREE.MeshBasicMaterial({color: 0xffff00});

//rivers
const cylinder_1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(5, 5, 10, 50), new THREE.MeshBasicMaterial({color: "blue"}))
scene.add(cylinder_1)
cylinder_1.position.x = 35
cylinder_1.position.y = 0
cylinder_1.position.z = 16
cylinder_1.scale.set(.5, .5, .5)
cylinder_1.rotation.x = Math.PI * .5
cylinder_1.rotation.z = Math.PI * .5
const cylinder_river = []
for (let i = 0; i <24; i++) {
    cylinder_river[i] = cylinder_1.clone()
    if (i < 19) {
        cylinder_river[i].position.z =  i*3-18
    } else {
        cylinder_river[i].position.z =  - i*3+35
    }
    scene.add(cylinder_river[i])
}



/*const river_1 = new THREE.Mesh(new THREE.BoxBufferGeometry(3, .5, 4), new THREE.MeshStandardMaterial({color:'blue'}))
river_1.position.set(34,0,6)
river_1.scale.set(4,.5,4)
const river_2=river_1.clone()
river_2.position.z=12
scene.add(river_1)
scene.add(river_2)*/


/*cylinder_1.rotation.y=-1*Math.PI*.5
cylinder_1.rotation.x=Math.PI*.5*/


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
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
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
renderer.setClearColor('#B5EAEA',1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const clock = new THREE.Clock()
let temp = 0;
let count=0;
let current=0
const tick = () => {
    const elapsedTime = Math.ceil(clock.getElapsedTime())

    if (elapsedTime - temp > 0) {
        if (elapsedTime % 10 === 0) {
            console.log("Nice 5 secs")
            tree.scale.set(1.1, 1.1, 1.1)
        }
    }
    if(Math.floor(elapsedTime)-temp>0){
        temp=Math.floor(elapsedTime)

        cylinder_river[temp%23].position.y=Math.sin(elapsedTime)*.5
    }


    /**
     * Animate
     */


    // Update controls
    controls.update()

    // Render

    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()