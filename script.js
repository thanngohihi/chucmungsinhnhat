let input = "";
const correctDate = "2002";
const userName = "LÂN NGU";

let confettiStarted = false;

function pressKey(key) {
  if (input.length < 4) {
    input += key;
    updateDisplay();
    clearError();

    // Phát âm thanh khi nhấn nút
    const clickSound = new Audio("sounds/click.mp3");
    clickSound.play().catch(() => {});
  }
}

function clearInput() {
  input = "";
  updateDisplay();
  clearError();
}

function updateDisplay() {
  document.getElementById("date-display").textContent = input.padEnd(4, "_");
}

function showError(message) {
  const error = document.getElementById("error-message");
  error.textContent = message;
  error.classList.add("shake");
  document.querySelector(".input-card").classList.add("shake");

  setTimeout(() => {
    error.classList.remove("shake");
    document.querySelector(".input-card").classList.remove("shake");
  }, 500);
}

function clearError() {
  document.getElementById("error-message").textContent = "";
}

function submitDate() {
  if (input === correctDate) {
    const inputScreen = document.querySelector(".birthday-input-screen");
    inputScreen.classList.add("fade-out");

    setTimeout(() => {
      inputScreen.classList.add("hidden");
      document.querySelector(".main-content").classList.remove("hidden");
      document.getElementById("name").textContent = userName;

      if (!confettiStarted) {
        startConfetti();
        confettiStarted = true;
      }

      playMusic();
      showMessagesSequentially();
    }, 1000);
  } else {
    showError("Nhập ngày sinh mất rồi, nhập lại đi nà.");
  }
}

function playMusic() {
  const music = document.getElementById("bg-music");
  music.play().catch(() => {
    console.log("Trình duyệt chặn tự động phát nhạc.");
  });
}

// 🎉 Confetti
function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let pieces = [];
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 50 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      tilt: Math.random() * 10 - 10,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += Math.cos(p.d) + 2;
      p.x += Math.sin(p.d);
      if (p.y > canvas.height) {
        pieces[i] = {
          ...p,
          x: Math.random() * canvas.width,
          y: -20,
        };
      }
    });
    requestAnimationFrame(draw);
  }

  draw();
}

// ✨ Lời chúc lần lượt
function showMessagesSequentially() {
  const messages = document.querySelectorAll(".greeting-message p");
  let i = 0;

  function showNext() {
    if (i < messages.length) {
      messages[i].classList.add("visible");
      setTimeout(showNext, 1800);
      i++;
    } else {
      setTimeout(showPhotoLayout, 1000);
    }
  }

  showNext();
}

// ❤️ Hiển thị layout ảnh trái tim + bánh sinh nhật
function showPhotoLayout() {
  const photoLayout = document.querySelector(".heart-layout");
  const images = photoLayout.querySelectorAll(".heart-img");
  const cake = document.querySelector(".birthday-cake");

  photoLayout.classList.add("show");

  images.forEach((img, index) => {
    setTimeout(() => {
      img.classList.add("show");
    }, index * 300);
  });

  // Hiện bánh sau tất cả ảnh đã hiện
  setTimeout(() => {
    cake.classList.add("show");

    // Phát âm thanh nến cháy
    const fireSound = new Audio("sounds/fire.mp3");
    fireSound.play().catch(() => {});
  }, images.length * 300 + 500);
}
