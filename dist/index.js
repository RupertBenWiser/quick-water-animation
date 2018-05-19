var canvas = document.querySelector("canvas");
var context2D = canvas.getContext("2d");
var MAX_HEIGHT = 20;
var WATER_HEIGHT_COUNT = 20;
var currenHeight = Math.random();
var waterHeights = [];
for (var i = 0; i < WATER_HEIGHT_COUNT; i++) {
    currenHeight += (Math.random() - 0.2);
    waterHeights.push(currenHeight);
}
var addToWater = function () {
    for (var i = 0; i < WATER_HEIGHT_COUNT; i++) {
        waterHeights[i] += Math.random() * 0.05;
    }
};
var render = function () {
    canvas.width = document.querySelector('body').offsetWidth;
    canvas.height = document.querySelector('body').offsetHeight;
    context2D.clearRect(0, 0, canvas.width, canvas.height);
    context2D.fillStyle = '#0000AA';
    context2D.fillRect(0, 0, canvas.width, canvas.height);
    context2D.fillStyle = '#0000FF';
    context2D.beginPath();
    var width = canvas.width / waterHeights.length;
    context2D.moveTo(0, canvas.height / 2 - Math.sin(waterHeights[0]) * MAX_HEIGHT);
    for (var i = 0; i < waterHeights.length; i++) {
        var x1 = i * width;
        var x2 = (i + 1) * width;
        var previousHeight = i !== 0 ? waterHeights[i - 1] : 0;
        var finalHeight = i !== waterHeights.length - 1 ? waterHeights[i + 1] : waterHeights[i];
        var y1 = canvas.height / 2 - Math.sin((waterHeights[i] + previousHeight) / 2) * MAX_HEIGHT;
        var y2 = canvas.height / 2 - Math.sin((waterHeights[i] + finalHeight) / 2) * MAX_HEIGHT;
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
