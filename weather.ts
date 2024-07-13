// Кнопки

interface Button {
    id: string;
    textContent: string;
    audioElem: HTMLAudioElement;
    background: string;
}

const Rain: Button = {
    id: "rain",
    textContent: "RAIN",
    audioElem: new Audio("./sound/rain.ogg"),
    background: "url('./images/rain.jpg')",
};

const Bird: Button = {
    id: "bird",
    textContent: "BIRD",
    audioElem: new Audio("./sound/bird.ogg"),
    background: "url('./images/bird.jpg')",
};

const Wave: Button = {
    id: "wave",
    textContent: "WAVE",
    audioElem: new Audio("./sound/wave.ogg"),
    background: "url('./images/wave.jpg')",
};

const createButtons = (): void => {
    const buttonsContainer: HTMLDivElement = document.createElement("div");
    buttonsContainer.id = "btns";
    document.body.appendChild(buttonsContainer);

    const musicElem: HTMLAudioElement = document.createElement("audio");
    musicElem.id = "audio";
    document.body.appendChild(musicElem);

    musicElem.addEventListener("ended", () => {
        musicElem.currentTime = 0;
        musicElem.play();
    });

    const buttons = [Rain, Bird, Wave];
    let activeButton: HTMLButtonElement;

    buttons.forEach((button) => {
        const buttonElem: HTMLButtonElement = document.createElement("button");
        buttonElem.id = button.id;
        buttonElem.textContent = button.textContent;

        buttonElem.addEventListener("click", () => {
            document.body.style.backgroundImage = button.background;
            if (
                isMusicPlaying(musicElem) &&
                musicElem.src === button.audioElem.src
            ) {
                pauseMusic(musicElem, activeButton);
            } else {
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

function isMusicPlaying(musicElem: HTMLAudioElement): boolean {
    return !musicElem.paused;
}

function pauseMusic(
    musicElem: HTMLAudioElement,
    elem: HTMLButtonElement
): void {
    musicElem.pause();
    if (elem) {
        elem.classList.remove("button-play");
    }
    musicElem.currentTime = 0;
}

// Громкость

interface Input {
    id: string;
    type: "range";
    min: number;
    max: number;
    step: number;
    value: number;
}

const Volume: Input = {
    id: "volume",
    type: "range",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
};

const createInput = (input: Input, musicElem: HTMLAudioElement): void => {
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
