const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const context2D = canvas.getContext("2d");

const MAX_HEIGHT: number = 20;
const WATER_HEIGHT_COUNT = 20;

let currenHeight: number = Math.random();
const waterHeights = [];
for (let i: number = 0; i < WATER_HEIGHT_COUNT; i ++) {
    currenHeight += (Math.random() - 0.2);
    waterHeights.push(currenHeight);
}

const addToWater = () => {
    for (let i: number = 0; i < WATER_HEIGHT_COUNT; i ++) {
        waterHeights[i] += Math.random() * 0.05;
    }
}

const render = () => {
    canvas.width = document.querySelector('body').offsetWidth;
    canvas.height = document.querySelector('body').offsetHeight;

    context2D.clearRect(0, 0, canvas.width, canvas.height);
    
    context2D.fillStyle = '#0000AA';
    context2D.fillRect(0, 0, canvas.width, canvas.height);

    context2D.fillStyle = '#0000FF';
    context2D.beginPath();

    let width: number = canvas.width / waterHeights.length;

    context2D.moveTo(0, canvas.height / 2 - Math.sin(waterHeights[0]) * MAX_HEIGHT);
    for (let i: number = 0; i < waterHeights.length; i ++) {
        let x1: number = i * width;
        let x2: number = (i + 1) * width;

        let previousHeight = i !== 0 ? waterHeights[i - 1] : 0;
        let finalHeight = i !== waterHeights.length - 1 ? waterHeights[i + 1] : waterHeights[i];

        let y1: number = canvas.height / 2 - Math.sin((waterHeights[i] + previousHeight) / 2) * MAX_HEIGHT;
        let y2: number = canvas.height / 2 - Math.sin((waterHeights[i] + finalHeight) / 2) * MAX_HEIGHT;

        context2D.lineTo(x1, y1);
        context2D.lineTo(x2, y2);
    }
    context2D.lineTo(canvas.width, canvas.height);
    context2D.lineTo(0, canvas.height);

    context2D.closePath();
    context2D.fill();

    addToWater();

    requestAnimationFrame(render);
};

render();
