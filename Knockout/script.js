let textContainer = document.getElementById("container");
let startButton = document.getElementById("start");
let text = "Knocked Out";

function restartButton() {
	startButton.style.display = "none";
	startButton.style.opacity = "0";
	for (let i = 0; i < text.length; i++) {
		textContainer.innerHTML +=
			"<div class='letter letter-start'>" +
			(text[i] == " " ? "&nbsp;" : text[i]) +
			"</div>";
	}
	let letters = document.getElementsByClassName("letter");
	start(letters)
		.then(sleeper(1500))
		.then(() => explode(letters))
		.then(sleeper(2000))
		.then(() => {
			[...letters].forEach((element) => element.remove());
			startButton.style.display = "block";
		})
		.then(sleeper(100))
		.then(() => {
			startButton.style.opacity = "1";
		});
}

function sleeper(ms) {
	return function (result) {
		return new Promise((resolve) => setTimeout(() => resolve(result), ms));
	};
}

let start = (letters) => {
	return new Promise((resolve) => {
		for (let i = 0; i < text.length; i++) {
			setTimeout(() => {
				letters[i].classList.remove("letter-start");
				if (i === text.length - 1) {
					resolve(letters);
				}
			}, 200 * i);
		}
	});
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomDistance() {
	let one = getRandomInt(-20, -10);
	let two = getRandomInt(10, 20);
	if (Math.random() > 0.5) return one;
	else return two;
}

let explode = (letters) => {
	for (let i = 0; i < text.length; i++) {
		let cssText =
			"transform: translate3d(" +
			getRandomDistance() +
			"em, " +
			getRandomDistance() +
			"em, " +
			getRandomDistance() +
			"em" +
			") rotate3d(" +
			Math.random() +
			", " +
			Math.random() +
			", " +
			Math.random() +
			", " +
			getRandomInt(2, 5) +
			"turn);" +
			"filter: blur(10px); opacity:0; transition: 2000ms";
		letters[i].style.cssText = cssText;
	}
	return letters;
};

restartButton();
