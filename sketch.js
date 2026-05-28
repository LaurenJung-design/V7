let pet_name = "물개"; 

// 캐릭터 상태 변수 (임시)
let currentAction = "normal";  // normal, happy, eat, bath, sleep, angry
let myBodyColor = "#FFD9A3";   // 캐릭터 몸 색깔
let myShadowColor = "#E8B87A"; // 캐릭터 그림자 색깔

function setup() {
  createCanvas(windowWidth, windowHeight);

  loadWeather();      // 날씨 데이터 받아오기 (위치 자동 감지)
  setupFaceCam();     // 표정 인식 모델 로드 (아직 웹캠은 안 켜짐)
}

function draw() {
  background(220);

  condition_hunger();  
  condition_happiness();
  condition_fatigue();
  level_up();

  drawWindow(230, 170, 250, 180); //창문 그리기 

  // 웹캠 버튼 (다른 버튼들과 같은 라인)
  drawFaceCamButton(450, height - 110, 100, 100);

  // 웹캠이 켜져 있을 때만 미리보기 표시
  if (faceCamActive) {
    drawFaceCamPreview(width - 220, 50, 200, 150);
  }

  applyFacialMoodToHappiness(); 
  applyWeatherToHappiness();
}

// 표정에 따라 행복도 반영
function applyFacialMoodToHappiness() {
  if (facialMood === 'happy') {
    happiness += 0.2;
    happiness = constrain(happiness, 0, 175);
  } else if (facialMood === 'sad') {
    happiness -= 0.1;
    happiness = constrain(happiness, 0, 175);
  }
}

// 날씨에 따라 행복도 반영
function applyWeatherToHappiness() {
  if (!weatherLoaded) return;
  if (weatherCondition === 'clear') {
    happiness += 0.02;
    happiness = constrain(happiness, 0, 175);
  } else if (weatherCondition === 'rain' || weatherCondition === 'snow') {
    happiness -= 0.02;
    happiness = constrain(happiness, 0, 175);
  }
}

