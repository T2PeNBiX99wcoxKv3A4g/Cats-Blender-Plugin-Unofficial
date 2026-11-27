# 설정 {#settings}

설정 및 업데이트 패널은 Cats Blender Plugin의 구성 옵션과 업데이트 관리를 제공합니다.

## 일반 설정 {#general-settings}

### 내보내기 옵션 {#export-options}

#### 텍스처 포함 {#embed-textures}
- 텍스처를 내보낸 파일에 직접 포함합니다
- 파일 크기가 증가합니다
- 자체 완결형 내보내기
- 모델 공유에 유용합니다

**활성화할 때:**
- 텍스처와 함께 FBX 파일을 공유할 때
- 단일 파일 배포
- 별도의 텍스처 관리가 필요 없음

> **Unity/VRChat용으로 무언가를 만드는 경우 텍스처를 포함하지 마세요. 머티리얼은 Unity에서 설정해야 합니다**

**비활성화할 때:**
- 파일 크기를 작게 유지할 때
- Unity에서 텍스처를 별도로 관리할 때
- 더 나은 에셋 정리

#### 리지드 바디/조인트 제거 {#remove-rigidbodiesjoints}
- 내보내기 중 물리를 정리합니다
- MMD 물리 데이터를 제거합니다
- 파일 복잡도를 줄입니다
- VRChat 내보내기에 권장됩니다

**활성화할 때:**
- MMD 모델을 내보낼 때
- 물리 데이터가 필요 없을 때
- 더 깔끔한 내보내기

**비활성화할 때:**
- 물리를 보존해야 할 때
- 대상 애플리케이션에서 물리를 사용할 때

#### 번역 CSV 내보내기 {#export-translation-csv}
- 내보내기 중 번역 파일을 생성합니다
- 이름 매핑이 포함된 CSV를 만듭니다
- `5.2.4.0` 이후로 **source** 열이 포함됩니다: 사전, MMD 작성자 이름 또는 온라인 서비스
- 문서화에 유용합니다
- 번역 참고 자료

**활성화할 때:**
- 번역 문서가 필요할 때
- 번역을 검토하고 싶을 때
- 모델 문서를 만들 때

**비활성화할 때:**
- 번역 기록이 필요 없을 때
- 내보내기 시간을 줄일 때

#### 사용자 지정 내보내기 디렉터리 {#custom-export-directory}
- 내보내기에 선호하는 저장 위치를 설정합니다
- 선택을 기억합니다
- 더 빠른 워크플로
- 정리된 파일 관리

**설정 방법:**
1. 폴더 아이콘을 클릭합니다
2. 원하는 위치로 이동합니다
3. 폴더를 선택합니다
4. 이후 내보내기의 기본 위치가 됩니다

---

## 언어 설정 {#language-settings}

### 인터페이스 언어 {#interface-language}

Cats는 사용자 인터페이스에 여러 언어를 지원합니다.

#### 사용 가능한 언어 {#available-languages}

- **영어 (en_US)** - 기본값
- **일본어 (ja_JP)**
- **한국어 (ko_KR)**
- 커뮤니티가 번역을 제공하는 추가 언어

#### 언어 변경 {#changing-language}

1. 드롭다운에서 언어를 선택합니다
2. 약 2초 후 Cats가 자체적으로 다시 로드됩니다 (다른 애드온이 아닌 Cats만)
3. UI 요소가 선택한 언어로 업데이트됩니다

Blender를 재시작할 필요가 없습니다. 레이블이 바뀌지 않으면 Blender를 재시작하세요.

#### 사용자 지정 언어 파일 {#custom-language-files}

Cats는 사용자 지정 번역 파일을 지원합니다:
- 번들 파일은 확장 기능 내부의 `resources/translations/`에 있습니다. **Download Latest Translations**는 최신 사본을 Cats의 [사용자 데이터 폴더](#settings-file-location)에 있는 `translations` 폴더에 저장하며, 해당 파일들이 먼저 사용됩니다
- 손상되었거나 일부만 다운로드된 언어 파일은 건너뜁니다. Cats는 로딩에 실패하는 대신 번들 사본, 그다음 영어로 대체됩니다
- JSON 형식
- 커뮤니티가 번역을 기여할 수 있습니다
- 새 언어를 쉽게 추가할 수 있습니다

### 번역 관리 {#translation-management}

**번역 파일 구조:**
- 각 언어에는 JSON 파일이 있습니다
- UI 문자열 매핑을 포함합니다
- 편집과 확장이 쉽습니다
- 새 언어용 템플릿이 제공됩니다

---

## 디버그 옵션 {#debug-options}

### 유지 관리 도구 {#maintenance-tools}

#### Google 사전 초기화 {#reset-google-dictionary}
- 캐시된 Google Translate 데이터를 지웁니다
- 번역이 잘못된 경우 유용합니다
- 새 번역을 강제합니다
- 안전하게 사용할 수 있습니다

**사용 시점:**
- 번역이 잘못된 것처럼 보일 때
- 새 번역 데이터를 원할 때
- 주요 업데이트 후
- 번역 문제를 해결할 때

**사용 방법:**
1. **Google 사전 초기화**를 클릭합니다
2. 작업을 확인합니다
3. 사전 캐시가 지워집니다

#### 번역 디버깅 (개발 브랜치) {#translation-debugging-dev-branch}
- 개발 브랜치에서 사용 가능
- 번역 과정의 세부 정보를 표시합니다
- 번역 문제를 파악하는 데 도움
- 고급 사용자/개발자용

#### 시스템 캐시 정리 {#system-cache-cleanup}
- 다양한 캐시 데이터를 지웁니다
- 임시 파일을 초기화합니다
- 이상한 문제 해결에 도움이 될 수 있습니다
- 주기적으로 사용해도 안전합니다

**사용 시점:**
- 플러그인이 이상하게 동작할 때
- 업데이트 후
- 원인을 알 수 없는 문제를 해결할 때

#### 구성 초기화 옵션 {#configuration-reset-options}
- 기본 설정을 복원합니다
- 사용자 지정 구성을 지웁니다
- 새로 설치한 상태로 되돌립니다
- 설정이 손상된 경우 사용합니다

> ⚠ **경고:** 구성 초기화는 실행 취소할 수 없습니다. 사용자 지정 설정을 잃게 됩니다.

---

## 업데이트 관리 {#update-management}

### 버전 관리 {#version-control}

#### 업데이트 알림 {#update-notifications}
- 새 버전을 자동으로 확인합니다
- 업데이트가 있을 때 표시합니다
- 플러그인 인터페이스에 표시됩니다
- 방해되지 않는 알림

**구성:**
- 업데이트 확인 활성화/비활성화
- 확인 빈도 설정
- 알림 스타일 선택

#### 자동 업데이트 확인 {#automatic-update-checks}
- Cats가 로드될 때 백그라운드에서 한 번 실행됩니다
- [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)의 릴리스를 확인합니다
- 설치된 버전과 비교합니다
- 사용 가능할 때 업데이트 버튼을 표시합니다

`5.3.1.0` 이후로 업데이터는 해당 Blender 버전용으로 만들어진 릴리스만이 아니라 모든 Cats 릴리스를 나열합니다. 하나의 릴리스가 여러 Blender 버전을 지원할 수 있기 때문입니다. Blender 자체가 각 릴리스의 지원 Blender 범위를 확인하고, 해당 Blender에서 실행할 수 없는 것은 설치를 거부합니다.

**작동 방식:**
1. Cats가 GitHub에서 릴리스 목록을 확인합니다
2. 버전 번호를 비교합니다
3. 더 새로운 버전이 있으면 알립니다
4. 다운로드 링크를 제공합니다

> **Blender의 온라인 액세스가 필요합니다.** Cats는 **Edit > Preferences > System > Network > Allow Online Access**가 켜져 있을 때만 업데이트를 확인합니다. 꺼져 있으면 자동 확인이 조용히 건너뛰어지고, **Check for Updates**는 온라인 액세스가 비활성화되어 있다는 메시지를 표시합니다.

#### 버전 호환성 정보 {#version-compatibility-info}
- Blender 버전이 지원되는지 표시합니다
- 호환되지 않는 버전에 대해 경고합니다
- 올바른 버전을 권장합니다
- 설치 문제를 방지합니다

#### 릴리스 노트 액세스 {#release-notes-access}
- 업데이트 변경 로그를 봅니다
- 새로운 내용을 확인합니다
- 버그 수정을 이해합니다
- 업데이트 알림에서 액세스합니다

### 업데이트 관리 {#managing-updates}

#### 수동으로 업데이트 확인 {#checking-for-updates-manually}

1. 설정 패널을 엽니다
2. **Check for Updates**를 클릭합니다
3. 확인이 완료될 때까지 기다립니다
4. 업데이트가 있으면 안내를 따릅니다

#### 업데이트 설치 {#installing-updates}

1. 제공된 링크에서 새 버전을 다운로드합니다
2. Blender를 종료합니다
3. 이전 버전을 제거합니다:
   - Edit > Preferences > Extensions로 이동합니다
   - Cats를 찾습니다
   - 확장 기능을 제거합니다
4. Blender를 재시작합니다
5. 새 버전을 설치합니다
6. 확장 기능을 활성화합니다

> 📝 **참고:** 가장 깔끔한 설치를 위해 이전 버전을 제거하고 새 버전을 설치하는 사이에 항상 Blender를 재시작하세요.

#### 버전 번호 이해하기 {#understanding-version-numbers}

Cats는 세 부분으로 된 시맨틱 버전 관리를 사용합니다:

- **Major.Minor.Patch** (예: `5.5.0`)
- **Major.Minor**는 이 후속 프로젝트가 시작된 Blender 시리즈를 나타내며, 동일한 빌드가 지원되는 모든 Blender 버전에 계속 설치됩니다
- **Patch**는 릴리스, 기능, 수정 사항을 함께 셉니다

예시:

- `5.3.9` - 패치 릴리스
- `5.4.0` - 문서 사이트를 추가한 릴리스
- `5.5.0` - 사이트에 모든 UI 언어를 추가한 릴리스

각 릴리스가 지원하는 Blender 버전은 [버전 지원](./Version-Support.md)을 참조하세요.

---

## 설정 모범 사례 {#settings-best-practices}

### 내보내기 설정 {#export-settings}

**VRChat에 권장:**
- ❌ 텍스처 포함: 끔 (Unity에서 처리)
- ✅ 리지드 바디/조인트 제거: 켬
- ❌ 번역 CSV 내보내기: 끔 (필요하지 않은 경우)
- ✅ 사용자 지정 내보내기 디렉터리: 프로젝트 폴더로 설정

**모델 공유에 권장:**
- ✅ 텍스처 포함: 켬 (받는 사람에게 더 쉬움)
- ✅ 리지드 바디/조인트 제거: 켬
- ✅ 번역 CSV 내보내기: 켬 (문서화)
- ✅ 사용자 지정 내보내기 디렉터리: 내보내기 폴더로 설정

### 업데이트 설정 {#update-settings}

**권장:**
- ✅ 자동 업데이트 확인 활성화
- ✅ 매일 또는 매주 확인
- ✅ 업데이트 전에 릴리스 노트 읽기
- ✅ 주요 업데이트 전에 백업 보관

### 언어 설정 {#language-settings-1}

**최상의 경험을 위해:**
- 편하다면 영어 사용 (대부분의 문서가 영어)
- 더 잘 이해하려면 모국어 사용
- 커뮤니티를 돕기 위해 누락된 번역 보고
- 사용하는 언어가 제공되는지 확인

---

## 설정 문제 해결 {#troubleshooting-settings}

### 설정이 저장되지 않음 {#settings-not-saving}

**가능한 원인:**
- 권한 문제
- 손상된 환경 설정
- Blender가 제대로 종료되지 않음

**해결 방법:**
- 폴더 권한 확인
- 구성 초기화
- Blender 환경 설정을 수동으로 저장
- 필요하면 재설치

### 업데이트가 표시되지 않음 {#updates-not-showing}

**가능한 원인:**
- Blender의 **Allow Online Access**가 꺼져 있음
- 업데이트 확인이 비활성화됨
- 인터넷 연결 없음
- 방화벽이 github.com을 차단함
- VPN 간섭
- HTTPS 인증서를 대체하는 프록시 또는 보안 소프트웨어 (Cats는 업데이트 서버의 인증서를 검증합니다)

**해결 방법:**
- **Edit > Preferences > System > Network > Allow Online Access**를 켭니다
- 업데이트 확인을 활성화합니다
- 인터넷 연결을 확인합니다
- 방화벽에서 github.com을 허용합니다
- VPN을 일시적으로 비활성화합니다
- 시스템 콘솔을 확인합니다: `URL ERROR`는 Cats가 업데이트 서버에 접속하지 못했거나 인증서를 신뢰할 수 없었음을 의미합니다

### 언어가 변경되지 않음 {#language-not-changing}

**가능한 원인:**
- Cats의 자동 다시 로드 실패 (시스템 콘솔에서 `Cats reload failed` 확인)
- 번역 파일 누락
- 손상된 언어 파일 (Cats는 번들 파일 또는 영어로 대체됨)

**해결 방법:**
- Blender를 완전히 재시작합니다
- 번역 파일이 있는지 확인합니다
- **Download Latest Translations**를 다시 클릭하거나 필요하면 재설치합니다

---
## 설정 파일 위치 {#settings-file-location}

Cats는 자체 사용자 데이터 폴더에 설정을 보관하므로 Cats 업데이트 후에도 유지됩니다. Blender의 `extensions/.user` 디렉터리 아래에 있는 확장 기능 폴더입니다 (디스크에서 설치한 경우 저장소 부분은 보통 `user_default`입니다):
- Windows: `%APPDATA%\Blender Foundation\Blender\5.x\extensions\.user\user_default\cats_blender_plugin\`
- macOS: `~/Library/Application Support/Blender/5.x/extensions/.user/user_default/cats_blender_plugin/`
- Linux: `~/.config/blender/5.x/extensions/.user/user_default/cats_blender_plugin/`

포함되는 항목:
- `settings.json` - 번역 서비스 API 키를 포함한 Cats 설정
- `dictionary_google.json` - 온라인 번역 캐시
- `dictionary.json` 및 `translations/` - 다운로드한 사전 및 언어 파일

설정은 전역입니다. `.blend`를 열 때마다 다시 적용되므로 다른 값으로 저장된 파일이 설정을 덮어쓰지 않습니다. `5.3.1.0` 이후로 번역 API 키, LibreTranslate URL, MyMemory 이메일은 **절대 `.blend` 파일에 기록되지 않으며**, 이전 버전에서 파일에 저장했던 값은 파일을 열 때 제거됩니다.

> ⚠ **경고:** 이러한 파일을 수동으로 편집하면 문제가 발생할 수 있습니다. 가능하면 설정 패널을 사용하세요.

---

## Blender 환경 설정과의 통합 {#integration-with-blender-preferences}

Cats는 Blender의 환경 설정을 존중합니다:
- 파일 경로
- 언어 설정 (가능한 경우)
- 인터페이스 스케일
- 테마 설정

Cats는 로드할 때 Blender 환경 설정을 변경하지 **않습니다**. 이전 버전은 파일 압축을 켜고 애드온 지원 필터를 변경했습니다. `5.3.1.0` 이후로 환경 설정은 설정한 그대로 유지됩니다.

---

## 재시작이 필요한 변경 사항 {#changes-requiring-restart}

일부 설정은 Blender 재시작이 필요합니다:
- ❌ 언어 변경 (Cats가 자체적으로 다시 로드됨)
- ✅ 주요 구성 초기화
- ❌ 내보내기 옵션 (즉시 적용)
- ❌ 업데이트 확인 (즉시 적용)

---

**관련 페이지:**
- [설치](./Installation.md) - Cats 설치
- [빠른 액세스](./Quick-Access.md) - 내보내기 기능 사용
- [문제 해결](./Troubleshooting.md) - 일반적인 문제
- [FAQ](./FAQ.md) - 자주 묻는 질문

---

