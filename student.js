// URLパラメータから学生IDを取得
function getStudentIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// 学生データを読み込んで表示
async function loadStudentDetail() {
    try {
        const studentId = getStudentIdFromURL();
        
        if (!studentId) {
            throw new Error('学生IDが指定されていません');
        }
        
        const response = await fetch('../students.json');
        const data = await response.json();
        
        const student = data.students.find(s => s.id == studentId);
        
        if (!student) {
            throw new Error('学生が見つかりません');
        }
        
        displayStudentDetail(student);
    } catch (error) {
        console.error('学生データの読み込みに失敗しました:', error);
        document.getElementById('student-content').innerHTML = 
            '<p style="color: #dc2626;">データの読み込みに失敗しました。</p>';
    }
}

// 学生詳細を表示
function displayStudentDetail(student) {
    const content = document.getElementById('student-content');
    
    // スキルバッジを生成
    const skillsHTML = student.skills.map(skill => 
        `<span class="skill-badge">${skill}</span>`
    ).join('');
    
    // 複数ポートフォリオを生成
    const portfoliosHTML = student.portfolios.map(portfolio => `
        <div class="portfolio-item">
            <h4>${portfolio.title}</h4>
            <p>${portfolio.description}</p>
            <a href="${portfolio.url}" class="portfolio-button" target="_blank">
                作品を見る →
            </a>
        </div>
    `).join('');
    
    content.innerHTML = `
        <div class="detail-card">
            <div class="detail-header">
                <h2>${student.name}</h2>
                <p class="detail-meta">${student.major} / ${student.year}</p>
            </div>
            
            <div class="detail-section">
                <h3>プロフィール</h3>
                <p>${student.description}</p>
            </div>
            
            <div class="detail-section">
                <h3>スキル</h3>
                <div class="skills-list">
                    ${skillsHTML}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>作品ポートフォリオ</h3>
                ${portfoliosHTML}
            </div>
        </div>
    `;
    
    // ページタイトルを更新
    document.title = `${student.name} - 河原電子ビジネス専門学校`;
}

// ページ読み込み時に学生詳細を取得
document.addEventListener('DOMContentLoaded', loadStudentDetail);
