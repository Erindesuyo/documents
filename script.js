const homeScreen = document.getElementById('home-screen');
const animationScreen = document.getElementById('animation-screen');
const backButton = document.getElementById('back-button');
const bouncingText = document.getElementById('bouncing-text');

let x, y;
let dx = 4, dy = 4; // 속도 약간 빠르게
let animationId;

// 책 클릭 이벤트 (HTML 구조가 바뀌어도 .selectable 클래스로 동작)
// 기존 script.js의 클릭 이벤트 부분 수정
document.querySelectorAll('.selectable').forEach(book => {
    book.addEventListener('click', () => {
        const word = book.getAttribute('data-label');

        if (word === 'infinity') {
            location.href = `document.html?word=${word}`; // infinity 페이지로 이동
        } else if (word === 'subversive') {
            location.href = `document2.html?word=${word}`; // subversive 페이지로 이동
        } else {
            // 그 외의 책들 (기존 로직 유지)
            homeScreen.classList.add('hidden');
            animationScreen.classList.remove('hidden');
            initializePosition();
            startBouncing();
        }
    });
});

// Back 버튼 이벤트
backButton.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    animationScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
});

// 텍스트 위치를 화면 중앙 부근으로 초기화
function initializePosition() {
    x = window.innerWidth / 2 - bouncingText.offsetWidth / 2;
    y = window.innerHeight / 2 - bouncingText.offsetHeight / 2;
    // 방향 랜덤화 (선택 사항)
    dx = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2);
    dy = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2);
}

function startBouncing() {
    function animate() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const textWidth = bouncingText.offsetWidth;
        const textHeight = bouncingText.offsetHeight;

        // 벽 충돌 체크
        if (x + dx > screenWidth - textWidth || x + dx < 0) {
            dx = -dx;
        }
        if (y + dy > screenHeight - textHeight || y + dy < 0) {
            dy = -dy;
        }

        x += dx;
        y += dy;

        bouncingText.style.left = x + 'px';
        bouncingText.style.top = y + 'px';

        animationId = requestAnimationFrame(animate);
    }
    animate();
}