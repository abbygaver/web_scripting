var canvas  = document.getElementById("renderCanvas3");
var engine = new BABYLON.Engine(canvas, true);

function createScene(canvas, engine){
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/3, 15*Math.PI/32, 6, BABYLON.Vector3.Zero(),scene);
    camera.attachControl(canvas, true);
    let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    let plane = BABYLON.MeshBuilder.CreatePlane("plane", {height: 2, width: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);

    var indices = plane.getIndices();

    var v;
    var verticesWithColor = new Set();
    var colors = [];
    for (var i = 0; i < indices.length / 3; i++){
        var color = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1);
        for (var j = 0; j < 3; j++){
            v = indices[3 * i + j];
            if (!verticesWithColor.has(v)) {
                verticesWithColor.add(v);
                colors[4 * v] = color.r;
                colors[4 * v + 1] = color.g;
                colors[4 * v + 2] = color.b;
                colors[4 * v + 3] = color.a;
            }
        }
    }

    plane.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);

    return scene;
}

var scene = createScene(canvas, engine);

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});