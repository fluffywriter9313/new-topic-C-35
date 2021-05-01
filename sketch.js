var entity;
var database,position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    entity = createSprite(121,212,10,10);
    entity.shapeColor = "green";

    var entityPositiion = database.ref('ball/position');
    entityPositiion.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}

function readPosition(data){
    position = data.val();
    entity.x = position.x;
    entity.y = position.y;
}

function showError(){
    console.log("error in writting to the database");
}