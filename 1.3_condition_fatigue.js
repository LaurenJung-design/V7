
let fatigue;
fatigue = 0;

let cooldownTime_fatigue1 = 10000;     // 쿨타임 10초 (10000밀리초)
let lastClickedTime_fatigue1 = -10000; // 처음에는 바로 클릭할 수 있도록 초기화

let cooldownTime_fatigue2 = 10000;     // 쿨타임 10초 (10000밀리초)
let lastClickedTime_fatigue2 = -10000; // 처음에는 바로 클릭할 수 있도록 초기화

function condition_fatigue() {

  // 피로도 상태창을 만드는 코드
  noStroke();
  fill(255);
  rect(430, 10, 200, 50, 10);

  fill(0);
  text("피로도", 440, 30);

  // 피로도 상태에 따라 색이 변하도록 함 
  if (fatigue <= 100) {
    noStroke();
    fill(0, 255, 0);
    rect(440, 40, fatigue, 2);
  }
  else if (fatigue > 100 && fatigue <= 145) {
    noStroke();
    fill(255, 255, 0);
    rect(440, 40, fatigue, 2);
  }
  else if (fatigue > 145) {
    noStroke();
    fill(255, 0, 0);
    rect(440, 40, fatigue, 2);
  }

  // 피로도 게이지가 늘게하는 코드, 최소와 최대를 설정함
  fatigue = constrain(fatigue, 0, 175);
  fatigue += 0.01;

  // 피로도 게이지가 다 채워졌을 때 게임오버가 뜨게함
  if (fatigue >= 175) {
    fill(0);
    rect(0, 0, windowWidth, windowHeight);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
  }

  let timePassed_fatigue1 = millis() - lastClickedTime_fatigue1;
  let isCooldown_fatigue1 = timePassed_fatigue1 < cooldownTime_fatigue1;

  // 2. [시각 효과] 쿨타임 중이면 전체적으로 흐리게(투명하게) 보이도록 설정
  if (isCooldown_fatigue1) {
    // 쿨타임 중일 때는 색을 100으로 낮춤 (원래는 255)
    fill(100);
  } else {
    fill(255);
  }
  // 씻기기 버튼 디자인
  rect(230, height - 110, 100, 100, 10);

  push();
  // [ ai ] 시간 단축을 위해 ai를 사용 부분
  stroke(180); // 조금 더 밝은 회색
  strokeWeight(8);
  line(260, height - 40, 275, height - 65);

  // 샤워기 헤드 (원형)
  fill(200);
  stroke(130);
  strokeWeight(2);
  ellipse(280, height - 75, 25, 25);

  // 물줄기 효과 (작은 점 또는 짧은 선들)
  stroke(100, 150, 255); // 하늘색 물줄기
  strokeWeight(2);
  line(285, height - 80, 300, height - 78);
  line(283, height - 75, 298, height - 68);
  line(280, height - 70, 295, height - 60);

  pop();

  let timePassed_fatigue2 = millis() - lastClickedTime_fatigue2;
  let isCooldown_fatigue2 = timePassed_fatigue2 < cooldownTime_fatigue2;

  // 2. [시각 효과] 쿨타임 중이면 전체적으로 흐리게(투명하게) 보이도록 설정
  if (isCooldown_fatigue2) {
    // 쿨타임 중일 때는 색을 100으로 낮춤 (원래는 255)
    fill(100);
  } else {
    fill(255);
  }

  // 재우기 버튼 디자인
  rect(340, height - 110, 100, 100, 10);

  push(); // 스타일 설정을 침대에만 적용하기 위해 push()
  
  // 침대 그릴 시작 기준점 좌표 (사각형 중앙 부근)
  let bx = 340 + 50; 
  let by = height - 110 + 55;

  // 2. 침대 프레임/다리 (나무 느낌의 짙은 갈색)
  stroke(80, 50, 20); 
  strokeWeight(3);
  noFill();
  // 왼쪽 다리
  line(bx - 35, by - 5, bx - 35, by + 15); 
  // 오른쪽 다리
  line(bx + 35, by - 5, bx + 35, by + 15);
  // 바닥 프레임
  line(bx - 35, by + 10, bx + 35, by + 10);
  
  // 3. 매트리스 (깨끗한 아이보리색)
  fill(250, 248, 235);
  strokeWeight(1.5);
  rect(bx - 35, by - 5, 70, 15, 3); // 중심 기준으로 대칭
  
  // 4. 베개 (폭신한 느낌의 하얀색)
  fill(255);
  strokeWeight(1);
  // 왼쪽 베개 사각형
  rect(bx - 32, by - 20, 28, 16, 3); 
  // 오른쪽 베개 사각형
  rect(bx + 4, by - 20, 28, 16, 3);
  
  // 5. 이불 (부드러운 파스텔톤 하늘색)
  strokeWeight(1.5);
  // 매트리스 하단과 양 옆에 딱 맞게
  rect(bx - 35, by + 1, 70, 12, 2); 
  
  pop(); // 스타일 설정 원상복구

}