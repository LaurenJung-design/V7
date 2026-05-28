
let happiness;
happiness = 175;

let cooldownTime_happiness = 10000;     // 쿨타임 10초 (10000밀리초)
let lastClickedTime_happiness = -10000; // 처음에는 바로 클릭할 수 있도록 초기화

function condition_happiness() {

  // 행복도 상태창을 만드는 코드
  noStroke();
  fill(255);
  rect(220, 10, 200, 50, 10);

  fill(0);
  text("행복도", 230, 30);

  // 행복도 상태에 따라 색이 변하도록 함 
  if (happiness >= 80) {
    noStroke();
    fill(0, 255, 0);
    rect(230, 40, happiness, 2);
  }
  else if (happiness < 80 && happiness >= 30) {
    noStroke();
    fill(255, 255, 0);
    rect(230, 40, happiness, 2);
  }
  else if (happiness < 30) {
    noStroke();
    fill(255, 0, 0);
    rect(230, 40, happiness, 2);
  }

  // 행복도 게이지가 줄게하는 코드, 최소와 최대를 설정함
  happiness = constrain(happiness, 0, 175);
  happiness -= 0.01;

  // 행복도 게이지가 다 닳았을때 게임오버가 뜨게함
  if (happiness <= 0) {
    fill(0);
    rect(0, 0, windowWidth, windowHeight);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
  }

  // 1. 현재 쿨타임이 도는 중인지 확인
  let timePassed_happiness = millis() - lastClickedTime_happiness;
  let isCooldown_happiness = timePassed_happiness < cooldownTime_happiness;

  // 2. [시각 효과] 쿨타임 중이면 전체적으로 흐리게(투명하게) 보이도록 설정
  if (isCooldown_happiness) {
    // 쿨타임 중일 때는 색을 100으로 낮춤 (원래는 255)
    fill(100);
  } else {
    fill(255);
  }
  // 말걸기 버튼 디자인
  rect(120, height - 110, 100, 100, 10);

  // [ ai ] 시간 단축을 위해 ai를 사용 부분
  // 말풍선 몸통
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(135, height - 95, 70, 50, 15);
  // 말풍선 꼬리
  triangle(155, height - 45, 165, height - 45, 150, height - 30);
  // 말풍선과 꼬리 경계 가리기
  noStroke();
  rect(155, height - 49, 9, 5, 5);

  

}