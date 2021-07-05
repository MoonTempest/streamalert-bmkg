const soundfile = 'JishinSokuho.wav';

const sound = new Howl({
    src: [soundfile],
});


const container = document.getElementById("flex-container");

function triggerAnimation() {
    container.classList.add("animin");
    container.classList.remove("animout");
    sound.play();
    container.onanimationend = function () {
        container.classList.add("animout");
        container.classList.remove("animin");
        container.onanimationend = null;
    }
}

function populateData(gempa) {
    const magnitude = document.getElementById('Magnitude-value');
    const depth = document.getElementById('Depth-value');
    const epicenter = document.getElementById('Epicenter-value');
    const location = document.getElementById('AffectLoc');
    const datum = document.getElementById('Datum-value');
    magnitude.innerHTML = gempa.Magnitude;
    depth.innerHTML = gempa.Kedalaman.toUpperCase();
    epicenter.innerHTML = gempa.Wilayah;
    location.innerHTML = gempa.Dirasakan;
    datum.innerHTML = gempa.Tanggal + " " + gempa.Jam;
}

const workerURL = 'https://worker.damillora.workers.dev/';

let infoGempa = {};

async function fetchData() {
    const response = await fetch(workerURL);
    const data = await response.json();
    const date = Date.parse(data.DateTime);
    const now = Date.now();
    const seconds = Math.abs(now - date) / 1000;
    console.log(seconds);
    if (infoGempa.DateTime) {
        console.log("data existing");
        if (infoGempa.DateTime != data.DateTime) {
            console.log("it's quake");
            infoGempa = data;
            populateData(infoGempa);
            triggerAnimation();
        }
        setTimeout(fetchData, 30000);
        return;
    }
    infoGempa = data;
    if (seconds <= 60) {
        populateData(infoGempa);
        triggerAnimation();
    }
    setTimeout(fetchData, 30000);
}

fetchData();