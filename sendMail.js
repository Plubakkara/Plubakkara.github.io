function sendMail(event) {
    event.preventDefault(); // ป้องกันฟอร์มรีโหลดหน้าเว็บ

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    const recipientEmail = "proplub@gmail.com";

    const mailtoLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    window.open(mailtoLink, "_blank");

    document.getElementById("contact-form").reset();
}
