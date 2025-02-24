function sendMail(event) {
    event.preventDefault(); // ป้องกันฟอร์มรีโหลดหน้าเว็บ

    const name = document.querySelector(".form input[placeholder='Your Name']").value;
    const email = document.querySelector(".form input[placeholder='Your Email']").value;
    const subject = document.querySelector(".form input[placeholder='Subject']").value;
    const message = document.querySelector(".form textarea[placeholder='Message']").value;


    if (!name || !email || !subject || !message) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    const recipientEmail = "proplub@gmail.com";

    const mailtoLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    window.open(mailtoLink, "_blank");

    document.querySelector(".form input[placeholder='Your Name']").value = "";
    document.querySelector(".form input[placeholder='Your Email']").value = "";
    document.querySelector(".form input[placeholder='Subject']").value = "";
    document.querySelector(".form textarea[placeholder='Message']").value = "";
}
