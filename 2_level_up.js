let level;
level = 1;

let experience;
experience = 0;

function level_up() {
  // 'Lv. '과 '이름'이 표시되는 프로필창
  noStroke();
  fill(255);
  rect(10, 70, 200, 80, 10);
  
  fill(225);
  circle(50, 110, 50);

  fill(0);
  text("Lv. " + level, 90, 100);

  push();
  textSize(18);
  text("user_name", 90, 125);
  pop();

  // 경험치바
  fill(0, 255, 0);
  rect(125, 95, experience, 2)

  if (experience >= 70) {
    level += 1;
    if (experience >= 70) {
      experience = 0;
    }
  }

  if (fatigue >= 175 || happiness <= 0 || hunger <= 0) {
    fill(0);
    rect(0, 0, windowWidth, windowHeight);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
  }
}