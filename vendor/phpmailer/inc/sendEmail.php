<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
require '../vendor/autoload.php';

if($_POST) {
	$name = trim(stripslashes($_POST['contactName']));
	$email = trim(stripslashes($_POST['contactEmail']));
	$subject = trim(stripslashes($_POST['contactSubject']));
	$contact_message = trim(stripslashes($_POST['contactMessage']));
	$error = array();

	if (strlen($name) < 2) {
		$error['name'] = "Por favor, escriba su nombre.";
	}
	// Check Email
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Por favor, introduce una dirección de correo electrónico válida.";
	}
	// Check Message
	if (strlen($contact_message) < 15) {
		$error['message'] = "Su mensaje debe tener al menos 15 caracteres.";
	}

	if ( empty($error) ) {
		// Import PHPMailer classes into the global namespace
		// These must be at the top of your script, not inside a function

		$mail = new PHPMailer(true);
		                // Passing `true` enables exceptions

		try {
		    //Server settings
		    //$mail->SMTPDebug = 2;                                 // Enable verbose debug output
		    $mail->isSMTP();                                      // Set mailer to use SMTP
		    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
		    $mail->SMTPAuth = true;                               // Enable SMTP authentication
		    $mail->Username = 'controlygestion.leiros@gmail.com';                 // SMTP username
		    $mail->Password = 'Controlygestion123*';                           // SMTP password
		    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		    $mail->Port = 587;                                    // TCP port to connect to

		    //Recipients
		    $mail->setFrom($email, $name);
		    $mail->addAddress('controlygestion.leiros@gmail.com');     // Add a recipient
		    $mail->addReplyTo($email, $name);


				// Set Message
				$body = "Email from: " . $name . "<br />";
				$body .= "Email address: " . $email . "<br />";
				$body .= "Message: <br />";
				$body .= $contact_message;
				$body .= "<br /> ----- <br /> Este correo electrónico se envió desde el formulario de contacto de su sitio. <br />";

				if ($subject == '') {
					$subject = "Contact Form Submission";
				}
		    //Content
		    $mail->isHTML(true);                                  // Set email format to HTML
		    $mail->Subject = $subject;
		    $mail->Body    = $body;
		    $mail->send();

				//die("SI");

				$error['OK'] = "done";
				echo json_encode($error);
			} catch (Exception $e) {
				//die('NO');
				$error['sending'] = "Algo salió mal. Por favor, inténtelo de nuevo.";
				echo json_encode($error);
				//echo json_encode ($mail->ErrorInfo);
			}
		}else{
			echo json_encode($error);
		}
}
?>
