const rangeSlide = document.getElementById("char-slider");
const generateBtn = document.getElementById("generate-btn");
const maxVal = parseInt(rangeSlide.max);

function slideLength() {
	const clr_active = "#a4ffaf";
	const clr_neutral = "#18171f";
	const displayVal = document.querySelector(".char-slider__num");
	let progress = (rangeSlide.value / maxVal) * 100;
	rangeSlide.style.background = `linear-gradient(to right,${clr_active} ${progress}%, ${clr_neutral} ${progress}%)`;
	displayVal.innerText = rangeSlide.value;
}

function getRandomNumber() {
	const max = 126; //The max number for Ascii symbols
	const min = 33; //The max number for Ascii symbols
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePwd(e) {
	e.preventDefault();
	// 1. The Ascii Value of Capital A to Z 65-90
	// 2. The Ascii Value of small a to z 97-122
	// 3. The Ascii Value of Numeric 48-57
	// 4. The Ascii Value of Symbols 33-126 excluding 1. 2. 3.
	let PWDstr = "";
    const upperCase = 
    for(let i = 0; i <= +rangeSlide.value; i++) {
        const asciiNum = getRandomNumber();

    }
}

window.onload = function () {
	slideLength();
};

generateBtn.addEventListener("click", generatePwd);
