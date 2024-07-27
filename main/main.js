const firebaseConfig = {
    apiKey: "AIzaSyDczxCZJxpaY-Clph8mpTOaSdLAmP_O8tc",
    authDomain: "plantio-9dfc4.firebaseapp.com",
    databaseURL: "https://plantio-9dfc4-default-rtdb.firebaseio.com",
    projectId: "plantio-9dfc4",
    storageBucket: "plantio-9dfc4.appspot.com",
    messagingSenderId: "1005503248557",
    appId: "1:1005503248557:web:237e06b3309dd53c756e24",
    measurementId: "G-58TXGRQ5Z5"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function writeUserData(userId, value) {
    database.ref(userId).set({
        light: value,
    });
}

function readUserData(userId) {
    const dbRef = firebase.database().ref();
    dbRef.child("users").child(userId).get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


var val = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    
}



function draw() {
    background(255);
}


function change() {
    writeUserData('/', !val);
}


let timer = setInterval(function () {
    database.ref("/light").once('value', function (snapshot) {
        var data = snapshot.val();
        changeUI(snapshot.val());
        console.log(data);
        document.getElementById('light_state').innerHTML = 'Light State : ' + !data;
    });
}, 1000);


function changeUI(flag) {
    val = flag;
}