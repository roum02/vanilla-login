## 근본의 바닐라🔥

🙌 안녕하세요! 바닐라 자바스크립트로 만든 로그인 프로세스입니다!
<br>
제가 만든 프로젝트가 궁금하시다면,
<a href="https://albamon-vanilla-login.netlify.app/">여기서<a> 확인하실 수 있습니다!
  
Front-end Dev: <a href="https://github.com/roum02/vanilla-login">이로움</a>

Back-end Dev: <a href="https://github.com/Maestro6788/albamon">진은수</a>

## ❓ 뭐하는 프로젝트인가요?
- **근본의 바닐라**프로젝트는 **<u>vanilla javaScript로 React 프레임워크를 재현한</u>** 프로젝트에요.   
- React 프레임워크가 주는 편리성 대신 코어 아키텍쳐를 직접 설계할 수 있었던 프로젝트였어요.
- vanilla javaScript를 컴포넌트화하여 react 라이브러리 관리의 장점을 가질 수 있도록 했어요.

  ## 🛠 Stacks    
👉 only Vanilla JavaScript! 라이브러리를 사용하지 않고 바닐라 자바스크립트 내부의 리소스를 활용했어요. 

👉 Scss style

👉 webpack Module bundler

## 🙋‍♀️ 어디를 중점으로 보면 되나요?

1. [Image Caching](#-Image-Caching)
2. [Image Sprite](#-Image-Sprite)
3. [🛠 Core Architecture](#-🛠-Core-Architecture)
4. [Scss 7-1 pattern](#-Scss-7-1-pattern)   
5. [making hooks](#-기능-엿보기)  
6. [cookies](#-기능-엿보기)
7. [naming-convention](#-기능-엿보기)     
   
<br>

## Image Caching
>사용자의 대기시간을 줄이기 위해 image caching 방식을 사용했어요. 
- Image를 한번에 preload하여 기존 markup tags 방식에 비해 렌더링 속도를 단축시킬 수 있었습니다.

<br>   
   
## Image Sprite
>리소스의 단축을 통해 렌더링 방식을 줄일 수 있었어요.
- 하나의 이미지를 마치 여러 개의 이미지처럼 보이게 관리하여 웹 브라우저의 로딩 시간을 단축시켰어요.
   
<br>   
   
## 🛠 Core Architecture  
>app.js로 소급되는 architecture 방식을 사용함으로 react의 장점을 가질 수 있도록 하는 구조를 구성했어요.

### Scss 7-1 pattern
> Scss 7-1 pattern은 하나의 파일에 하위 디렉토리를 소급하는 scss 
architecture 방식이에요. 
