window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = "";
    let isb  = false
    console.log(canvas)
    context = canvas.getContext('2d');
    context.fillStyle="#ffffff";
    context.fillRect(0,0,500,500);
    canvas.addEventListener('mousedown', function (ev) {
        if (!isb) {
            context.fillStyle="#ffffff";
            context.fillRect(0,0,500,500);
            isb = true
        }
        var x1 = ev.offsetX, y1 = ev.offsetY;
        var x2, y2
        function move(ev) {
            context.beginPath();
            context.moveTo(x1, y1);
            x2 = ev.offsetX;
            y2 = ev.offsetY;
            context.lineTo(x2, y2);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();
            x1 = x2;
            y1 = y2;
        }
        function end() {
            canvas.removeEventListener('mousemove', move);
            canvas.removeEventListener('mouseup', end);
        }
        canvas.addEventListener('mousemove', move);
        canvas.addEventListener('mouseup', end);
    })
    var btn = document.getElementById('btn')
    btn.addEventListener('click', function () {
        var imgURL = canvas.toDataURL('image/png');
        var dlLink = document.createElement('a');
        var MIME_TYPE = 'image/png';
        dlLink.download = Math.floor(Math.random()*1000000000000)+'画板';
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    });
    var clear = document.getElementById('clear')
    clear.addEventListener('click', function () {
        isb = false
        context.clearRect(0,0,800,800);
    })
}