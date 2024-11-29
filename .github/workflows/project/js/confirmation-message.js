function showConfirmation() {
    const confirmation = document.getElementById('confirmation');
    confirmation.classList.add('show');
    
}

// عند تحميل الصفحة، تحقق من حالة النجاح وأظهر الرسالة إذا كانت موجودة
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.search.includes('success=1')) {
        showConfirmation();
    }
});
