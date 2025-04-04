// script.js

// 포트폴리오 데이터를 로드하고 썸네일을 생성하는 함수
document.addEventListener('DOMContentLoaded', () => {
    fetch('portfolio.json')
        .then(response => response.json())
        .then(data => {
            initializePortfolio(data);
        })
        .catch(error => console.error('포트폴리오 로드 오류:', error));
});

// 포트폴리오 초기화 함수
function initializePortfolio(portfolioData) {
    const portfolioContainer = document.getElementById('portfolioContainer');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 15;
    const totalPages = Math.ceil(portfolioData.length / itemsPerPage);
    let currentPage = 1;

    // 페이지별 썸네일 표시 함수
    function displayPage(page) {
        portfolioContainer.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = portfolioData.slice(start, end);

        pageItems.forEach(item => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.style.backgroundColor = getRandomColor();
            thumbnail.dataset.id = item.id;

            // 클릭 이벤트 추가
            thumbnail.addEventListener('click', () => {
                openModal(item.details);
            });

            portfolioContainer.appendChild(thumbnail);
        });
    }

    // 페이지 버튼 생성
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.disabled = true;
        btn.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
            updatePagination();
        });
        pagination.appendChild(btn);
    }

    // 페이징 업데이트 함수
    function updatePagination() {
        const buttons = pagination.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = parseInt(btn.textContent) === currentPage;
        });
    }

    // 초기 페이지 표시
    displayPage(currentPage);

    // 모달 닫기 이벤트
    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click', closeModal);

    // 외부 클릭 시 모달 닫기
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('detailModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 모달 열기 함수
function openModal(details) {
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '';

    details.forEach(detail => {
        const img = document.createElement('div');
        img.classList.add('detail-image');
        img.style.backgroundColor = getRandomColor();
        img.style.paddingTop = '133.33%'; // 3:4 비율
        modalContent.appendChild(img);
    });

    modal.style.display = 'block';
}

// 모달 닫기 함수
function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
}

// 랜덤 단색 생성 함수
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
