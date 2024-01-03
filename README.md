## 지뢰찾기 게임

<img src="https://github.com/Lee-Young-Jae/minesweeper/assets/78532129/c8167a22-d8d4-4834-8aaf-ec1125d80ec3" width="40%">

지뢰찾기 게임을 React로 구현해본다.

## 🛠 기술 스택
TypeScript,
React,
Redux Toolkit,
styled-components

## 🛠 설치 및 실행

터미널에 다음과 같이 입력합니다.

디렉토리로 이동합니다.

```shell
$cd frontend
```

npm을 이용해 필요한 모듈을 설치합니다.

```shell
$npm install
```

앱을 실행합니다.

```git
$npm start
```

## 📃 기능 요구사항

- [x] 지뢰 찾기 게임을 구현하기

  - [x] 첫 번째 빈칸을 열엇을 경우에는 지뢰가 터지면 안된다.
  - [x] 게임 타이머를 구현한다.
  - [x] 오른쪽 클릭 깃발 기능
  - [x] 난이도 변경이 가능해야 한다.

    - Beginner (8X8, 10개 지뢰)
    - Intermediate (16X16, 40개 지뢰)
    - Expert (32X16, 100개 지뢰)
    - Custom (사용자가 직접 지정)
      - 설정 가능한 가로, 세로는 최대 100X100까지 가능하다.
      - 지뢰 개수는 격자칸 수의 1/3 이하로 설정 가능하다.

  - 추가 구현 사항
    - [x] 양쪽 클릭 가능 (Area Open)
    - [x] 난이도 데이터 저장 (브라우저 새로고침 시 유지)


## 👨‍💻 미리보기



##### 첫 클릭엔 지뢰가 나타나지 않는다.
<img src="https://github.com/Lee-Young-Jae/minesweeper/assets/78532129/c7070542-73b3-485c-b846-198144a34693" width="60%">

##### 우클릭(깃발), 양쪽클릭(Area Open) 기능
<img src="https://github.com/Lee-Young-Jae/minesweeper/assets/78532129/2e977710-277a-4307-b43b-382ec8309f16" width="60%">

##### 난이도 변경 (Beginner, Intermediate, Expert, Custom)
<img src="https://github.com/Lee-Young-Jae/minesweeper/assets/78532129/b5473fd3-3da4-4d39-85df-38c9c29fdbfc" width="60%">

##### 지뢰찾기 성공!
<img src="https://github.com/Lee-Young-Jae/minesweeper/assets/78532129/926af4ad-f3d8-4244-9b5b-34f0378fa35f" width="60%">

##### 지뢰찾기 실패...
<img src="https://github.com/Lee-Young-Jae/minesweeper/assets/78532129/6d536624-488d-4c4a-a525-c3ad1770544a" width="60%">
