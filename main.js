var paradise="";
var sjlt="";
leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload()
{
    paradise=loadSound("Paradise.mp3");
    sjlt=loadSound("song.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
   if(results.length>0)
   {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("Left Wrist X: "+leftWristX
        +" Left Wrist Y: "+leftWristY
        +" Right Wrist X: "+rightWristX
        +" Right Wrist Y: "+rightWristY);
        console.log("Confidence of left wrist: "+scoreleftWrist);
        console.log("Confidence of right wrist: "+scorerightWrist);
   }
}

function draw()
{
    image(video,0,0,600,500); 
    var song1status=paradise.isPlaying();
    fill("red");
    stroke("black");
    

    if(scoreleftWrist>0.2)
    {
        circle(leftWristX,leftWristY,30);
        sjlt.stop();

        if(song1status="false")
        {
            paradise.play();
            document.getElementById("song_status").innerHTML="Paradise is playing";
        }
    }

    var song2status=sjlt.isPlaying();
    fill("red");
    stroke("black");
    

    if(scoreleftWrist>0.2)
    {
        circle(rightWristX,rightWristY,30);
        paradise.stop();

        if(song2status="false")
        {
            sjlt.play();
            document.getElementById("song_status").innerHTML="Something just like this is playing";
        }
    }
}

