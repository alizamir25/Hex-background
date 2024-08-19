const HEX_GAP = 0; 
const HEX_HLW = 2; 
const COLORS = ['#ff0066', '#00ccff', '#66ff66', '#ffcc00', '#cc66ff']; 
const canvas = document.getElementById('hexCanvas');
const ctx = canvas.getContext('2d');
const zoomSlider = document.getElementById('zoomSlider');
let zoomLevel = 1; 
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function drawHexagon(x, y, radius, color) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i;
        const x_i = x + radius * Math.cos(angle);
        const y_i = y + radius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x_i, y_i);
        } else {
            ctx.lineTo(x_i, y_i);
        }
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = HEX_HLW;
    ctx.stroke();
}
function createHexGrid(radius, color) {
    const unit_x = 3 * radius;
    const unit_y = radius * Math.sqrt(3) * 0.5;
    const off_x = 1.5 * radius;
    const rows = Math.ceil(canvas.height / unit_y) + 2;
    const cols = Math.ceil(canvas.width / unit_x) + 2;
    for (let row = 0; row < rows; row++) {
        const y = row * unit_y;
        for (let col = 0; col < cols; col++) {
            const x = (row % 2 === 0 ? 0 : off_x) + col * unit_x;
            drawHexagon(x, y, radius, color);
        }
    }
}
function init() {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const baseRadius = 64;
    for (let i = 0; i < zoomLevel && i < COLORS.length; i++) {
        const zoomFactor = Math.pow(2, i); 
        const currentRadius = baseRadius / zoomFactor;
        createHexGrid(currentRadius, COLORS[i]);
    }
}
zoomSlider.addEventListener('input', function () {
    zoomLevel = parseFloat(zoomSlider.value);
    init();
});
window.addEventListener('resize', init);
init();