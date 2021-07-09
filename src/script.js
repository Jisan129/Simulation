import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(30, 30),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * House
 */
const house =new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(new THREE.BoxBufferGeometry(3,2,4),new THREE.MeshStandardMaterial({color:'red'}))
walls.position.y=1
house.add(walls)

//Roof
const roof = new THREE.Mesh(new THREE.ConeGeometry(3,1,4),new THREE.MeshStandardMaterial({color:'green'}))
roof.position.y=2.5
roof.rotation.y=Math.PI*.25
house.add(roof)

const door=new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1.5),new THREE.MeshStandardMaterial({color:'blue'}))
door.position.z=2+.005
door.position.y=1-.3
house.add(door)
house.scale.set(2,2,2)






const tree=new THREE.Group()
const body=new THREE.Mesh(new THREE.CylinderBufferGeometry(1,1,10,8),new THREE.MeshBasicMaterial({color:'#4F0E0E'}))
const leaf=new THREE.Mesh(new THREE.SphereBufferGeometry(4,32,32),new THREE.MeshBasicMaterial({color:'green'}))
leaf.position.y=10
body.position.y=5
tree.add(leaf)
tree.add(body)
tree.position.x=12
tree.scale.set(.5,.5,.5)
scene.add(tree)
const tree2=tree.clone();
tree2.position.x=-12
scene.add(tree2)








//bushes
const bush_jhar=[]
const bushesGeometry = new THREE.SphereBufferGeometry(.5,32,32)
const bushesMaterial = new THREE.MeshStandardMaterial({color: '#4AA96C'})
const bush1=new THREE.Mesh(bushesGeometry,bushesMaterial)
const bush2=new THREE.Mesh(bushesGeometry,bushesMaterial)
bush1.position.set(2,.2,.2)
bush1.scale.set(1,1,1)
bush2.position.set(2,.2,1)
bush2.scale.set(.5,.5,.5)
scene.add(bush2)
scene.add(bush1)
for (let i = 0; i < 10; i++) {
    bush_jhar[i]=new THREE.Mesh(bushesGeometry,bushesMaterial)
    const  angle=Math.random()*Math.PI*3-2
    const distortion=Math.random()*2+1
    const x=Math.sin(angle)*4*distortion
    const z=Math.cos(angle)*4*distortion
    bush_jhar[i].position.set(x,.2,z)
    scene.add(bush_jhar[i])

}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)
//c
// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()