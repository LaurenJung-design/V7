
let hunger;
hunger = 175;

// [ ai ]
let cooldownTime_hunger = 10000;     // 쿨타임 10초 (10000밀리초)
let lastClickedTime_hunger = -10000; // 처음에는 바로 클릭할 수 있도록 초기화

function condition_hunger() {

  // 배고픔 상태창을 만드는 코드
  noStroke();
  fill(255);
  rect(10, 10, 200, 50, 10);

  fill(0);
  text("배고픔", 20, 30);

  // 배고픔 상태에 따라 색이 변하도록 함 
  if (hunger >= 80) {
    noStroke();
    fill(0, 255, 0);
    rect(20, 40, hunger, 2);
  }
  else if (hunger < 80 && hunger >= 30) {
    noStroke();
    fill(255, 255, 0);
    rect(20, 40, hunger, 2);
  }
  else if (hunger < 30) {
    noStroke();
    fill(255, 0, 0);
    rect(20, 40, hunger, 2);
  }

  // 배고픔 게이지가 줄게하는 코드, 최소와 최대를 설정함
  hunger = constrain(hunger, 0, 175);
  hunger -= 0.01;

  // 배고픔 게이지가 다 닳았을때 게임오버가 뜨게함
  if (hunger <= 0) {
    fill(0);
    rect(0, 0, windowWidth, windowHeight);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
  }
  // [ ai ]
  // 1. 현재 쿨타임이 도는 중인지 확인
  let timePassed_hunger = millis() - lastClickedTime_hunger;
  let isCooldown_hunger = timePassed_hunger < cooldownTime_hunger;

  // 2. [시각 효과] 쿨타임 중이면 전체적으로 흐리게(투명하게) 보이도록 설정
  if (isCooldown_hunger) {
    // 쿨타임 중일 때는 색을 100으로 낮춤 (원래는 255)
    fill(100);
  } else {
    fill(255);
  }
  // 
  
  // 먹이주기 버튼 디자인
  rect(10, height - 110, 100, 100, 10);

  fill(225);
  noStroke();
  ellipse(19.5, height - 66.75, 13.5, 13.5);
  ellipse(19.5, height - 53.25, 13.5, 13.5);
  ellipse(100.5, height - 66.75, 13.5, 13.5);
  ellipse(100.5, height - 53.25, 13.5, 13.5);
  rect(19.5, height - 64.5, 81, 9);

  fill(165, 42, 42);
  rect(33, height - 88, 55, 55, 20);

}