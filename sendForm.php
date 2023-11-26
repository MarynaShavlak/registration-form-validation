<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
// require 'vendor/autoload.php';
require 'phpMailer/src/Exception.php';
require 'phpMailer/src/PHPMailer.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('uk', 'phpMailer/language/');
$mail->IsHTML(true);


$mail->setFrom('marynashavlak@gmail.com', 'Maryna Shavlak');
$mail->addAddress('shavlakmaryna@gmail.com');     
$mail->Subject = 'Data from Registration Form Task';


$body = '<h1> It is Data From Registration Form </h1>';
if (isset($_POST['name']) && trim($_POST['name'] !== '')) {
  $body .= '<p><strong>Name:</strong> ' . $_POST['name'] . '</p>';
}

if (isset($_POST['username']) && trim($_POST['username'] !== '')) {
  $body .= '<p><strong>Username:</strong> ' . $_POST['username'] . '</p>';
}

if (isset($_POST['phone']) && trim($_POST['phone'] !== '')) {
  $body .= '<p><strong>Phone:</strong> ' . $_POST['phone'] . '</p>';
}

if (isset($_POST['password']) && trim($_POST['password'] !== '')) {
  $body .= '<p><strong>Password:</strong> ' . $_POST['password'] . '</p>';
}

if (isset($_POST['passwordConfirm']) && trim($_POST['passwordConfirm'] !== '')) {
  $body .= '<p><strong>Confirm Password:</strong> ' . $_POST['passwordConfirm'] . '</p>';
}

$mail->Body    = $body;

if(!$mail->send()) {
  $message = 'Error';
} else {
  $message = 'Data was successfully sent';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>
