const rangeSlide = document.getElementById("char-slider");
const generateBtn = document.getElementById("generate-btn");
const checkboxes = document.querySelectorAll(".checkbox");
const PWDDisplay = document.querySelector(".pwd__display");
const strengthName = document.querySelector(".display__strength-name");
const scale = document.getElementsByClassName("scale__el");
const copyBtn = document.querySelector(".copy-btn");
const errMsg = document.querySelector(".err-msg");

const maxVal = parseInt(rangeSlide.max);
const emptyClass = "empty";
const COLORS = Object.freeze({
	green: "#a4ffaf",
	red: "#f64a4a",
	orange: "#fb7c58",
	yellow: "#f8c065",
	dark_gray: "#18171f",
	transparent: "transparent",
});

const checkboxesValues = {
	uppercase: false,
	lowercase: false,
	numbers: false,
	symbols: false,
};

function handleCopy(e) {
	const copyMsg = document.querySelector(".pwd__copy p");
	e.preventDefault();
	navigator.clipboard
		.writeText(PWDDisplay.innerText)
		.then(() => {
			copyMsg.style.display = "block";
			setTimeout(() => {
				copyMsg.style.display = "none";
			}, 1000);
		})
		.catch((err) => {
			console.error("Failed to copy: ", err);
		});
}

function handleStrength() {
	const strength = Object.freeze({
		1: { name: "too weak!", color: COLORS.red },
		2: { name: "weak", color: COLORS.orange },
		3: { name: "medium", color: COLORS.yellow },
		4: { name: "strong", color: COLORS.green },
	});
	const lengthSmall = 6;
	const lengthMedium = 12;
	const lengthBig = 16;

	const rangeValue = +rangeSlide.value;

	// const settings = {
	// 	uppercase: false,
	// 	lowercase: false,
	// 	numbers: false,
	// 	symbols: false,
	// };

	let PWDSolidity = strength[1];

	checkboxes.forEach((checkbox) => {
		checkbox.checked
			? (checkboxesValues[checkbox.id] = true)
			: (checkboxesValues[checkbox.id] = false);
	});
	handleAllEmptyCheckboxes();

	function isPwdLong() {}
	if (rangeValue < lengthSmall) {
		PWDSolidity = strength[1];
	} else if (rangeValue >= lengthSmall && rangeValue < lengthMedium) {
		if (
			checkboxesValues.uppercase &&
			checkboxesValues.lowercase &&
			checkboxesValues.numbers &&
			checkboxesValues.symbols
		)
			PWDSolidity = strength[4];
		else if (
			checkboxesValues.uppercase &&
			checkboxesValues.lowercase &&
			checkboxesValues.numbers
		)
			PWDSolidity = strength[3];
		else if (checkboxesValues.uppercase || checkboxesValues.lowercase)
			PWDSolidity = strength[2];
		else if (checkboxesValues.numbers) PWDSolidity = strength[1];
	} else if (rangeValue >= lengthMedium && rangeValue < lengthBig) {
		if (
			(checkboxesValues.uppercase &&
				checkboxesValues.lowercase &&
				checkboxesValues.numbers &&
				checkboxesValues.symbols) ||
			(checkboxesValues.uppercase &&
				checkboxesValues.lowercase &&
				checkboxesValues.numbers) ||
			(checkboxesValues.uppercase && checkboxesValues.lowercase)
		)
			PWDSolidity = strength[4];
		else if (checkboxesValues.uppercase || checkboxesValues.lowercase)
			PWDSolidity = strength[3];
		else PWDSolidity = strength[2];
	} else if (rangeValue >= lengthBig) {
		if (
			!checkboxesValues.lowercase &&
			!checkboxesValues.uppercase &&
			!checkboxesValues.symbols
		)
			PWDSolidity = strength[3];
		else PWDSolidity = strength[4];
	}

	strengthName.innerText = PWDSolidity.name;
	const solidityIndex = Object.keys(strength).find(
		(key) => strength[key].name === PWDSolidity.name
	);
	for (let i = 0; i < solidityIndex; i++) {
		scale[i].style.backgroundColor = PWDSolidity.color;
	}
	for (let i = scale.length - 1; i >= solidityIndex; i--) {
		scale[i].style.backgroundColor = COLORS.transparent;
	}
}
function slideLength() {
	const clr_active = COLORS.green;
	const clr_neutral = COLORS.dark_gray;
	const displayVal = document.querySelector(".char-slider__num");
	let progress = (rangeSlide.value / maxVal) * 100;
	rangeSlide.style.background = `linear-gradient(to right,${clr_active} ${progress}%, ${clr_neutral} ${progress}%)`;
	displayVal.innerText = rangeSlide.value;
	handleStrength();
}

function isValidPWDChar(num) {
	const settings = {
		uppercase: () => num >= 65 && num <= 90, // 1. The Ascii Value of Capital A to Z 65-90
		lowercase: () => num >= 97 && num <= 122, // 2. The Ascii Value of small a to z 97-122
		numbers: () => num >= 48 && num <= 57, // 3. The Ascii Value of Numeric 48-57
		symbols: () =>
			// 4. The Ascii Value of Symbols 33-126 excluding 1. 2. 3.
			(num >= 33 && num < 48) ||
			(num > 57 && num < 65) ||
			(num > 90 && num < 97) ||
			(num > 122 && num <= 126),
	};
	for (const checkbox of checkboxes) {
		// if ascii is of type that is not checked return false (e.g. uppercase is not checked but value is 'A' )
		if (checkbox.checked) continue;
		else if (settings[checkbox.id]()) return false;
	}

	return true;
}

function generatePwd(e) {
	e.preventDefault();

	function getRandomNumber() {
		const max = 126; //The max number for Ascii symbols
		const min = 33; //The max number for Ascii symbols
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let PWDstr = "";
	for (let i = 0; i < +rangeSlide.value; i++) {
		let asciiNum = getRandomNumber();
		while (!isValidPWDChar(asciiNum)) {
			asciiNum = getRandomNumber();
		}
		PWDstr += String.fromCharCode(asciiNum);
	}
	PWDDisplay.classList.remove(emptyClass);
	PWDDisplay.innerText = PWDstr;
}

function handleAllEmptyCheckboxes() {
	if (
		!checkboxesValues.lowercase &&
		!checkboxesValues.uppercase &&
		!checkboxesValues.numbers &&
		!checkboxesValues.symbols
	) {
		errMsg.style.display = "block";
		generateBtn.disabled = true;
	} else {
		errMsg.style.display = "none";
		generateBtn.disabled = false;
	}
}

function reset() {
	// reset password display
	PWDDisplay.innerText = "P4$5W0rD!";
	PWDDisplay.classList.add(emptyClass);

	// reset slide value
	rangeSlide.value = 1;

	// reset checkboxes
	checkboxes.forEach((checkbox) =>
		checkbox.id === "symbols"
			? (checkbox.checked = false)
			: (checkbox.checked = true)
	);
}

window.onload = function () {
	reset();
	slideLength();
};

generateBtn.addEventListener("click", generatePwd);
checkboxes.forEach((box) => {
	box.addEventListener("change", handleStrength);
});

copyBtn.addEventListener("click", handleCopy);
