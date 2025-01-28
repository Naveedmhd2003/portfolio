<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST['name']));
    $name = str_replace(array("\r","\n"), array(" "," "), $name);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST['message']);
    
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form correctly.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Server Settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'naveedmhd2003m@gmail.com'; // Your Gmail address
        $mail->Password = 'your-gmail-app-password'; // Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Settings
        $mail->setFrom($email, $name);
        $mail->addAddress('naveedmhd2003m@gmail.com'); // Your email address
        $mail->Subject = "Message from $name via Portfolio Contact Form";
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        $mail->send();
        echo "Thank you! Your message has been sent.";
    } catch (Exception $e) {
        echo "Oops! Something went wrong. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
