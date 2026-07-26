// داده پیش‌فرض
const D = {
    name: 'آرین بلاغی اینالو',
    title: 'توسعه‌دهنده وب | خالق تجربه‌های دیجیتال',
    bio: 'من به ساختن فضاهای دیجیتالی که هم زیبا باشند و هم کاربردی، علاقه دارم. هر پروژه برای من یک داستان جدید است.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Git'],
    projects: [
        { title: 'وبسایت فروشگاهی', desc: 'طراحی و پیاده‌سازی فروشگاه آنلاین با React و Node.js' },
        { title: 'اپلیکیشن مدیریت تسک', desc: 'اپلیکیشن مدیریت وظایف روزانه با ذخیره‌سازی ابری' },
        { title: 'وبسایت شخصی', desc: 'قالب پورتفولیو شخصی با پنل مدیریت ساده' }
    ],
    email: 'arian@example.com',
    phone: '0912-XXX-XXXX',
    location: 'تهران، ایران',
    showIntro: true,
    showSkills: true,
    showProjects: true,
    showContact: true
};


// توابع اصلی

function load() {
    try {
        const d = JSON.parse(localStorage.getItem('pData'));
        if (d && d.projects) return { ...D, ...d };
        return { ...D, projects: D.projects.map(p => ({...p})) };
    } catch { 
        return { ...D, projects: D.projects.map(p => ({...p})) }; 
    }
}

function save(d) { 
    localStorage.setItem('pData', JSON.stringify(d)); 
}

function renderProjects(projects) {
    const container = document.getElementById('displayProjects');
    container.innerHTML = '';
    projects.forEach((p, i) => {
        container.innerHTML += `
            <div class="work-card" style="--delay:${i * 0.15}s">
                <div class="work-card-header">
                    <span class="work-number">${String(i + 1).padStart(2, '0')}</span>
                    <span class="work-icon">◆</span>
                </div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <span class="work-tag">پروژه</span>
            </div>
        `;
    });
}

function renderAdminProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    projects.forEach((p, i) => {
        container.innerHTML += `
            <div class="project-admin-item">
                <div style="flex:1;">
                    <input type="text" class="admin-project-title" value="${p.title}" placeholder="عنوان پروژه" />
                    <input type="text" class="admin-project-desc" value="${p.desc}" placeholder="توضیحات پروژه" />
                </div>
                <button class="btn-remove-project" data-index="${i}">حذف</button>
            </div>
        `;
    });
    document.querySelectorAll('.btn-remove-project').forEach(btn => {
        btn.onclick = function() {
            const data = collect();
            data.projects.splice(parseInt(this.dataset.index), 1);
            apply(data);
            save(data);
        };
    });
}

function renderSkills(skills) {
    const sk = document.getElementById('displaySkills');
    sk.innerHTML = '';
    skills.forEach(s => {
        sk.innerHTML += `
            <div class="skill-item">
                <span class="skill-icon">◆</span>
                <span class="skill-name">${s.trim()}</span>
                <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
            </div>
        `;
    });
}

function apply(d) {
    document.getElementById('displayName').textContent = d.name;
    document.getElementById('displayNameBig').textContent = d.name;
    document.getElementById('displayTitle').textContent = d.title;
    document.getElementById('displayBio').textContent = d.bio;
    document.getElementById('displayEmail').textContent = d.email;
    document.getElementById('displayPhone').textContent = d.phone;
    document.getElementById('displayLocation').textContent = d.location;

    renderSkills(d.skills);
    renderProjects(d.projects);
    renderAdminProjects(d.projects);

    document.querySelector('.hero-section').style.display = d.showIntro ? 'block' : 'none';
    document.querySelector('.stats-section').style.display = d.showIntro ? 'block' : 'none';
    document.querySelector('.skills-section').style.display = d.showSkills ? 'block' : 'none';
    document.querySelector('.work-section').style.display = d.showProjects ? 'block' : 'none';
    document.querySelector('.contact-section').style.display = d.showContact ? 'block' : 'none';

    const setVal = (id, val) => document.getElementById(id).value = val || '';
    setVal('inputName', d.name);
    setVal('inputTitle', d.title);
    setVal('inputBio', d.bio);
    setVal('inputSkills', d.skills.join(', '));
    setVal('inputEmail', d.email);
    setVal('inputPhone', d.phone);
    setVal('inputLocation', d.location);
    
    document.getElementById('chkShowIntro').checked = d.showIntro;
    document.getElementById('chkShowSkills').checked = d.showSkills;
    document.getElementById('chkShowProjects').checked = d.showProjects;
    document.getElementById('chkShowContact').checked = d.showContact;
}

function collect() {
    const skills = document.getElementById('inputSkills').value.split(',').map(s => s.trim()).filter(Boolean);
    const titles = document.querySelectorAll('.admin-project-title');
    const descs = document.querySelectorAll('.admin-project-desc');
    const projects = [];
    for (let i = 0; i < titles.length; i++) {
        projects.push({ 
            title: titles[i].value.trim() || 'پروژه بدون عنوان',
            desc: descs[i].value.trim() || 'توضیحی وارد نشده است'
        });
    }

    return {
        name: document.getElementById('inputName').value.trim() || D.name,
        title: document.getElementById('inputTitle').value.trim() || D.title,
        bio: document.getElementById('inputBio').value.trim() || D.bio,
        skills: skills.length ? skills : D.skills,
        projects: projects.length ? projects : D.projects.map(p => ({...p})),
        email: document.getElementById('inputEmail').value.trim() || D.email,
        phone: document.getElementById('inputPhone').value.trim() || D.phone,
        location: document.getElementById('inputLocation').value.trim() || D.location,
        showIntro: document.getElementById('chkShowIntro').checked,
        showSkills: document.getElementById('chkShowSkills').checked,
        showProjects: document.getElementById('chkShowProjects').checked,
        showContact: document.getElementById('chkShowContact').checked
    };
}


// رویدادها

document.getElementById('openAdminBtn').onclick = () => {
    document.getElementById('adminPage').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderAdminProjects(load().projects);
};

document.getElementById('closeAdminBtn').onclick = () => {
    document.getElementById('adminPage').classList.add('hidden');
    document.body.style.overflow = '';
};

document.getElementById('addProjectBtn').onclick = () => {
    const data = collect();
    data.projects.push({ title: 'پروژه جدید', desc: 'توضیحات پروژه' });
    apply(data);
    save(data);
};

document.getElementById('saveBtn').onclick = () => {
    const data = collect();
    save(data);
    apply(data);
    alert('تنظیمات ذخیره شد!');
};

document.getElementById('resetBtn').onclick = () => {
    if (confirm('بازنشانی به حالت اولیه؟')) {
        localStorage.removeItem('pData');
        const data = { ...D, projects: D.projects.map(p => ({...p})) };
        apply(data);
        save(data);
        alert('بازنشانی شد.');
    }
};

// منو موبایل
document.getElementById('menuToggle').onclick = function() {
    this.classList.toggle('active');
    document.querySelector('.main-nav').classList.toggle('active');
};

document.querySelectorAll('.main-nav a').forEach(link => {
    link.onclick = () => {
        document.getElementById('menuToggle').classList.remove('active');
        document.querySelector('.main-nav').classList.remove('active');
    };
});

// اجرا 
apply(load());