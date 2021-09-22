var canvas = document.getElementById("renderCanvas1");
var engine = new BABYLON.Engine(canvas, true);

function createScene(canvas, engine){
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, -Math.PI, 32, BABYLON.Vector3.Zero(),scene);
    camera.attachControl(canvas, true);
    let light1 = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, 0, 1), scene);

    let positions = [
        10, 10, 0,      // (x,y,z) for vertex 0
        -10, 10, 10,     // (x,y,z) for vertex 1
        -10, -10, 0,    // (x,y,z) for vertex 2
        10, 10, -10      // (x,y,z) for vertex 3
    ];

    let indices = [
        0, 1, 2,        // facet 0
        2, 3, 0         // facet 1
    ];

    let colors = [
        1, 0, 0, 1,     // red for vertex 0
        1, 0, 0, 1,     // red for vertex 1
        0, 0, 1, 1,     // red for vertex 2
        0, 1, 0, 1      // green for vertex 3
    ];

    let normals = [
        0, 0, -1,     // <0,0,-1> for vertex 0
        0, 0, -1,     // <0,0,-1> for vertex 1
        0, 0, -1,     // <0,0,-1> for vertex 2
        0, 0, -1      // <0,0,-1> for vertex 3
    ];

    let vertexData = new BABYLON.VertexData();
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.colors = colors;
    vertexData.normals = normals;

    let customMesh = new BABYLON.Mesh("custom", scene);
    vertexData.applyToMesh(customMesh);

    customMesh.material = new BABYLON.StandardMaterial('mat', scene);
    customMesh.material.specularColor = new BABYLON.Color3(0, 0, 0);

    return scene;
}



var scene = createScene(canvas, engine);

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});