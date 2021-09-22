var canvas = document.getElementById("renderCanvas2");
var engine = new BABYLON.Engine(canvas, true);

function createScene(canvas, engine){
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/2, 6, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    let light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 1), scene);

    let box = BABYLON.MeshBuilder.CreateBox("box", scene);

    let mat = new BABYLON.StandardMaterial("mat", scene);
    mat.emissiveColor = new BABYLON.Color3(0, 1, 0);
    box.material = mat;

    let direction = 1;
    let i = 0;

    scene.registerAfterRender(function () {
        let box = scene.getMeshByName("box");
        let pos = box.position.y;
        if (pos < -1 || pos > 1){
            direction = direction * -1;
        }
        let delta = direction * 0.01;

        box.position.y += delta;
    });

    return scene;
}

var scene = createScene(canvas, engine);

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function() {
    engine.resize();
});