const quizlet = window.Quizlet;
const allTerms = quizlet.learnGameData.allTerms;
let enWords = [];
let plWords = [];
let termText = "";
let searchedI = 0;
let count = 0;
let e = new KeyboardEvent('keydown',{'keyCode':32,'which':32});

document.addEventListener('keydown', function(ev){
    console.log(ev.which);
});

for (let i = 0; i < allTerms.length; i++) {
    enWords.push(allTerms[i].word);
    plWords.push(allTerms[i].definition);
}

const findAnswer = () => {
    termText = document.getElementsByClassName("TermText")[0].innerHTML;

    for (let i = 0; i < plWords.length; i++) {
        if (termText == plWords[i]) {
            searchedI = i;
        }
    }

    if (count % 29 === 0 && count > 0) {
        searchedI += 1;
    }

    document.getElementById("user-answer").innerHTML = enWords[searchedI];
    count++;
};

const submitAnswer = () => {
    "use strict";
    document.getElementById("js-learnModeAnswerButton").click();
};

const toNextQuestion = () => {
    "use strict";
    // document.getElementById("learn-page").click();
    document.dispatchEvent(e);
};


const doTasks = () => {
    "use strict";
    setInterval(function () {
        "use strict";
        findAnswer();
        submitAnswer();
    }, 10);
    setInterval(function () {
        toNextQuestion();
    }, 15);
};

doTasks();
setInterval(() => {
    "use strict";
    document.getElementsByClassName("js-learnAnalyzeStartOver")[0].click();
}, 2000);
