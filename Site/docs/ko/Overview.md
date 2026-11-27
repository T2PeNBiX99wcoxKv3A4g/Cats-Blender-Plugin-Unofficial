> ℹ **이 페이지들은 Cats Blender Plugin의 기능 집합을 문서화합니다.** 이 문서는 이 포크가 이어받은 업스트림 릴리스를 위해 작성되었으며, 이 빌드는 Blender 4.2 LTS부터 5.4까지 지원합니다.
>

# Cats Blender Plugin - 위키 {#cats-blender-plugin---wiki}

비공식 커뮤니티 후속 프로젝트로 유지 관리되는 **Cats Blender Plugin** 문서에 오신 것을 환영합니다.

Cats는 VRChat 및 기타 플랫폼용 모델을 가져오고 최적화하는 데 필요한 단계를 줄이도록 설계된 도구입니다. MMD, XNALara, Mixamo, Source Engine, VRM, glTF/GLB, FBX, DAE 등 다양한 형식을 지원합니다.

## 버전 지원 {#version-support}

| | |
|---|---|
| **지원 Blender** | **4.2 LTS**부터 **5.4**까지 |
| **권장** | **Blender 5.2 LTS** |


## 빠른 링크 {#quick-links}

### 시작하기 {#getting-started}
- [설치](./Installation.md) - Cats 및 선택적 애드온 설치 방법
- [버전 지원](./Version-Support.md) - 지원 및 지원 종료 버전

### 인터페이스 가이드 {#interface-guides}
- [빠른 액세스](./Quick-Access.md) - 가져오기/내보내기, **MMD 모델 수정**, 빠른 작업 및 포즈 모드
- [최적화](./Optimization.md) - 머티리얼, 메시 정리, 셰이프 키, 본 및 웨이트, 내장 아틀라스 생성기 (알파)
- [변환기](./Converters.md) - Rigify, Source/Valve, VRM 및 MMD 정리 (이전 이름 "MMD 옵션")
- [병합 및 부착](./Merge-and-Attach.md) - 아마추어 병합 및 메시 부착 (이전 이름 "사용자 지정 모델 생성")
- [번역](./Translation.md) - 새로운 다중 서비스 번역 시스템
- [본 도구](./Bone-Tools.md) - 발가락 보행 다리 및 트위스트 본
- [UV 도구](./UV-Tools.md) - UV 가장자리 정렬 및 최단 심 경로 찾기
- [입 모양](./Visemes.md) - 립싱크 설정
- [눈 추적](./Eye-Tracking.md) - 눈 움직임 및 깜빡임 설정
- [본 페어런팅](./Bone-Parenting.md) - 루트 본 관리
- [스케일링](./Scaling.md) - 내장 아바타 크기 재조정, 손가락 벌리기 및 스케일 맞추기
- [설정](./Settings.md) - 플러그인 구성 및 업데이트

### 도움말 및 지원 {#help-support}
- [문제 해결](./Troubleshooting.md) - 일반적인 문제와 해결 방법
- [FAQ](./FAQ.md) - 자주 묻는 질문

## 5.3.1.0의 새로운 기능 {#whats-new-in-5310}

- **Blender 4.2 LTS 이상** - 4.2 LTS부터 5.4까지 지원합니다. [버전 지원](./Version-Support.md)을 참조하세요.
- **Material Combiner 제거** - *아틀라스 생성기 (레거시)* 패널이 사라졌습니다. 내장 도구는 이제 단순히 **[아틀라스 생성기](./Optimization.md#atlas-generator)**입니다. Material Combiner가 설치되어 있으면 **Import Material Combiner Settings**가 여전히 이전 설정을 복사합니다.
- **아틀라스 수정** - 각 빌드가 고유한 이름을 받으므로 두 번째 아바타를 아틀라스 처리해도 첫 번째 아바타의 아틀라스를 더 이상 덮어쓰지 않습니다 (폴더에 저장할 때도 기존 PNG를 덮어쓰지 않음). 단색 및 색조가 적용된 머티리얼이 이제 너무 어둡지 않고 올바른 색상으로 나옵니다. 연결된 복제 메시는 더 이상 두 번 리매핑되지 않고, 오브젝트 간에 공유되는 베이크 머티리얼은 모든 오브젝트의 면을 유지하며, 베이킹은 항상 이미지 텍스처를 대상으로 하고(버텍스 컬러는 절대 건드리지 않음), 폴더 저장 실패 시 아틀라스를 잃지 않고 .blend에 패킹합니다. 대규모 빌드는 메모리를 훨씬 적게 사용하고 축소된 텍스처의 앨리어싱이 줄어듭니다.
- **API 키는 .blend 파일에 남지 않음** - DeepL / LibreTranslate 키, LibreTranslate URL, MyMemory 이메일은 Cats 자체 설정 파일에만 보관되며, 이전 파일에 저장된 키는 파일을 열 때 제거됩니다. [번역](./Translation.md)을 참조하세요.
- **언어 변경 시 Cats만 다시 로드** - 모든 애드온이 아닌 Cats만 다시 로드되며, 손상되었거나 일부만 다운로드된 번역 파일이 있어도 Cats 로딩이 중단되지 않고 번들 또는 영어 파일로 대체됩니다.
- **Cats가 더 이상 Blender 환경 설정을 변경하지 않음** - 로드할 때 변경하지 않으며, .blend를 열 때마다 Cats 설정이 다시 적용됩니다.
- **Blender 버전 전반의 업데이트** - 업데이터가 이제 해당 Blender 버전용으로 만들어진 릴리스만이 아니라 모든 릴리스를 나열합니다. Blender 자체가 해당 버전에서 실행할 수 없는 것은 차단합니다.
- **수정 사항** - Blender 5.x의 VMD 모션 가져오기, F9 재실행 시 스케일러 도구 충돌, 한 세션에서 두 번 이상 실행할 때 셰이프 키를 손상시키던 중복 버텍스 제거, 다시 로드한 후 일부 패널과 오퍼레이터가 누락되는 문제.
- 크레딧 패널에서 **Support Us** 버튼이 제거되었습니다.

## 5.2.4.0의 새로운 기능 {#whats-new-in-5240}

- **내장 아틀라스 도구 (알파)** - Material Combiner나 Pillow 없이 아틀라스 작업을 하는 새로운 **[아틀라스 생성기 (신규)](./Optimization.md#atlas-generator)** 하위 패널입니다. 하나의 레이아웃에서 알베도와 선택적 노멀, 이미션, 러프니스, 메탈릭, AO, 높이 맵을 생성하고, 가장자리 확장으로 셀을 패딩하여 밉 레벨이 번지지 않게 하며, Cycles로 절차적 머티리얼을 베이크할 수 있습니다. **Material Combiner가 당분간 여전히 기본**이며 Blender 5.3 릴리스에서 제거됩니다.
- **MMD 작성자 영어 이름** - 모델 작성자가 PMX 파일에 저장한 영어 이름을 이제 번역 시 사용합니다. 셰이프 키는 사전 → 작성자 이름 → 온라인 서비스 순서로 처리되며, [번역](./Translation.md#author-names-mmd)의 새로운 **작성자 이름** 설정(**Fill Gaps** / **Prefer Author Names** / **Off**)으로 제어되고 MMD 모델 수정이 이를 반영합니다. 머티리얼은 기본적으로 이를 사용하며 토글할 수 있습니다. 본과 오브젝트는 변경되지 않습니다. MMD 모델 수정은 MMD 루트를 삭제하기 전에 이름을 보관하며, 번역 CSV 내보내기에 *source* 열이 추가되었습니다. 가볍게 테스트되었으며 피드백을 환영합니다.
- **MMD Tools 4.5.14** 번들.
- 라이선스 문구를 전체적으로 MIT로 수정.

## 5.2.3.0의 새로운 기능 {#whats-new-in-5230}

- **인터페이스 재구성** - 도구가 예상되는 위치에 있도록 패널이 재구성되었습니다. **MMD 모델 수정**은 이제 [빠른 액세스](./Quick-Access.md) 상단에 있으며, 모든 형식 변환이 단일 [변환기](./Converters.md) 패널로 이동했습니다.
- **새로운 번역 시스템** - 플러그 가능한 [번역](./Translation.md) 백엔드로 내부 사전, Google, DeepL, LibreTranslate, MyMemory 중에서 선택할 수 있습니다. 이전에 번들로 포함되던 Google 모듈은 제거되었습니다.
- **[UV 도구](./UV-Tools.md)** - *Align UV Edges to Target*과 *Find Shortest Seam Path*가 있는 완전히 새로운 패널입니다.
- **[본 도구](./Bone-Tools.md)** - 발가락 보행 다리와 트위스트 본 생성이 이제 자체 위치를 갖습니다.
- **glTF / GLB 가져오기** 및 통합된 Rigify 감지.
- **Blender 5.1 & 5.2** 지원 (5.2 LTS 권장).

## 주요 기능 {#key-features}

- **모델 가져오기/내보내기** - MMD, XNALara, Source, VRM, glTF/GLB, FBX, DAE 등
- **MMD 모델 수정** - 새 MMD/VRM 가져오기를 Unity/VRChat용으로 원클릭 변환
- **최적화** - 머티리얼 결합, 텍스처 아틀라스 작업(내장, 추가 애드온 불필요), 본 병합, 중복 버텍스 제거
- **변환기** - Rigify → Cats, Source/Valve, VRM 수정, MMD 정리
- **병합 및 부착** - 아마추어 결합 및 메시 부착
- **번역** - 내부 사전 우선, 선택적 온라인 서비스로 빈 부분 보완
- **눈 추적 및 입 모양** - VRChat 아바타용 자동 설정
- **UV 및 본 도구** - 목적에 맞는 메시/리그 도우미

## 커뮤니티 및 지원 {#community-support}

- **소스 및 릴리스:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)

> 더 이상 Discord 서버나 웹사이트를 운영하지 않습니다. 모든 지원, 버그 보고 및 논의는 위의 Git 저장소에서 이루어집니다.

## 기여 {#contributing}

기여를 환영합니다! Cats 개선에 도움을 주고 싶다면 [저장소](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)에 풀 리퀘스트를 자유롭게 열어 주세요.

---

