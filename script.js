
const questions = [
    {
        question: "Woher stammt der Blaue Pfau ursprünglich?",
        answers: ["Südamerika", "Südasien", "Australien", "Nordeuropa"],
        correct: 1,
        explanation: "Der Blaue Pfau stammt ursprünglich aus Indien und Sri Lanka."
    },
    {
        question: "Wie heisst der Blaue Pfau wissenschaftlich?",
        answers: ["Pavo cristatus", "Aquila chrysaetos", "Struthio camelus", "Bubo bubo"],
        correct: 0,
        explanation: "Sein wissenschaftlicher Name lautet Pavo cristatus."
    },
    {
        question: "Was ist das auffälligste Merkmal des Pfauenmännchens?",
        answers: ["Ein langer Schnabel", "Grosse Füsse", "Sein prächtiges Federrad", "Ein roter Kamm"],
        correct: 2,
        explanation: "Das Männchen kann seine langen Schmuckfedern zu einem grossen Rad aufstellen."
    },
    {
        question: "Woraus entstehen die schillernden Farben der Pfauenfedern?",
        answers: [
            "Nur aus blauem Farbstoff",
            "Durch besondere Strukturen, die Licht reflektieren",
            "Durch Sonnencreme auf den Federn",
            "Durch gefärbte Federspitzen"
        ],
        correct: 1,
        explanation: "Winzige Strukturen in den Federn beeinflussen das Licht. Das nennt man Strukturfarben."
    },
    {
        question: "Was frisst ein Pfau?",
        answers: [
            "Nur Gras",
            "Nur Fische",
            "Samen, Früchte, Insekten und kleine Tiere",
            "Ausschliesslich Nüsse"
        ],
        correct: 2,
        explanation: "Pfaue sind Allesfresser. Sie ernähren sich sowohl von pflanzlicher als auch von tierischer Nahrung."
    },
    {
        question: "Wie sieht eine Pfauenhenne meistens aus?",
        answers: [
            "Unauffälliger und eher braun",
            "Ganz weiss mit schwarzen Punkten",
            "Leuchtend blau mit grossem Rad",
            "Leuchtend rot und gelb"
        ],
        correct: 0,
        explanation: "Die Pfauenhenne ist meist braun und weniger auffällig gefärbt als das Männchen."
    },
    {
        question: "Wo schlafen Pfaue häufig?",
        answers: [
            "Unter Wasser",
            "In unterirdischen Höhlen",
            "Auf Ästen von Bäumen",
            "In selbst gebauten Nestern hoch oben"
        ],
        correct: 2,
        explanation: "Pfaue fliegen häufig auf Bäume, um dort auf Ästen zu schlafen."
    },
    {
        question: "Wozu zeigt das Pfauenmännchen sein grosses Rad?",
        answers: [
            "Um Futter zu sammeln",
            "Um Weibchen zu beeindrucken",
            "Um schneller zu laufen",
            "Um Regen anzukündigen"
        ],
        correct: 1,
        explanation: "Das Rad gehört zum Balzverhalten. Damit versucht das Männchen, Weibchen zu beeindrucken."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answerGrid = document.getElementById("answer-grid");
const feedback = document.getElementById("quiz-feedback");
const nextButton = document.getElementById("next-question");
const progress = document.getElementById("quiz-progress");
const scoreElement = document.getElementById("quiz-score");
const progressFill = document.getElementById("progress-fill");
const quizContent = document.getElementById("quiz-content");
const quizResult = document.getElementById("quiz-result");


// FRAGE ANZEIGEN

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    answerGrid.innerHTML = "";
    feedback.textContent = "";
    nextButton.hidden = true;

    progress.textContent =
        `FRAGE ${currentQuestion + 1} VON ${questions.length}`;

    scoreElement.textContent = `⭐ ${score} PUNKTE`;

    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answerGrid.appendChild(button);
    });
}


// ANTWORT ÜBERPRÜFEN

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const buttons = answerGrid.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.correct) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && index !== q.correct) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === q.correct) {
        score++;
        feedback.textContent = "✦ Richtig! " + q.explanation;
    } else {
        feedback.textContent = "Noch nicht ganz! " + q.explanation;
    }

    scoreElement.textContent = `⭐ ${score} PUNKTE`;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.hidden = false;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ergebnis ansehen →"
            : "Nächste Frage →";
}


// NÄCHSTE FRAGE

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});


// ERGEBNIS ANZEIGEN

function showResult() {
    quizContent.hidden = true;
    quizResult.hidden = false;

    document.getElementById("result-score").textContent =
        `${score} / ${questions.length} Punkte`;

    const title = document.getElementById("result-title");
    const text = document.getElementById("result-text");
    const icon = document.querySelector(".result-icon");

    if (score === 8) {
        title.textContent = "Pfauen-Meister! 👑";
        text.textContent =
            "Unglaublich! Du kennst dich mit Pfaue wirklich hervorragend aus.";
        icon.textContent = "🏆";
    } else if (score >= 6) {
        title.textContent = "Pfauen-Experte!";
        text.textContent =
            "Super gemacht! Du hast schon sehr viel über Pfaue gelernt.";
        icon.textContent = "🦚";
    } else if (score >= 4) {
        title.textContent = "Auf dem richtigen Weg!";
        text.textContent =
            "Schon einiges gewusst! Mit ein bisschen Übung wirst du zum Profi.";
        icon.textContent = "🌿";
    } else {
        title.textContent = "Pfauen-Entdecker!";
        text.textContent =
            "Jetzt kennst du schon ein paar spannende Fakten. Schau dich nochmals auf der Website um und versuche es erneut!";
        icon.textContent = "🔎";
    }
}


// QUIZ NEU STARTEN

document.getElementById("restart-quiz").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    quizContent.hidden = false;
    quizResult.hidden = true;

    showQuestion();
});


// START

showQuestion();
