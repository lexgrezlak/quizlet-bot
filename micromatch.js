const eventFire = (el, etype) => {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        let evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
};

const tile = document.querySelector(".MatchModeQuestionGridBoard-tiles");

allTerms = Quizlet.matchModeData.terms;
termsDefinition = {};
termsWord = {};
for (let i = 0; i < allTerms.length; i++) {
    termsDefinition[allTerms[i].word] = allTerms[i].definition;
    termsWord[allTerms[i].definition] = allTerms[i].word;
}

const findPairs = () => {
    setTimeout(()=>{
        // Magic for loop instead
        // checks if the combination is right before clicking :)
        for(let i = 0; i < tile.childNodes.length;i++) {
            console.log("i = "+i);
            // click it if its unclicked
            if (tile.childNodes[0].childNodes.length == 0 || tile.childNodes[1].childNodes[0].className == "MatchModeQuestionGridTile is-selected") {
                console.log("Already clicked " + i);
            } else {
                let word = tile.childNodes[i].childNodes[0].innerText.trim();
                let translatedWord;
                if(termsDefinition[word]){
                    translatedWord = termsDefinition[word];
                } else if(termsWord[word]){
                    translatedWord = termsWord[word];
                }

                // find another word in the same dataset ID and click that as well
                for(let o = 0; o < tile.childNodes.length; o++) {

                    if (tile.childNodes[o].innerHTML.includes(translatedWord)) {
                        let x = i;
                        setTimeout(() => {
                            console.log("Found word pair: "+translatedWord+":"+word);
                            eventFire(tile.childNodes[o].childNodes[0], "pointerdown");
                            setTimeout(() =>{
                                eventFire(tile.childNodes[x].childNodes[0], "pointerdown");
                            }, 200);
                        }, i * 400);
                    }
                }
            }
        }}, 0);
};

setInterval(function() {
    eventFire(document.querySelector("body > div:nth-child(4) > div > div.UIModal.is-open > div > div > div.HighscoresMessage > div.UIDiv.HighscoresMessage-button > button"), "click");
}, 2000);

findPairs();