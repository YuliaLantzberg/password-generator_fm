const rangeSlide = document.getElementById("char-slider");
const maxVal = parseInt(rangeSlide.max);

function slideLength() {
	const clr_active = "#a4ffaf";
	const clr_neutral = "#18171f";
	let progress = (rangeSlide.value / maxVal) * 100;
	console.log("rangeSlide.value", rangeSlide.value);
	console.log("progress", progress);
	rangeSlide.style.background = `linear-gradient(to right,${clr_active} ${progress}%, ${clr_neutral} ${progress}%)`;
}

window.onload = function () {
	slideLength();
};
