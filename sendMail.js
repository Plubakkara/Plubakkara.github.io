function sendMail(event) {
    event.preventDefault(); // ป้องกันฟอร์มรีโหลดหน้าเว็บ

    // รับค่าจากฟอร์ม
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // สร้าง URL สำหรับเปิด Gmail
    const mailtoLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    // เปิด Gmail ในแท็บใหม่
    window.open(mailtoLink, "_blank");
}
