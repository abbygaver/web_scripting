var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene(canvas, engine){
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    let light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 25, 20));

    let mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = new BABYLON.Color3(0.9, 0.75, 0.70);

    //head
    let head = BABYLON.MeshBuilder.CreateSphere("head", {diameterZ: 3.5, diameterY: 3.5, diameterX: 4}, scene);
    head.material = mat;

    //facial features
    //eyes
    let mat1 = new BABYLON.StandardMaterial("mat1", scene);
    mat1.diffuseColor = new BABYLON.Color3.White();

    let eye1 = BABYLON.MeshBuilder.CreateSphere("eye1", {diameter: 0.5}, scene);
    eye1.position.x = 0.8;
    eye1.position.y = 0.2;
    eye1.position.z = 1.55;
    eye1.material = mat1;

    let eye2 = BABYLON.MeshBuilder.CreateSphere("eye2", {diameter: 0.5}, scene);
    eye2.position.x = -0.8;
    eye2.position.y = 0.2;
    eye2.position.z = 1.55;
    eye2.material = mat1;

    let mat2 = new BABYLON.StandardMaterial("mat2", scene);
    mat2.diffuseColor = new BABYLON.Color3.Blue();

    let pupil1 = BABYLON.MeshBuilder.CreateSphere("pupil1", {diameter: 0.25}, scene);
    pupil1.position.x = 0.7;
    pupil1.position.y = 0.25;
    pupil1.position.z = 1.75;
    pupil1.material = mat2;

    let pupil2 = BABYLON.MeshBuilder.CreateSphere("pupil2", {diameter: 0.25}, scene);
    pupil2.position.x = -0.9;
    pupil2.position.y = 0.25;
    pupil2.position.z = 1.75;
    pupil2.material = mat2;

    //nose
    let mat3 = new BABYLON.StandardMaterial("mat3", scene);
    mat3.diffuseColor = new BABYLON.Color3(0.99, 0.75, 0.70);

    let nose = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 0.5}, scene);
    nose.position.y = 0.1;
    nose.position.z = 1.65;
    nose.material = mat3;

    //mouth
    let points = [new BABYLON.Vector3(-0.25, -0.5, 1.7),
        new BABYLON.Vector3(0, -0.55, 1.7),
        new BABYLON.Vector3(0.25, -0.5, 1.7)];

    let line = BABYLON.MeshBuilder.CreateLines("line", {points: points}, scene);
    line.color = new BABYLON.Color3(0.99, 0.75, 0.9);

    //hair
    let mat4 = new BABYLON.StandardMaterial("mat3", scene);
    mat4.diffuseColor = new BABYLON.Color3(0.75, 0.5, 0.55);

    let hair1 = BABYLON.MeshBuilder.CreateSphere("hair1", {diameter: 2}, scene);
    hair1.position.x = 0.5;
    hair1.position.y = 1.75;
    hair1.position.z = 1;
    hair1.material = mat4;

    let hair2 = BABYLON.MeshBuilder.CreateSphere("hair2", {diameter: 1.5}, scene);
    hair2.position.x = -.75;
    hair2.position.y = 1.5;
    hair2.position.z = 0.75;
    hair2.material = mat4;

    let hair3 = BABYLON.MeshBuilder.CreateSphere("hair3", {diameter: 1.5}, scene);
    hair3.position.x = 1.5;
    hair3.position.y = 1.3;
    hair3.position.z = 0.7;
    hair3.material = mat4;

    let hair4 = BABYLON.MeshBuilder.CreateSphere("hair4", {diameter: 1.5}, scene);
    hair4.position.x = -1.75;
    hair4.position.y = 1.1;
    hair4.position.z = 0.7;
    hair4.material = mat4;

    return scene;
};

var scene = createScene(canvas, engine);

engine.runRenderLoop(function(){
    scene.render();
});

window.addEventListener("resize", function(){
    engine.resize();
});