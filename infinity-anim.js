const container = document.getElementById('tunnel-container');
const introSection = document.querySelector('.intro-section');
let isScrollingDown = false;
let rectInterval;

// 사각형 생성 함수
function createRect() {
    // 스크롤 중이거나 컨테이너가 없으면 생성 안 함
    if (!container || isScrollingDown) return;

    const rect = document.createElement('div');
    rect.classList.add('tunnel-rect');
    
    // 중앙의 정의 박스 크기와 비슷한 비율로 시작
    const baseWidth = 300;
    const baseHeight = 180;
    rect.style.width = baseWidth + 'px';
    rect.style.height = baseHeight + 'px';
    
    container.appendChild(rect);

    // scale을 0.8 정도로 크게 시작하여 정의 박스 뒤에서 바로 나오는 느낌 부여
    const animation = rect.animate([
        { 
            transform: 'scale(0.8)', 
            opacity: 0 
        },
        { 
            opacity: 1, 
            offset: 0.1 
        },
        { 
            transform: 'scale(8)', 
            opacity: 0 
        }
    ], {
        duration: 4000, 
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // 부드러운 가속도
    });

    animation.onfinish = () => rect.remove();
}

// 사각형 생성 간격
rectInterval = setInterval(createRect, 600);

// 로드 직후 실행
for(let i=0; i<6; i++) {
    setTimeout(createRect, i * 800);
}

// [추가] 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 1. intro-section 투명도 조절
    const opacity = 1 - Math.min(1, scrollY / (windowHeight / 2));
    introSection.style.opacity = opacity;

    // 2. 스크롤 위치에 따른 애니메이션 제어
    // 화면 높이의 절반 이상 스크롤하면 애니메이션 멈춤
    if (scrollY > windowHeight / 2) {
        if (!isScrollingDown) {
            isScrollingDown = true;
            // 기존 사각형들이 다 커져서 사라질 때까지 대기 후 인터벌 삭제
            // (즉시 삭제하면 뚝 끊겨 보일 수 있음)
            setTimeout(() => {
                if (isScrollingDown) clearInterval(rectInterval);
            }, 1000); 
        }
    } else {
        if (isScrollingDown) {
            isScrollingDown = false;
            // 다시 위로 스크롤하면 인터벌 재시작
            clearInterval(rectInterval);
            rectInterval = setInterval(createRect, 600);
        }
    }
});

