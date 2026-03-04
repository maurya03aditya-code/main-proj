document.addEventListener("DOMContentLoaded", function () {

  // 🔊 Autoplay Music
  const music = document.getElementById("bgMusic");

  music.play().then(() => {
    music.muted = false;
    music.volume = 0.5;
  }).catch(() => {
    console.log("Autoplay blocked");
  });

  // 🖱📱 Drag System
  let highestZ = 1;
  const papers = document.querySelectorAll(".paper");

  papers.forEach((paper, index) => {

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    paper.style.left = 100 + index * 40 + "px";
    paper.style.top = 100 + index * 40 + "px";

    function startDrag(x, y) {
      isDragging = true;
      paper.style.zIndex = highestZ++;
      offsetX = x - paper.offsetLeft;
      offsetY = y - paper.offsetTop;
    }

    function movePaper(x, y) {
      if (!isDragging) return;
      paper.style.left = x - offsetX + "px";
      paper.style.top = y - offsetY + "px";
    }

    // Desktop
    paper.addEventListener("mousedown", e => startDrag(e.clientX, e.clientY));
    document.addEventListener("mousemove", e => movePaper(e.clientX, e.clientY));
    document.addEventListener("mouseup", () => isDragging = false);

    // Mobile
    paper.addEventListener("touchstart", e => {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener("touchmove", e => {
      const touch = e.touches[0];
      movePaper(touch.clientX, touch.clientY);
    });

    document.addEventListener("touchend", () => isDragging = false);

  });

});
