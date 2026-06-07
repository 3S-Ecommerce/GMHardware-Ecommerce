<?php
/****************************************************************************\
qrcode.php - Generate QR Codes. MIT license.
\****************************************************************************/
include("qrcode.php");

// Configurações do Cloudflare R2
define('R2_ACCOUNT_ID', '70472f08ee4fc836a76c8ee222b5a1ab');
define('R2_BUCKET_NAME', 'qrcodes');
define('R2_ACCESS_KEY', '8c69ab5600725530668a5f9eb5078d49');
define('R2_SECRET_KEY', 'ed49a2d46cee1c005475edf768127c2814cfac89133410fa1f07fb6514a11044');
// Se você vinculou um domínio personalizado ao seu bucket (ex: cdn.gmhardware.com)
define('R2_PUBLIC_URL', 'https://pub-25c0dd25f2674cc08b638a62174677e8.r2.dev'); 

if (isset($_POST["qr"]) && $_POST["qr"] != "") {

    $text = $_POST["qr"];
    $name = md5(time() . uniqid()) . '.png';
    $file = "files/{$name}";

    if (!is_dir('files')) {
        mkdir('files', 0755, true);
    }

    $options = array(
        "w"=> 450,
        "h"=> 450
    );

    // Geração do QR Code utilizando a biblioteca local
    $generator = new QRCode($text, $options);
    $image = $generator->render_image();
    imagepng($image, $file);
    imagedestroy($image);

    if (file_exists($file)) {
        $fileData = file_get_contents($file);
        
        // Endpoint S3-Compatible do Cloudflare R2
        $host = R2_BUCKET_NAME . "." . R2_ACCOUNT_ID . ".r2.cloudflarestorage.com";
        $url = "https://" . $host . "/{$name}";
        
        // Configuração de data e escopo para assinatura AWS S3 v4
        $timestamp = gmdate('Ymd\THis\Z');
        $date = gmdate('Ymd');
        $contentType = "image/png";
        
        // Criando os Headers para Autenticação S3 no R2
        $headers = [
            'Host: ' . $host,
            'x-amz-content-sha256: ' . hash('sha256', $fileData),
            'x-amz-date: ' . $timestamp,
            'Content-Type: ' . $contentType
        ];
        
        // Processo de Assinatura AWSv4 exigido pela API do Cloudflare R2
        $hashedCanonicalRequest = hash('sha256', "PUT\n/{$name}\n\ncontent-type:{$contentType}\nhost:{$host}\nx-amz-content-sha256:" . hash('sha256', $fileData) . "\nx-amz-date:{$timestamp}\n\ncontent-type;host;x-amz-content-sha256;x-amz-date\n" . hash('sha256', $fileData));
        $stringToSign = "AWS4-HMAC-SHA256\n{$timestamp}\n{$date}/auto/s3/aws4_request\n" . $hashedCanonicalRequest;
        
        $kDate = hash_hmac('sha256', $date, "AWS4" . R2_SECRET_KEY, true);
        $kRegion = hash_hmac('sha256', "auto", $kDate, true);
        $kService = hash_hmac('sha256', "s3", $kRegion, true);
        $kSigning = hash_hmac('sha256', "aws4_request", $kService, true);
        $signature = hash_hmac('sha256', $stringToSign, $kSigning);
        
        $headers[] = "Authorization: AWS4-HMAC-SHA256 Credential=" . R2_ACCESS_KEY . "/{$date}/auto/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=" . $signature;

        // Execução do envio via cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fileData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        
        // Correção do parâmetro nomeado inválido do PHP 8.0+
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        // Nota: curl_close($ch) foi removido aqui por estar obsoleto (deprecated) no PHP 8.5+

        // Limpa o arquivo temporário local do servidor para economizar espaço
        unlink($file);

        if ($httpCode == 200) {
            // URL final pública hospedada no R2
            $finalUrl = R2_PUBLIC_URL . "/{$name}";
            
            header('Content-Type: application/json');
            echo json_encode([
                "status" => "success",
                "message" => "QR Code salvo no Cloudflare R2!",
                "url" => $finalUrl
            ]);
            exit;
        } else {
            header('Content-Type: application/json', true, 500);
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao enviar para o Cloudflare R2.",
                "http_code" => $httpCode,
                "details" => $response
            ]);
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador QR Code - Cloudflare R2</title>
</head>

<body>
    <form method="POST" action="">
        <input type="text" name="qr" placeholder="Insira a URL ou texto do pedido">
        <button type="submit">Gerar e Enviar</button>
    </form>
</body>

</html>