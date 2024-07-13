"use strict";
// Кнопки
const Rain = {
    id: "rain",
    textContent: "RAIN",
    audioElem: new Audio("./sound/rain.ogg"),
    background: "url('./images/rain.jpg')",
};
const Bird = {
    id: "bird",
    textContent: "BIRD",
    audioElem: new Audio("./sound/bird.ogg"),
    background: "url('./images/bird.jpg')",
};
const Wave = {
    id: "wave",
    textContent: "WAVE",
    audioElem: new Audio("./sound/wave.ogg"),
    background: "url('./images/wave.jpg')",
};
const createButtons = () => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "btns";
    document.body.appendChild(buttonsContainer);
    const musicElem = document.createElement("audio");
    musicElem.id = "audio";
    document.body.appendChild(musicElem);
    musicElem.addEventListener("ended", () => {
        musicElem.currentTime = 0;
        musicElem.play();
    });
    const buttons = [Rain, Bird, Wave];
    let activeButton;
    buttons.forEach((button) => {
        const buttonElem = document.createElement("button");
        buttonElem.id = button.id;
        buttonElem.textContent = button.textContent;
        buttonElem.addEventListener("click", () => {
            document.body.style.backgroundImage = button.background;
            if (isMusicPlaying(musicElem) &&
                musicElem.src === button.audioElem.src) {
                pauseMusic(musicElem, activeButton);
            }
            else {
                if (isMusicPlaying(musicElem)) {
                    pauseMusic(musicElem, activeButton);
                }
                musicElem.pause();
                musicElem.currentTime = 0;
                musicElem.src = button.audioElem.src;
                musicElem.play();
                buttonElem.classList.add("button-play");
                activeButton = buttonElem;
            }
        });
        buttonElem.appendChild(button.audioElem);
        buttonsContainer.appendChild(buttonElem);
    });
    createInput(Volume, musicElem);
};
function isMusicPlaying(musicElem) {
    return !musicElem.paused;
}
function pauseMusic(musicElem, elem) {
    musicElem.pause();
    if (elem) {
        elem.classList.remove("button-play");
    }
    musicElem.currentTime = 0;
}
const Volume = {
    id: "volume",
    type: "range",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
};
const createInput = (input, musicElem) => {
    const inputElem = document.createElement("input");
    inputElem.id = input.id;
    inputElem.type = input.type;
    inputElem.min = `${input.min}`;
    inputElem.max = `${input.max}`;
    inputElem.step = `${input.step}`;
    inputElem.value = `${input.value}`;
    inputElem.addEventListener("input", () => {
        const volume = Number(inputElem.value) / 100;
        musicElem.volume = volume;
    });
    document.body.appendChild(inputElem);
};
