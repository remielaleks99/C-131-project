img = "";
objects = [];
stat = "";
function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    stat = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function preload(){
    img = loadImage("bedroom.jpg");
}
function draw(){
    image(img, 0, 0, 600, 400);
    if(stat != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    
    
}