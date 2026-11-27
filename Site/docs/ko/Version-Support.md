# 버전 지원 {#version-support}

이 Cats 빌드가 지원하는 Blender 버전입니다.

## 지원 버전 {#supported-versions}

| Blender | 상태 |
|---|---|
| **4.2 LTS** | ✅ 지원됨 (최소) |
| **4.5 LTS** | ✅ 지원됨 |
| **5.0** | ✅ 지원됨 |
| **5.1** | ✅ 지원됨 |
| **5.2 LTS** | ✅ 지원됨 (권장) |
| **5.3** | ✅ 지원됨 |
| **5.4** | ✅ 지원됨 (알파 빌드만) |

하나의 빌드가 이들 모두를 커버합니다. 동일한 ZIP이 표의 모든 버전에 설치되므로
Cats 릴리스를 Blender 릴리스에 맞출 필요가 없습니다.

## 지원되지 않는 버전 {#unsupported-versions}

> ⚠ **Blender 4.1 이하는 지원되지 않습니다.**

Cats는 Blender **확장 기능**으로 배포되며, 확장 기능 시스템은 Blender 4.2부터만
존재합니다. 이전 버전은 경고가 있든 없든 설치 자체가 불가능합니다.

## 4.2가 하한선인 이유 {#why-42-is-the-floor}

Blender 4.2에서 확장 기능이 도입되었습니다: 매니페스트, 설치 대화 상자, 그리고 번들
Python 휠의 자동 설치입니다. 이 애드온은 세 가지를 모두 사용하므로, 레거시 애드온으로
다시 작성하지 않는 한 이전 Blender에서 로드할 방법이 없습니다.

4.2보다 오래된 버전에서 Cats를 실행해야 한다면, 그곳에서 마지막으로 작동했던 릴리스는
더 이상 유지 관리되지 않는 원본 프로젝트입니다.

## 지원 정책 {#support-policy}

Cats는 비공식 커뮤니티 후속 프로젝트입니다. 지원은 최선을 다하는 방식입니다:

- 이슈와 질문은 [GitHub 저장소](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)로 보내 주세요.
- 위 표의 모든 Blender 버전은 릴리스 전에 테스트됩니다.
- 지원 종료 일정은 없습니다. Blender 릴리스가 지원에서 빠지면 릴리스
  노트에 그렇게 명시됩니다.
- 릴리스는 `main`에서 자동으로 만들어지므로, 최신 빌드는 항상
  [릴리스 페이지](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)에 있는 빌드입니다.

## 업그레이드 {#upgrading}

1. [릴리스 페이지](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)에서 최신 릴리스를 **다운로드**합니다.
2. **Cats 설치** - [설치](./Installation.md) 가이드를 따르세요. Blender가 이전 버전을
   제자리에서 교체합니다.
3. 새 코드가 로드되도록 **Blender를 재시작**합니다.
4. **프로젝트 마이그레이션** - `.blend` 파일을 열고 결과를 확인하며 백업을 보관하세요.

> 📝 Blender는 이전 버전의 파일을 열 수 있지만, 더 새로운 Blender에서 저장한 파일은
> 이전 버전에서 올바르게 열리지 않을 수 있습니다.

## 버전 확인 {#checking-your-versions}

- **Cats 버전:** Edit > Preferences > Get Extensions에서 *Cats Blender Plugin
  (Unofficial)*을 확인합니다.
- **Blender 버전:** Help > About Blender.

**Cats 업데이트:** [설정](./Settings.md) 패널의 내장 업데이터가 모든 릴리스를
나열하며, Blender가 실행할 수 없는 릴리스의 설치는 거부됩니다.

## 도움 받기 {#getting-help}

- [저장소](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)에 이슈를 열어 주세요.
- 먼저 [문제 해결](./Troubleshooting.md)과 [FAQ](./FAQ.md)를 확인하세요.

---

**관련 페이지:**
- [설치](./Installation.md) - Cats 설치
- [설정](./Settings.md) - 업데이트 관리
- [FAQ](./FAQ.md) - 일반적인 질문
- [문제 해결](./Troubleshooting.md) - 문제 해결
