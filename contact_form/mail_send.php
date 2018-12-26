<?php
//ユーザーへの送信メール設定
ini_set("default_charset","UTF-8");
mb_language("ja");

$gRecaptchaResponse = $_POST["g-recaptcha-response"];
$reCaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret=reCAPTCHAのSecret keyを追加&response=" . $gRecaptchaResponse;
$response = @file_get_contents($reCaptchaUrl);
$response = json_decode($response,true);
if ($response['success'] != true or $response['score'] < 0.5){
	echo "不正なアクセスです";
	exit();
}

// 管理者のメールアドレス
$admin_mail = "hogehoge@example.com";
// 送信者のメールアドレス ※フォームに入力されたメールアドレス
$user_mail  = $_POST['email'];
// 会社名 ※メールの差出元に表示される
$company_name = "株式会社hogehoge";
// 送信後、お問い合せページにリダイレクト
$redirect_url = "//" . $_SERVER["HTTP_HOST"] . "/contact/?send=success";

$mail_subject = "お問い合せありがとうございます。";
$body = <<<EOM
お問い合せありがとうございます。
以下の内容にて、お問い合せを受け付けました。
---------------------------------------
[お名前]
{$_POST['name']}

[ご住所]
{$_POST['address1_1']}-{$_POST['address1_2']}
{$_POST['address2']}
{$_POST['address3']}

[TEL]
{$_POST['tel1']}-{$_POST['tel2']}-{$_POST['tel3']}

[メールアドレス]
{$_POST['email']}

[お問い合わせ内容]
{$_POST['inquiry']}
---------------------------------------

内容を確認のうえ、後日回答させていただきます。
しばらくお待ちください。
EOM;
$to_mail = $user_mail;
$from_mail = $admin_mail;
$from_name = $company_name;
$header  = "From : " . mb_encode_mimeheader($from_name) . " <{$from_mail}> ";
mb_send_mail($to_mail, $mail_subject, $body, $header);

//管理者への送信メール設定
ini_set("default_charset","UTF-8");
mb_language("ja");
$mail_subject = "お問い合せを受信しました。";
$body = <<<EOM
以下の内容にて、お問い合せを受け付けました。
---------------------------------------
[お名前]
{$_POST['name']}

[ご住所]
{$_POST['address1_1']}-{$_POST['address1_2']}
{$_POST['address2']}
{$_POST['address3']}

[TEL]
{$_POST['tel1']}-{$_POST['tel2']}-{$_POST['tel3']}

[メールアドレス]
{$_POST['email']}

[お問い合わせ内容]
{$_POST['inquiry']}
---------------------------------------

内容を確認のうえ、後日回答をお送りください。
EOM;
$to_mail = $admin_mail;
$from_mail = $admin_mail;
$from_name = $company_name;
$header = "From : " . mb_encode_mimeheader($from_name) . " <{$from_mail}> ";
mb_send_mail($to_mail, $mail_subject, $body, $header);
header("Location: " . $redirect_url );
exit;

?>