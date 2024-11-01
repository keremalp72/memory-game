// const emojiler = [
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
// ];
// let tiklananEmojiler = [];
// let skor = [];
// let hamle = [];
// function diziyiKaristir() {
//   return emojiler.sort(() => Math.random() - 0.5);
// }

// function oyunuBaslat() {
//   const karistirilmisDizi = diziyiKaristir();
//   const memoryGameContainer = document.querySelector(".memory-game-container");
//   console.log(memoryGameContainer);
//   for (const emoji of karistirilmisDizi) {
//     memoryGameContainer.innerHTML += ` <div class="box">${emoji}</div> `;
//   }
//   const boxes = document.querySelectorAll(".box");
//   for (const box of boxes) {
//     box.addEventListener("click", kutuyaTiklandi);
//     box.addEventListener('click', timeStart);
//   }

// }

// let totalSeconds = 0;
// let intervalId;
// function updateTime() {
//   totalSeconds++
//   const minutes = Math.floor(totalSeconds / 60)
//   const seconds = totalSeconds % 60
//   minute.innerText = `0${minutes} : `
//   second.innerText = seconds

// }
// function timeStart() {
//   if(!intervalId)
//   intervalId = setInterval(updateTime,1000)
//   return intervalId;

// }

// function kutuyaTiklandi() {
//   if (this.classList.contains("active")) return;
//   console.log(this);
//   hamle++;
//   hamleTxt.innerText = `Moves ${hamle}`;

//   this.classList.add("active");
//   tiklananEmojiler.push(this.innerText);
//   if (tiklananEmojiler.length === 2) {
//     if (tiklananEmojiler[0] == tiklananEmojiler[1]) {
//       const activeKutular = document.querySelectorAll(".box.active");
//       for (const box of activeKutular) {
//         box.classList.add("matched");
//       }

//       skor++;
//       skorTxt.innerText = `Time ${skor}`;

//       if (skor === 8) {
//         alert("oyun bitti");
//       }
//     }
//     const activeKutular = document.querySelectorAll(".active");
//     setTimeout(() => {
//       for (const box of activeKutular) {
//         box.classList.remove("active");
//       }
//     }, 1000);

//     tiklananEmojiler = [];
//   }
// }

// oyunuBaslat();

const emojiler = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];
let tiklananEmojiler = [];
let skor = 0;
let hamle = 0;
let tiklamaKilidi = false;
let totalSeconds = 0;
let intervalId;

const restartButton = document.querySelector(".restart");
const newGameButton = document.querySelector(".new-game");



function diziyiKaristir() {
  return emojiler.sort(() => Math.random() - 0.5);
}

function oyunuBaslat() {
  const karistirilmisDizi = diziyiKaristir();
  const memoryGameContainer = document.querySelector(".memory-game-container");
  memoryGameContainer.innerHTML = '';
  document.querySelector('.hamleCounter').innerText = '0';
  for (const emoji of karistirilmisDizi) {
    memoryGameContainer.innerHTML += ` <div class="box">${emoji}</div> `;

  }
  const boxes = document.querySelectorAll(".box");
  for (const box of boxes) {
    box.addEventListener("click", kutuyaTiklandi);
    box.addEventListener("click", timeStart, { once: true }); // Sadece ilk tıklamada başlat
  }
}

const minute = document.getElementById("minute");
const second = document.getElementById("second");

function updateTime() {
  totalSeconds++;
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  minute.innerText = `${minutes} :`;
  second.innerText = seconds;
}

function timeStart() {
  if (!intervalId) {
    console.log(intervalId);
    intervalId = setInterval(updateTime, 1000);
  }
}

function timeStop() {
  clearInterval(intervalId);
  intervalId = null; 
  totalSeconds = 0;
}

function kutuyaTiklandi() {
  if (tiklamaKilidi || this.classList.contains("active")) return;

  hamle++;


  hamleTxt.querySelector('span').innerText = hamle;

  this.classList.add("active");
  tiklananEmojiler.push(this.innerText);

  if (tiklananEmojiler.length === 2) {
    tiklamaKilidi = true;
    if (tiklananEmojiler[0] === tiklananEmojiler[1]) {
      const activeKutular = document.querySelectorAll(".box.active");
      for (const box of activeKutular) {
        box.classList.add("matched");
      }

      skor++;
      if (skor === 8) {
        alert("Oyun bitti!");
        timeStop();
      }
    }

    setTimeout(() => {
      const activeKutular = document.querySelectorAll(".box.active");
      for (const box of activeKutular) {
        box.classList.remove("active");
      }
      tiklananEmojiler = [];
      tiklamaKilidi = false;
    }, 1000);
  }
}

oyunuBaslat();




restartButton.addEventListener('click',resetOpenCards);

function resetOpenCards() {
  tiklananEmojiler = [];
  hamle = 0;
  skor = 0;
  const activeElements = document.querySelectorAll('.active');
timeStop();
  for (const box of activeElements) {
    box.classList.remove('active');
  }

  const matchedElements = document.querySelectorAll('.matched');

  for (const box of matchedElements) {
    box.classList.remove('matched');
    
  }
  timeStart();
oyunuBaslat();


}


