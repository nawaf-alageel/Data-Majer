document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
    const navMenu = document.getElementById('nav-menu');
    const toggleHeader = document.querySelector('.toggle-header');
    const header = document.querySelector('header');
    
    // التحقق من حالة الوضع الداكن المحفوظة في localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode(toggleButton);
    } else {
        disableDarkMode(toggleButton);
    }

    // إضافة مستمع للضغط على زر التبديل لتبديل الوضع الداكن
    toggleButton.addEventListener('click', () => {
        toggleDarkMode(toggleButton);
    });

    // إضافة مستمع للضغط على زر القائمة لتبديل القائمة
    toggleHeader.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        toggleHeader.setAttribute('aria-expanded', isActive);
    });

    // إخفاء الهيدر عند التمرير للأسفل وإظهاره عند التمرير للأعلى
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // التمرير للأسفل - إخفاء الهيدر
            header.classList.add('hidden');
        } else {
            // التمرير للأعلى - إظهار الهيدر
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // تجنب القيم السلبية

        // إضافة أو إزالة الفئة 'scrolled' بناءً على موضع التمرير
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// وظيفة تبديل الوضع الداكن والفاتح
function toggleDarkMode(button) {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode(button);
    } else {
        enableDarkMode(button);
    }
}

// تفعيل الوضع الداكن وتحديث أيقونة الزر
function enableDarkMode(button) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    button.textContent = '☀️'; // أيقونة الشمس لوضع الفاتح
    button.setAttribute('aria-label', 'تبديل إلى الوضع الفاتح');
}

// إلغاء تفعيل الوضع الداكن وتحديث أيقونة الزر
function disableDarkMode(button) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    button.textContent = '🌙'; // أيقونة القمر لوضع الداكن
    button.setAttribute('aria-label', 'تبديل إلى الوضع الداكن');
}
