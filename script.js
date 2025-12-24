// students.json からデータを読み込んで学生カードを表示
async function loadStudents() {
    try {
        const response = await fetch('students.json');
        const data = await response.json();
        displayStudents(data.students);
    } catch (error) {
        console.error('学生データの読み込みに失敗しました:', error);
        document.getElementById('students-grid').innerHTML = 
            '<p style="color: #dc2626; text-align: center;">データの読み込みに失敗しました。</p>';
    }
}

// 学生カードを表示
function displayStudents(students) {
    const grid = document.getElementById('students-grid');
    
    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.onclick = () => {
            window.location.href = `student/?id=${student.id}`;
        };
        
        // スキルタグを生成（最大3つまで表示）
        const skillsHTML = student.skills.slice(0, 3).map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
        
        card.innerHTML = `
            <h3>${student.name}</h3>
            <p class="student-info">${student.major} / ${student.year}</p>
            <p>${student.summary}</p>
            <div class="student-skills">
                ${skillsHTML}
                ${student.skills.length > 3 ? `<span class="skill-tag">+${student.skills.length - 3}</span>` : ''}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ページ読み込み時に学生データを取得
document.addEventListener('DOMContentLoaded', loadStudents);
