var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene(canvas, engine){
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
	let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 3, 3 * Math.PI / 8, 23, BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);
	let light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 50, 0));

    let mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = new BABYLON.Color3(0, 1, 0);
	
	let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 3}, scene);
    sphere.material = mat;

    sphere.setPositionWithLocalVector(new BABYLON.Vector3(2, 1, 0));

    let axis_origin = createLocalAxes(4, scene);
    axis_origin.parent = sphere;

    createAxis(8, scene);

	return scene;
};

function createLocalAxes(size, scene) {
    let [local_axisX, local_axisY, local_axisZ] = createAxis(size, scene);

    let origin = new BABYLON.TransformNode("origin");

    local_axisX.parent = origin;
    local_axisY.parent = origin;
    local_axisZ.parent = origin;

    return origin;
}

function createAxis(size, scene) {
    let makeTextPlane = function(text, color, size, camera, billboardMode) {
        let dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);

        let plane = new BABYLON.MeshBuilder.CreatePlane("TextPlane", {size: size, updatable: true}, scene);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane.material.diffuseTexture = dynamicTexture;
        plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        return plane;
    };

    let axisX = BABYLON.Mesh.CreateLines("axisX", [
        new BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);

    let xChar = makeTextPlane("X", "red", size / 8);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    xChar.parent = axisX;

    let axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
    ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);

    let yChar = makeTextPlane("Y", "green", size / 8);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    yChar.parent = axisY;

    let axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        new BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);

    let zChar = makeTextPlane("Z", "blue", size / 8);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    zChar.parent = axisZ;

    return [axisX, axisY, axisZ];
}

var scene = createScene(canvas, engine);

engine.runRenderLoop(function(){
    scene.render();
});

window.addEventListener("resize", function(){
    engine.resize();
});


