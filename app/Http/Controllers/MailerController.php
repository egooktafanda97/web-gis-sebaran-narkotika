<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailerController extends Controller
{
    // =============== [ Email ] ===================
    public function email()
    {
        return view("email");
    }


    // ========== [ Compose Email ] ================
    public function composeEmail($_email, $_subject, $_pesan)
    {
        require base_path("vendor/autoload.php");
        $mail = new PHPMailer(true);     // Passing `true` enables exceptions

        try {

            // Email server settings
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';             //  smtp host
            $mail->SMTPAuth = true;
            $mail->Username = 'egooktafanda1097@gmail.com';   //  sender username
            $mail->Password = 'Oktober97@';       // sender password
            $mail->SMTPSecure = 'tls';                  // encryption - ssl/tls
            $mail->Port = 587;                          // port - 587/465

            $mail->setFrom($_email, 'SAT RESNARKOBA');
            $mail->addAddress($_email);

            // $mail->addCC($request->emailCc);
            // $mail->addBCC($request->emailBcc);

            $mail->addReplyTo($_email, 'sender reply name');

            // if (isset($_FILES['emailAttachments'])) {
            //     for ($i = 0; $i < count($_FILES['emailAttachments']['tmp_name']); $i++) {
            //         $mail->addAttachment($_FILES['emailAttachments']['tmp_name'][$i], $_FILES['emailAttachments']['name'][$i]);
            //     }
            // }


            $mail->isHTML(true);                // Set email content format to HTML

            $mail->Subject = $_subject;
            $mail->Body    = $_pesan;

            // $mail->AltBody = plain text version of email body;

            if ($mail->send()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return false;
        }
    }
}
