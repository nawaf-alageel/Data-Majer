// دالة لإغلاق النافذة المنبثقة عند الضغط على زر "موافق" فقط
function closeModal() {
    var modal = document.getElementById("legalModal");
    modal.style.display = "none"; // إخفاء النافذة
    document.body.style.overflow = "auto"; // إعادة التمرير بعد إغلاق النافذة
}

// دالة إعادة التوجيه إلى الصفحة الرئيسية عند الضغط على X
function redirectToHome() {
    window.location.href = '../Html/Home.html'; // إعادة التوجيه إلى صفحة "Home"
}

// منع النقر خارج النافذة من إغلاقها
window.onclick = function(event) {
    var modal = document.getElementById("legalModal");
    if (event.target == modal) {
        // عدم تنفيذ أي شيء عند النقر خارج النافذة
    }
}

// عند تحميل الصفحة، اجعل التمرير ممنوع حتى إغلاق النافذة
window.onload = function() {
    document.body.style.overflow = "hidden"; // منع التمرير
};
