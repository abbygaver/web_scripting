var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene(canvas, engine){
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 15, BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    let light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 50, 0));

    let front = new BABYLON.Vector4(0, 0, 1, 1);
    let back = new BABYLON.Vector4(0, 0, 1, 1);

    let mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/ground.jpg", scene);

    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 25, height: 25});
    ground.material = mat;
    ground.position.y = -2

    let mat1 = new BABYLON.StandardMaterial("mat1", scene);
    mat1.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/crate.png", scene);

    let crate = BABYLON.MeshBuilder.CreateBox("crate", {size: 5}, scene)
    crate.material = mat1;
    crate.position.y = 0.5;

    let mat2 = new BABYLON.StandardMaterial("mat2", scene);
    mat2.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/lava/lavatile.jpg", scene);
    mat2.diffuseColor = new BABYLON.Color3(1, 0, 0);

    let frontc = new BABYLON.Vector4(0, 0, 0, 0);
    let backc = new BABYLON.Vector4(0, 0, 1, 1);

    let myPath = [
        new BABYLON.Vector3(0, -.75, 0),
        new BABYLON.Vector3(0, -0.5, 0),
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0.5, 0),
        new BABYLON.Vector3(0, .75, 0)
    ];

    let can = new BABYLON.MeshBuilder.CreateTube("can", {path: myPath, sideOrientation: BABYLON.Mesh.DOUBLESIDE, cap: BABYLON.Mesh.CAP_START, radius: 0.5, frontUVs: frontc, backUVs: backc}, scene);
    can.material = mat2;
    can.position.y = 3.77;
    can.position.x = -1;
    can.position.z = -1;

    let mat3 = new BABYLON.StandardMaterial("mat2", scene);
    mat3.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/waterbump.png", scene);

    let napkin = new BABYLON.MeshBuilder.CreateGround("napkin", {width: 1.5, height: 1.5}, scene);
    napkin.material = mat3;
    napkin.position.y = 3.05;
    napkin.position.z = 0.3;
    napkin.position.x = 0.2;

    let mat4 = new BABYLON.StandardMaterial("mat2", scene);
    mat4.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/sand.jpg", scene);

    let donut = new BABYLON.MeshBuilder.CreateTorus("donut", {}, scene);
    donut.material = mat4;
    donut.position.y = 3.15;
    donut.position.z = 0.3;
    donut.position.x = 0.2;

    let fronts = new BABYLON.Vector4(0, 0, 1, 1);
    let backs = new BABYLON.Vector4(0, 0, 1, 1);

    return scene;
};

var scene = createScene(canvas, engine);

engine.runRenderLoop(function(){
    scene.render();
});

window.addEventListener("resize", function(){
    engine.resize();
});