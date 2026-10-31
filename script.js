// =========================
// 誕生日設定
// =========================

const birthday = new Date("2026-11-3");

// =========================
// 日付取得
// =========================

const today = new Date();

today.setHours(0, 0, 0, 0);
birthday.setHours(0, 0, 0, 0);

const diffDays = Math.ceil(
  (birthday - today) / (1000 * 60 * 60 * 24)
);

// =========================
// ボタン取得
// =========================

const areas = {

  day4: document.querySelector(".day4"),
  day3: document.querySelector(".day3"),
  day2: document.querySelector(".day2"),
  day1: document.querySelector(".day1"),
  birthday: document.querySelector(".birthday")

};

// =========================
// 全部ロック
// =========================

Object.values(areas).forEach(area => {
  area.classList.add("locked");
});

// =========================
// 解放処理
// =========================

function unlock(name){

  areas[name].classList.remove("locked");

  areas[name].classList.add("unlocked");
}

function current(name){

  areas[name].classList.remove("locked");

  areas[name].classList.add("current");
}

// =========================
// 状態判定
// =========================

// 当日

if(diffDays <= 0){

  unlock("day4");
  unlock("day3");
  unlock("day2");
  unlock("day1");

  current("birthday");
}

// 1日前

else if(diffDays === 1){

  unlock("day4");
  unlock("day3");
  unlock("day2");

  current("day1");
}

// 2日前

else if(diffDays === 2){

  unlock("day4");
  unlock("day3");

  current("day2");
}

// 3日前

else if(diffDays === 3){

  unlock("day4");

  current("day3");
}

// 4日前

else if(diffDays === 4){

  current("day4");
}

// =========================
// モーダル
// =========================

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// =========================
// コンテンツ定義
// =========================

const contents = {

  birthday: {
    type: "video",
    src: "content/birthday.mp4"
  },

  day1: {
    type: "ivideo",
    src: "content/day1.mp4"
  },

  day2: {
    type: "video",
    src: "content/day2.mp4"
  },

  day3: {
    type: "video",
    src: "content/day3.mp4"
  },

  day4: {
    type: "video",
    src: "content/day4.mp4"
  }

};

// =========================
// 表示処理
// =========================

function openContent(name){

  const content = contents[name];

  if(!content) return;

  if(content.type === "image"){

    modalBody.innerHTML = `
      <img src="${content.src}">
    `;
  }

  if(content.type === "video"){

    modalBody.innerHTML = `
      <video controls autoplay>
        <source src="${content.src}">
      </video>
    `;
  }

  modal.classList.add("show");
}

// =========================
// 閉じる
// =========================

closeModal.addEventListener("click", () => {

  modal.classList.remove("show");

  modalBody.innerHTML = "";

});

modal.addEventListener("click", e => {

  if(e.target === modal){

    modal.classList.remove("show");

    modalBody.innerHTML = "";

  }

});

// =========================
// ボタンクリック
// =========================

document.querySelectorAll(".hotspot")
.forEach(button => {

  button.addEventListener("click", () => {

    if(button.classList.contains("locked")){
      return;
    }

    const targetClass = [...button.classList].find(name =>
      [
        "birthday",
        "day1",
        "day2",
        "day3",
        "day4"
      ].includes(name)
    );

    openContent(targetClass);

  });

});