let words = [
    { word: "apple", translation: "яблуко", difficulty: "easy" },
    { word: "banana", translation: "банан", difficulty: "easy" },
	{ word: "bamboo", translation: "бамбук", difficulty: "easy" },
    { word: "gold", translation: "золото", difficulty: "easy" },
	{ word: "copper", translation: "мідь", difficulty: "easy" },
    { word: "running", translation: "бігати", difficulty: "easy" },
	{ word: "egg", translation: "яйце", difficulty: "easy" },
	{ word: "map", translation: "карта", difficulty: "easy" },
	{ word: "compass", translation: "компас", difficulty: "easy" },
	{ word: "eye", translation: "око", difficulty: "easy" },
	{ word: "pickaxe", translation: "кайло", difficulty: "medium" },
	{ word: "potion", translation: "зілля", difficulty: "medium" },
	{ word: "milk", translation: "молоко", difficulty: "medium" },
	{ word: "armor", translation: "броня", difficulty: "medium" },
	{ word: "pickaxe", translation: "кайло", difficulty: "medium" },
	{ word: "leather", translation: "шкіра", difficulty: "medium" },
    { word: "cow", translation: "корова", difficulty: "hard" },
	{ word: "firework", translation: "феєрверк", difficulty: "hard" },
	{ word: "beetroot", translation: "буряк", difficulty: "hard" },
	{ word: "tear", translation: "сльоза", difficulty: "hard" },
	{ word: "raw", translation: "сирий", difficulty: "hard" },
];

let selectedDifficulty = "easy";
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function filterWordsByDifficulty(difficulty) {
    return words.filter(word => word.difficulty == difficulty);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function showNextWord() {
    let filteredWords = filterWordsByDifficulty(selectedDifficulty);

    if (currentIndex < filteredWords.length) {
        $("#current-step").text("Крок " + (currentIndex + 1) + " з " + filteredWords.length);
        $("#translation").val("");
        $("#cards-container").html("<div class='card'>" + filteredWords[currentIndex].word + "</div>");
    } else {
        if (currentIndex == filteredWords.length) {
            let knowledgeLevel = (correctCount / filteredWords.length) * 100;
            $("#result").html("<p>Ваш рівень знань: " + knowledgeLevel.toFixed(2) + "%</p>");
            $("#restart-btn").show();
        }
    }
}

$(document).ready(function () {
    shuffleArray(filterWordsByDifficulty(selectedDifficulty));
    showNextWord();
    $("#check-btn").on("click", function () {
        let userTranslation = $("#translation").val().toLowerCase();
        let correctTranslation = filterWordsByDifficulty(selectedDifficulty)[currentIndex].translation.toLowerCase();
        if (userTranslation == correctTranslation) {
            correctCount++;
            $("#correct-count").text("Правильні: " + correctCount);
        } else {
            incorrectCount++;
            $("#incorrect-count").text("Неправильні: " + incorrectCount);
        }
        currentIndex++;
        showNextWord();
    });
    $("#difficulty").on("change", function () {
        selectedDifficulty = $(this).val();
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        shuffleArray(filterWordsByDifficulty(selectedDifficulty));
        showNextWord();
        $("#result").empty();
        $("#restart-btn").hide();
        $("#correct-count").text("Правильні: 0");
        $("#incorrect-count").text("Неправильні: 0");
    });
});