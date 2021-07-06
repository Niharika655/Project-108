prediction1 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capturedImage' src='" + data_uri + "'>";
    })
}
console.log("ml5 version : ", ml5.version);
classfier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/mpREQhuyJ/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData = "The Prediction Is " + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function check(){
    img= document.getElementById("capturedImage");
    classfier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            prediction1 = results[0].label;
            speak();
            if(results[0].label=="Amazing"){
                    document.getElementById("update_emogi").innerHTML = "&#128076;"; 
                }
            if(results[0].label=="Best"){
                    document.getElementById("update_emogi").innerHTML = "&#128077;"; 
                }
            if(results[0].label=="Victory"){
                    document.getElementById("update_emogi").innerHTML = "&#9996;"; 
                }
            if(results[0].label=="Raised Hand"){
                    document.getElementById("update_emogi").innerHTML = "&#9995;"; 
                }
            if(results[0].label=="Raised Fist"){
                    document.getElementById("update_emogi").innerHTML = "&#9994"; 
                }
    }

}