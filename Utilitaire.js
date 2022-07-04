function rnd(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
}

function DrawCircle(pCtx, pX, pY, pR) {
    pCtx.beginPath();
    pCtx.strokeStyle = "grey";
    pCtx.arc(pX, pY, pR, 0, 2 * Math.PI);
    pCtx.fillStyle = "grey";
    pCtx.fill();
    pCtx.stroke();
}