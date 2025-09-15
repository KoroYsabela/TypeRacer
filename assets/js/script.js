// Sample texts for each difficulty level
const sampleTexts = {
	easy: [
		"The quick brown fox jumps over the lazy dog.",
		"Pack my box with five dozen liquor jugs.",
		"A wizard's job is to vex chumps quickly in fog."
	],
	medium: [
		"She sells seashells by the seashore, and the shells she sells are surely seashells.",
		"How razorback-jumping frogs can level six piqued gymnasts!",
		"The five boxing wizards jump quickly over the lazy dog."
	],
	hard: [
		"Jinxed wizards pluck ivy from the big quilt. Their job is to vex chumps quickly in foggy, awkward places.",
		"Crazy Frederick bought many very exquisite opal jewels, then quickly mixed the big jar of zinc oxide.",
		"Amazingly few discotheques provide jukeboxes. The quick onyx goblin jumps over the lazy dwarf."
	]
};

function getRandomText(level) {
	const texts = sampleTexts[level] || sampleTexts['easy'];
	return texts[Math.floor(Math.random() * texts.length)];
}

function updateSampleText() {
	const select = document.getElementById('difficultySelect');
	const sampleTextDiv = document.getElementById('sampleText');
	const level = select.value;
	const text = getRandomText(level);
	sampleTextDiv.textContent = text;

    // Update displayed level in results area
    document.getElementById('resultLevel').textContent = capitalizeLevel(level);
}

let testStartTime = null;
let testEndTime = null;

// Helper to round time to two decimals
function formatTime(seconds) {
    return seconds.toFixed(2);
}

// Count correctly typed words compared to sample text
function countCorrectWords(userInput, sampleText) {
    const userWords = userInput.trim().split(/\s+/);
    const sampleWords = sampleText.trim().split(/\s+/);
    let correct = 0;
    for (let i = 0; i < Math.min(userWords.length, sampleWords.length); i++) {
        if (userWords[i] === sampleWords[i]) {
            correct++;
        }
    }
    return correct;
}

// Calculate WPM
function calculateWpm(correctWords, elapsedSeconds) {
    if (elapsedSeconds === 0) return 0;
    return Math.round((correctWords / elapsedSeconds) * 60);
}

// Start the typing test
function handleStartTest() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const typingInput = document.getElementById('typingInput');
    const select = document.getElementById('difficultySelect');
    const level = select.value;

    testStartTime = performance.now();
    testEndTime = null;

    startBtn.disabled = true;
    stopBtn.disabled = false;
    typingInput.value = '';
    typingInput.disabled = false; // Enable input
    typingInput.focus();

    // Reset displayed time
    document.getElementById('resultTime').textContent = '-';

    // Update displayed level
    document.getElementById('resultLevel').textContent = capitalizeLevel(level);
}

// Stop the typing test
function handleStopTest() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const typingInput = document.getElementById('typingInput');
    const select = document.getElementById('difficultySelect');
    const sampleTextDiv = document.getElementById('sampleText');

    if (testStartTime === null) return;

    testEndTime = performance.now();
    const elapsedSeconds = (testEndTime - testStartTime) / 1000;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    typingInput.disabled = true; // Disable input

    // Display rounded time
    document.getElementById('resultTime').textContent = formatTime(elapsedSeconds) + ' s';

    // Update displayed level
    // document.getElementById('resultLevel').textContent = capitalizeLevel(select.value);

    // Calculate and display WPM
    const userInput = typingInput.value;
    const sampleText = sampleTextDiv.textContent;
    const correctWords = countCorrectWords(userInput, sampleText);
    const wpm = calculateWpm(correctWords, elapsedSeconds);
    document.getElementById('resultWpm').textContent = wpm;

    // Display difficulty level
    document.getElementById('resultLevel').textContent = capitalizeLevel(select.value);
}

// Reset the test
function handleRetryTest() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const typingInput = document.getElementById('typingInput');

    testStartTime = null;
    testEndTime = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    typingInput.value = '';
    typingInput.disabled = true; // Disable input
    document.getElementById('resultTime').textContent = '-';
}

// Helper to capitalize level string
function capitalizeLevel(level) {
    return level.charAt(0).toUpperCase() + level.slice(1);
}

document.addEventListener('DOMContentLoaded', function() {
	const select = document.getElementById('difficultySelect');
	select.addEventListener('change', updateSampleText);
	// Set initial text
	updateSampleText();

    // let testStartTime = null;
    // let testEndTime = null;

    document.getElementById('typingInput').disabled = true; // Initially disabled

    // Button event listeners
    document.getElementById('startBtn').addEventListener('click', handleStartTest);
    document.getElementById('stopBtn').addEventListener('click', handleStopTest);
    document.getElementById('retryBtn').addEventListener('click', handleRetryTest);

    // Initial button states
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
});
