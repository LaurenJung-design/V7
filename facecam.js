// ============================================
// 웹캠 표정 인식 모듈 (담당: 정유린)
// ============================================
// 사용법:
//   - setup()에서 setupFaceCam() 호출
//   - "상호작용하기" 버튼 누르면 toggleFaceCam() 호출
//   - facialMood 변수로 현재 표정 확인
//   - 값: 'happy' | 'sad' | 'neutral' | 'none' | 'calibrating'
// ============================================

let faceMeshModel;
let faceVideo;
let detectedFaces = [];

// 다른 파일에서 읽을 전역 변수
let facialMood = 'none';
let smileScore = 0;
let faceCamActive = false;

// === 자동 보정 시스템 ===
let baselineScore = null;       // 사용자의 무표정 기준선
let isCalibrating = false;      // 보정 중인지 여부
let calibrationSamples = [];    // 보정 중 수집되는 샘플
const CALIBRATION_DURATION = 90; // 보정 샘플 수 (약 3초)

// 기준선 대비 변화량 임계치
const SMILE_DELTA = 0.08;  // 기준선보다 +0.08 이상 → 웃음
const SAD_DELTA = 0.08;    // 기준선보다 -0.08 이하 → 슬픔

// ============================================
// 초기 세팅 (setup에서 한 번 호출)
// ============================================
function setupFaceCam() {
  // 모델만 로드, 웹캠은 아직 안 켬
  faceMeshModel = ml5.faceMesh({
    maxFaces: 1,
    refineLandmarks: false,
    flipHorizontal: true
  });
  
  console.log('[facecam] 모델 로드 완료. 버튼을 눌러 시작하세요.');
}

// ============================================
// 웹캠 켜기 - 버튼 누를 때만
// ============================================
function startFaceCam() {
  if (faceCamActive) return;
  
  // 여기서 웹캠 열기
  faceVideo = createCapture(VIDEO);
  faceVideo.size(320, 240);
  faceVideo.hide();
  
  // 감지 시작
  faceMeshModel.detectStart(faceVideo, gotFaces);
  faceCamActive = true;
  startCalibration();
  console.log('[facecam] 표정 인식 시작 - 보정 중...');
}

// ============================================
// 웹캠 끄기 - 정말로 꺼버리기
// ============================================
function stopFaceCam() {
  if (!faceCamActive) return;
  
  faceMeshModel.detectStop();
  
  // 웹캠 스트림 완전 종료
  if (faceVideo) {
    faceVideo.remove();
    faceVideo = null;
  }
  
  faceCamActive = false;
  facialMood = 'none';
  baselineScore = null;
  console.log('[facecam] 표정 인식 중지');
}

// ============================================
// 보정 (캘리브레이션)
// ============================================
function startCalibration() {
  isCalibrating = true;
  calibrationSamples = [];
  baselineScore = null;
}

// 수동 재보정 (UI 버튼 등에서 호출 가능)
function recalibrate() {
  if (faceCamActive) {
    startCalibration();
    console.log('[facecam] 재보정 시작');
  }
}

// ============================================
// 얼굴 감지 및 처리
// ============================================
function gotFaces(results) {
  detectedFaces = results;
  
  if (detectedFaces.length > 0) {
    processFace(detectedFaces[0]);
  } else {
    facialMood = 'none';
  }
}

function processFace(face) {
  const kp = face.keypoints;
  
  // 입꼬리 좌우
  const leftCorner = kp[61];
  const rightCorner = kp[291];
  // 눈 바깥 (얼굴 크기 정규화 기준)
  const leftEye = kp[33];
  const rightEye = kp[263];
  
  const eyeDistance = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
  const mouthWidth = dist(leftCorner.x, leftCorner.y, rightCorner.x, rightCorner.y);
  const ratio = mouthWidth / eyeDistance;
  
  smileScore = ratio;
  
  // 보정 중이면 샘플 수집
  if (isCalibrating) {
    calibrationSamples.push(ratio);
    
    if (calibrationSamples.length >= CALIBRATION_DURATION) {
      // 평균값을 기준선으로 저장
      const sum = calibrationSamples.reduce((a, b) => a + b, 0);
      baselineScore = sum / calibrationSamples.length;
      isCalibrating = false;
      console.log('[facecam] 보정 완료. 기준선:', baselineScore.toFixed(3));
    }
    
    facialMood = 'calibrating';
    return;
  }
  
  // 보정 끝났으면 기준선 대비 판정
  if (baselineScore !== null) {
    const delta = ratio - baselineScore;
    
    if (delta >= SMILE_DELTA) {
      facialMood = 'happy';
    } else if (delta <= -SAD_DELTA) {
      facialMood = 'sad';
    } else {
      facialMood = 'neutral';
    }
  }
}

// ============================================
// 웹캠 미리보기 그리기
// ============================================
function drawFaceCamPreview(x, y, w, h) {
  push();
  
  if (!faceCamActive) {
    // 웹캠 꺼진 상태
    fill(220);
    noStroke();
    rect(x, y, w, h);
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('웹캠 꺼짐', x + w/2, y + h/2);
  } else {
    // 웹캠 영상
    image(faceVideo, x, y, w, h);
    
    // 상단 상태 바
    fill(0, 0, 0, 150);
    noStroke();
    rect(x, y, w, 25);
    
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    
    let label = '';
    if (isCalibrating) {
      const progress = Math.floor((calibrationSamples.length / CALIBRATION_DURATION) * 100);
      label = `🎯 무표정 유지... ${progress}%`;
    } else if (facialMood === 'happy') {
      label = '😊 행복';
    } else if (facialMood === 'sad') {
      label = '😢 슬픔';
    } else if (facialMood === 'neutral') {
      label = '😐 무표정';
    } else {
      label = '얼굴 없음';
    }
    
    text(label, x + 8, y + 12);
    
    // 보정 중 안내 메시지
    if (isCalibrating) {
      fill(0, 0, 0, 180);
      rect(x, y + h - 30, w, 30);
      fill(255);
      textAlign(CENTER, CENTER);
      text('카메라를 보고 평소 표정을 유지하세요', x + w/2, y + h - 15);
    }
  }
  
  pop();
}

// ============================================
// 표정 인식 버튼 그리기
// ============================================
function drawFaceCamButton(x, y, w, h) {
  push();
  
  // 버튼 배경
  noStroke();
  fill(255);
  rect(x, y, w, h, 10);
  
  // 카메라 아이콘
  let cx = x + w/2;  // 버튼 중앙 x
  let cy = y + h/2;  // 버튼 중앙 y
  
  // 카메라 몸체
  fill(80);
  rect(cx - 30, cy - 15, 60, 40, 5);
  // 카메라 상단 돌출부
  rect(cx - 15, cy - 23, 30, 10, 3);
  // 렌즈 (바깥)
  fill(40);
  ellipse(cx, cy + 5, 25, 25);
  // 렌즈 (안쪽 반사)
  fill(100, 150, 200);
  ellipse(cx, cy + 5, 15, 15);
  
  // 웹캠 켜진 상태 표시 (깜빡이는 빨간 점)
  if (faceCamActive && frameCount % 60 < 30) {
    fill(255, 0, 0);
    circle(x + w - 15, y + 15, 10);
  }
  
  pop();
}

// 버튼 클릭 영역 판정 (mousePressed에서 호출)
function isFaceCamButtonClicked(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w &&
         mouseY >= y && mouseY <= y + h;
}