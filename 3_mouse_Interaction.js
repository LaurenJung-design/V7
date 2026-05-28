function mousePressed() {
  // 먹이주기 버튼을 누르면 경험치와 배고픔 게이지 증가
  if (mouseX >= 10 && mouseX <= 110 && mouseY >= height - 110 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_hunger >= cooldownTime_hunger) {
      hunger += 50;
      hunger = constrain(hunger, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);
        
      lastClickedTime_hunger = millis(); // 쿨타임 시작 타임스탬프 찍기
    } 
  }

  // 말풍선 버튼을 누르면 경험치와 행복도 증가 및 키보드 인터렉션
  if (mouseX >= 120 && mouseX <= 220 && mouseY >= height - 110 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_happiness >= cooldownTime_happiness) {
      let key_interaction;
      key_interaction = prompt("이름을 불러주세요!");
      if (key_interaction === pet_name) {
        console.log("좋아하네요");

        happiness += 50;
        happiness = constrain(happiness, 0, 175);
        experience += 5;
        experience = constrain(experience, 0, 70);
      
        lastClickedTime_happiness = millis(); // 쿨타임 시작 타임스탬프 찍기
      }
    } 
  }

  // 씻기기 버튼을 누르면 경험치증가 피로도 감소
  if (mouseX >= 230 && mouseX <= 330 && mouseY >= height - 110 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_fatigue1 >= cooldownTime_fatigue1) {
      fatigue -= 50;
      fatigue = constrain(fatigue, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);
        
      lastClickedTime_fatigue1 = millis(); // 쿨타임 시작 타임스탬프 찍기
    } 
  }

  if (mouseX >= 340 && mouseX <= 440 && mouseY >= height - 110 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_fatigue2 >= cooldownTime_fatigue2) {
      fatigue -= 50;
      fatigue = constrain(fatigue, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);

      lastClickedTime_fatigue2 = millis(); // 쿨타임 시작 타임스탬프 찍기
    } 
  }
}