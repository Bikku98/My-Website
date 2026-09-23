/* =====================================================
   TYPEMASTER
   ===================================================== */


/* ================= MENU ================= */

function openPage(pageId, button) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



/* =====================================================
   SPEED TEST
   ===================================================== */

const speedSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Learning to type fast requires patience and practice.",
    "Practice every day to improve your typing speed.",
    "Web design is a creative and useful skill to learn.",
    "Focus on accuracy first and speed will follow.",
    "Technology gives us many opportunities to learn.",
    "Never stop learning new skills and improving yourself.",
    "Good typing skills can save a lot of time."
];

let speedTimeLimit = 15;
let speedTimeLeft = 15;
let speedStarted = false;
let speedFinished = false;
let speedTimer = null;
let speedStartTime = 0;
let speedTotal = 0;
let speedCorrect = 0;

let currentSentence = "";


const speedInput = document.getElementById("speedInput");


function randomSentence() {

    return speedSentences[
        Math.floor(Math.random() * speedSentences.length)
    ];

}


function restartSpeedTest() {

    clearInterval(speedTimer);

    speedTimeLeft = speedTimeLimit;

    speedStarted = false;

    speedFinished = false;

    speedStartTime = 0;

    speedTotal = 0;

    speedCorrect = 0;

    currentSentence = randomSentence();

    document.getElementById("speedText").textContent =
        currentSentence;

    speedInput.value = "";

    speedInput.disabled = false;

    document.getElementById("speedTime").textContent =
        speedTimeLeft;

    document.getElementById("speedWpm").textContent =
        "0";

    document.getElementById("speedAccuracy").textContent =
        "100%";

    document.getElementById("speedResult")
        .classList.add("hidden");

    speedInput.focus();

}


function changeTime(seconds, button) {

    speedTimeLimit = seconds;

    document.querySelectorAll(".setting").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    restartSpeedTest();

}


function startSpeedTest() {

    if (speedStarted) return;

    speedStarted = true;

    speedStartTime = Date.now();

    speedTimer = setInterval(() => {

        speedTimeLeft--;

        document.getElementById("speedTime").textContent =
            speedTimeLeft;

        calculateSpeed();

        if (speedTimeLeft <= 0) {
            finishSpeedTest();
        }

    }, 1000);

}


speedInput.addEventListener("input", () => {

    if (speedFinished) return;

    if (!speedStarted) {
        startSpeedTest();
    }

    const typed = speedInput.value;

    speedTotal = typed.length;

    speedCorrect = 0;

    for (
        let i = 0;
        i < typed.length && i < currentSentence.length;
        i++
    ) {

        if (typed[i] === currentSentence[i]) {
            speedCorrect++;
        }

    }

    calculateSpeed();


    /* Sentence completed */

    if (typed.length >= currentSentence.length) {

        currentSentence = randomSentence();

        document.getElementById("speedText").textContent =
            currentSentence;

        speedInput.value = "";

    }

});


function calculateSpeed() {

    if (!speedStarted) return;

    const elapsed =
        (Date.now() - speedStartTime) / 1000;

    if (elapsed <= 0) return;

    const minutes = elapsed / 60;

    const wpm =
        Math.round((speedCorrect / 5) / minutes);

    let accuracy = 100;

    if (speedTotal > 0) {

        accuracy =
            Math.round(
                (speedCorrect / speedTotal) * 100
            );

    }

    document.getElementById("speedWpm").textContent =
        isFinite(wpm) ? wpm : 0;

    document.getElementById("speedAccuracy").textContent =
        accuracy + "%";

}


function finishSpeedTest() {

    clearInterval(speedTimer);

    speedFinished = true;

    speedInput.disabled = true;

    calculateSpeed();

    document.getElementById("finalWpm").textContent =
        document.getElementById("speedWpm").textContent;

    document.getElementById("finalAccuracy").textContent =
        document.getElementById("speedAccuracy").textContent;

    document.getElementById("finalChars").textContent =
        speedTotal;

    document.getElementById("speedResult")
        .classList.remove("hidden");

}



/* =====================================================
   LEARN / LEVEL PRACTICE
   ===================================================== */

const levels = {

    easy: [
        "cat dog sun pen book",
        "red blue car tree fish",
        "one two three four five",
        "apple ball house mouse",
        "good nice easy simple"
    ],

    normal: [
        "Learning typing takes daily practice",
        "Practice makes your typing speed better",
        "Keep your fingers on the home row",
        "Focus on accuracy before increasing speed",
        "Good typing saves time every day"
    ],

    hard: [
        "Web development requires creativity and patience",
        "JavaScript makes websites interactive and powerful",
        "Consistency is more important than temporary motivation",
        "A professional developer practices coding every single day",
        "Learning new technology opens many opportunities"
    ]

};

let selectedLevel = "easy";

let practiceIndex = 0;

let completed = 0;

let practiceTotal = 0;

let practiceCorrect = 0;


function selectLevel(level, button) {

    selectedLevel = level;

    document.querySelectorAll(".level").forEach(btn => {
        btn.classList.remove("active-level");
    });

    button.classList.add("active-level");

    practiceIndex = 0;

    completed = 0;

    practiceTotal = 0;

    practiceCorrect = 0;

    document.getElementById("levelName").textContent =
        level.toUpperCase();

    document.getElementById("practiceText").textContent =
        levels[level][practiceIndex];

    document.getElementById("practiceInput").value = "";

    document.getElementById("completedWords").textContent =
        "0";

    document.getElementById("practiceAccuracy").textContent =
        "100%";

    document.getElementById("practiceInput").focus();

}


const practiceInput =
    document.getElementById("practiceInput");


practiceInput.addEventListener("input", () => {

    const typed = practiceInput.value;

    const target =
        levels[selectedLevel][practiceIndex];

    practiceTotal = typed.length;

    practiceCorrect = 0;

    for (
        let i = 0;
        i < typed.length && i < target.length;
        i++
    ) {

        if (typed[i] === target[i]) {
            practiceCorrect++;
        }

    }

    let accuracy = 100;

    if (practiceTotal > 0) {

        accuracy =
            Math.round(
                (practiceCorrect / practiceTotal) * 100
            );

    }

    document.getElementById("practiceAccuracy").textContent =
        accuracy + "%";


    /* Completed */

    if (typed === target) {

        completed++;

        document.getElementById("completedWords").textContent =
            completed;

        practiceIndex++;

        if (practiceIndex >= levels[selectedLevel].length) {

            alert(
                "🎉 Great job! You completed the " +
                selectedLevel +
                " practice."
            );

            practiceIndex = 0;

        }

        document.getElementById("practiceText").textContent =
            levels[selectedLevel][practiceIndex];

        practiceInput.value = "";

    }

});


function restartPractice() {

    practiceIndex = 0;

    completed = 0;

    practiceTotal = 0;

    practiceCorrect = 0;

    document.getElementById("practiceText").textContent =
        levels[selectedLevel][practiceIndex];

    practiceInput.value = "";

    document.getElementById("completedWords").textContent =
        "0";

    document.getElementById("practiceAccuracy").textContent =
        "100%";

    practiceInput.focus();

}



/* =====================================================
   WORD PRACTICE
   ===================================================== */

const words = [
    
    "computer",
    "Birendra",
    "Anup",
    "Rojish",
    "keyboard",
    "website",
    "9it",
    "programming",
    "javascript",
    "internet",
    "developer",
    "coding",
    "school",
    "student",
    "practice",
    "typing",
    "speed",
    "accuracy",
    "technology",
    "creative",
    "learning",
    "future",
    "design",
    "master",
    "birendra"
    
];

let wordIndex = 0;

let correctWords = 0;

let wrongWords = 0;


const wordInput =
    document.getElementById("wordInput");


function restartWordPractice() {

    wordIndex = 0;

    correctWords = 0;

    wrongWords = 0;

    document.getElementById("wordNumber").textContent =
        "1";

    document.getElementById("currentWord").textContent =
        words[0];

    document.getElementById("correctWords").textContent =
        "0";

    document.getElementById("wrongWords").textContent =
        "0";

    document.getElementById("wordStatus").textContent =
        "Start typing...";

    wordInput.value = "";

    wordInput.disabled = false;

    wordInput.focus();

}


wordInput.addEventListener("input", () => {

    const typed = wordInput.value;

    const target = words[wordIndex];


    /* Correct */

    if (typed === target) {

        correctWords++;

        document.getElementById("correctWords").textContent =
            correctWords;

        wordIndex++;


        /* All words finished */

        if (wordIndex >= words.length) {

            document.getElementById("currentWord").textContent =
                "🎉 COMPLETE!";

            document.getElementById("wordStatus").textContent =
                "You completed all 20 words!";

            wordInput.disabled = true;

            return;

        }


        /* Next word */

        document.getElementById("currentWord").textContent =
            words[wordIndex];

        document.getElementById("wordNumber").textContent =
            wordIndex + 1;

        document.getElementById("wordStatus").textContent =
            "✓ Correct! Next word";

        wordInput.value = "";

    }

    else if (
        typed.length > 0 &&
        !target.startsWith(typed)
    ) {

        document.getElementById("wordStatus").textContent =
            "✗ Check the spelling";

    }

    else {

        document.getElementById("wordStatus").textContent =
            "Typing...";

    }

});


/* INITIAL */

restartSpeedTest();

selectLevel(
    "easy",
    document.querySelector(".level")
);

restartWordPractice();