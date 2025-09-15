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
}

document.addEventListener('DOMContentLoaded', function() {
	const select = document.getElementById('difficultySelect');
	select.addEventListener('change', updateSampleText);
	// Set initial text
	updateSampleText();
});
