var im_car_green;
var im_car_red;
var im_boom;
var im_heart;
var font;
var playerSpeed = 7;
var opponents = [];
var roadMarkings = [];
var score = 0;
var lives = 5;

function preload() {
    im_car_green = loadImage('assets/Car_Green.png');

    im_car_red = loadImage('assets/Car_Red.png');

    im_boom = loadImage('assets/boom.png');

    im_heart = loadImage('assets/heart.png');

    font = loadFont('assets/8-bit.ttf');
}

function setup() {

    createCanvas(600, 600);

    roadMarkings.push(new roadMarking());
    opponents.push(new Opponent());
    player = new Player();
}

function draw() {
    background(44, 44, 44);

    if (frameCount % 25 === 0) {
        roadMarkings.push(new roadMarking());
    }

    
    for (var i = roadMarkings.length - 1; i >= 0; i--) {
        roadMarkings[i].show();
        roadMarkings[i].update();

        
        if (roadMarkings[i].offscreen()) {
            roadMarkings.splice(i, 1);
        }
    }

    
    if (frameCount % 130 === 0) {
        opponents.push(new Opponent());
    }

    
    for (var i = opponents.length - 1; i >= 0; i--) {
        opponents[i].show();
        opponents[i].update();

        if (opponents[i].overtakenBy(player) && opponents[i].isOvertakenBy === false) {
            score += 5;
            opponents[i].isOvertakenBy = true;
        }

        
        if (opponents[i].hits(player)) {
            opponents[i].boom();
            opponents.splice(i, 1);

            
            score = (score >= 10) ? (score - 10) : 0;
            lives--;
        }
        
        else if (opponents[i].offscreen()) {
            opponents.splice(i, 1);
        }
    }

    
    player.show();

    
    if (keyIsDown(LEFT_ARROW)) {
        player.turnLeft();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.turnRight();
    }

    
    textSize(40);
    textFont(font);
    textAlign(LEFT);
    fill("yellow");
    text('Score: ' + score, 30, 60);

    for (var i = 0; i < lives; i++) {
        image(im_heart, 30 + (i * 70), height - 60);
    }

    if (score == 50) {
        noLoop();
        textSize(60);
        
        textStyle(BOLD);
        textAlign(CENTER);
        fill("yellow");
        text('You Won', width / 2, height / 2);

    }

    
    if (lives === 0) {
        noLoop();

        textSize(60);
        textStyle(BOLD);
        textAlign(CENTER);
        fill("yellow");
        text('GAME OVER', width / 2, height / 2);
    }
}