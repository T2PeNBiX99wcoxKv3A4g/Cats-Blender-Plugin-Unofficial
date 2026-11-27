# 설치 가이드 {#installation-guide}

이 가이드는 **Blender 4.2 LTS부터 5.4까지**(5.2 LTS 권장)에 Cats Blender Plugin을 설치하는 방법을 다룹니다.

> #### 이 지침을 따르라고 안내받았는데도 분명히 따르지 않았다면, 이슈는 예외 없이 닫힙니다.

## 요구 사항 {#requirements}

### 필수 소프트웨어 {#required-software}
- **Blender 4.2 LTS 이상** (5.4까지, **Blender 5.2 LTS** 권장)
  - [blender.org](https://www.blender.org/download/)에서 다운로드하세요
  - blender.org의 공식 빌드 또는 Steam 버전을 사용하세요. 다른 빌드는 지원하지 않습니다.

> ⚠ **Blender 4.1 이하는 지원하지 않습니다.** 이 애드온은 Blender 확장 기능으로 배포되며, 확장 기능 시스템은 4.2부터 존재합니다.


### Python 의존성 {#python-dependencies}
- Blender가 사용자 지정 Python 설치를 사용하는 경우 **NumPy**가 있는지 확인하세요.

> ⚠ **Windows Store 사용자:** Cats는 Windows Store 빌드의 Blender에서 작동할 수 있지만 공식적으로 지원되지는 않습니다. [blender.org](https://www.blender.org/)의 공식 빌드를 사용하세요.

> ⚠ **Linux 사용자:** Snap 및 Flatpak 버전을 포함하여 배포판이나 패키지 관리자로 설치한 Blender 빌드는 지원하지 **않습니다**. 이러한 빌드는 Blender에 포함된 Python 환경을 사용하지 않는 경우가 많아 휠 및 기타 의존성과 호환성 문제를 일으킵니다.
>
> "내 배포판이 모든 것을 더 잘한다"는 무의미한 Linux 진영 논쟁 때문에 공식 빌드를 사용하지 않으려는 사용자를 위해 무리하게 맞춰 줄 생각은 없습니다. [blender.org](https://www.blender.org/)의 공식 Blender 빌드를 사용하세요. **정말 간단한 일입니다.**
>
> 저희도 Linux 사용자이며, 이런 이야기를 해야 한다는 사실 자체가 싫습니다. 그냥 Blender 웹사이트의 공식 버전을 사용하세요.
>
> 지원되지 않는 배포판, Snap, Flatpak 또는 기타 재패키징 빌드 사용으로 인해 발생한 이슈는 즉시 닫힙니다. 이에 대한 저희 입장은 분명합니다.

## 설치 단계 {#installation-steps}

### 1단계: Cats 다운로드 {#step-1-download-cats}

저장소에서 최신 릴리스를 받으세요:
- **릴리스:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

> 📝 ZIP을 다운로드하고 **압축을 풀지 마세요**. Blender의 확장 기능 시스템은 원본 ZIP이 필요합니다.

> 📝 원본/공식 Cats가 이미 설치되어 있지 **않은지** 확인하세요. 둘은 충돌합니다. 다른 버전이 설치되어 있었다면 Blender를 재시작하세요.

### 2단계: Blender의 확장 기능 시스템으로 설치 {#step-2-install-via-blenders-extension-system}

1. **Blender 5.2 또는 5.3**을 엽니다.
2. **Edit > Preferences**로 이동합니다.
3. **Extensions** 탭을 선택합니다.
4. **Install from Disk**를 클릭합니다 (오른쪽 상단의 아래쪽 화살표 아이콘).
5. Cats ZIP을 선택하고 **Install from Disk**를 클릭합니다.

### 3단계: 확장 기능 활성화 {#step-3-enable-the-extension}

Cats는 보통 자동으로 활성화됩니다. 그렇지 않다면 Extensions 목록에서 "cats"를 검색하고 옆의 체크박스를 선택하세요.

### 4단계: 설치 확인 {#step-4-verify-installation}

1. **3D 뷰포트**를 엽니다.
2. **N**을 눌러 사이드바를 엽니다.
3. **Cats** 탭을 클릭합니다.

## 선택적 의존성 {#optional-dependencies}

일부 기능은 예전에 추가 애드온이 필요했습니다. 이제는 어느 것도 필요하지 않습니다:

### Material Combiner (텍스처 아틀라스 작업) {#material-combiner-texture-atlasing}
더 이상 필요하지도, 지원되지도 않습니다. `5.3.1.0` 이후 Cats에는 내장 [아틀라스 생성기](./Optimization.md#atlas-generator)만 있으며, Material Combiner를 구동하던 이전 *아틀라스 생성기 (레거시)* 패널은 사라졌습니다. Material Combiner가 여전히 설치되어 있다면 **Import Material Combiner Settings**를 한 번 사용하여 설정을 옮긴 후 제거하세요.

### 스케일링 도구 {#scaling-tools}
더 이상 필요하지 않습니다. [스케일링](./Scaling.md) 패널은 예전에 별도의 Immersive Scaler 애드온이 필요했습니다. 이제 Cats에는 자체 스케일러가 내장되어 있습니다. Immersive Scaler가 여전히 설치되어 있다면 제거해도 됩니다.

## 설치 문제 해결 {#troubleshooting-installation}

**확장 기능이 나타나지 않음** - Extensions 환경 설정에서 활성화되어 있는지 확인하고, Blender 버전이 지원되는지(4.2 LTS부터 5.4까지) 확인한 후 **Blender를 완전히 재시작**하세요.

**설치 중 오류** - Blender 버전이 지원되는지(4.2 LTS부터 5.4까지) 확인하고, ZIP이 손상되었을 수 있으므로 다시 다운로드하며, 확장 기능 폴더에 대한 쓰기 권한이 있는지 확인하세요.

**Cats 탭이 없음** - **N**을 누르고 확장 기능이 활성화되어 있는지 확인하며, 콘솔(Window > Toggle System Console)에서 오류를 확인하세요.

**MMD Tools를 별도로 설치하지 마세요** - Cats에는 자체 MMD Tools가 포함되어 있으며, 별도로 설치하면 충돌합니다. 독립 실행형 MMD Tools가 있으면 제거하세요. 저희가 최신 상태로 유지하는 경향이 있지만 직접 업데이트할 수도 있습니다.

**이전에 구 버전을 설치했음** - 이를 제거하고, **Blender를 재시작**한 후 새 버전을 설치하세요.

## 다음 단계 {#next-steps}

- 기본 사항은 [빠른 액세스](./Quick-Access.md) 가이드를 읽어보세요.
- [인터페이스 가이드](./Overview.md#interface-guides)를 둘러보세요.
- 문제가 발생하면 [FAQ](./FAQ.md)와 [문제 해결](./Troubleshooting.md)을 확인하세요.

---

**도움이 필요하신가요?** [문제 해결](./Troubleshooting.md) 페이지를 참조하거나 [저장소](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)에 이슈를 열어 주세요.

---

