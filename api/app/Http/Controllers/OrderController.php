<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Items;
use App\Models\Endereco;
use App\Models\DadosCartao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Ajuste o caminho de onde você salvou o qrcode.php
class OrderController extends Controller
{
   public function index(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'message' => 'Usuário não autenticado'
        ], 401);
    }

    $orders = Order::with([
            'order_items.product',
            'endereco',
            'cartao'
        ])
        ->where('id_user', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($orders, 200);
}

    public function checkout(Request $request)
    {
        try {
            $request->validate([
                'total_price' => 'required|numeric|min:0',
                'items' => 'required|array|min:1',
                'items.*.id_product' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',

                'endereco_id' => 'nullable|exists:enderecos,id',
                'payment_method' => 'required|string|in:PIX,Cartão de Crédito,pix,cartao',
                'card_id' => 'nullable|exists:dados_cartao,id',
            ]);

            DB::beginTransaction();

            $enderecoId = null;
            $enderecoSnapshot = null;

            if ($request->endereco_id) {
                $endereco = Endereco::where('id', $request->endereco_id)
                    ->where('user_id', $request->user()->id)
                    ->first();

                if (!$endereco) {
                    DB::rollBack();

                    return response()->json([
                        'error' => 'Endereço não encontrado para este usuário'
                    ], 404);
                }

                $enderecoId = $endereco->id;
                $enderecoSnapshot = "{$endereco->street}, {$endereco->number} - {$endereco->city} - CEP {$endereco->zip_code}";
            }

            $paymentMethod = $request->payment_method;

            if ($paymentMethod === 'pix') {
                $paymentMethod = 'PIX';
            }

            if ($paymentMethod === 'cartao') {
                $paymentMethod = 'Cartão de Crédito';
            }

            $cardId = null;
            $cardLastDigits = null;

            if ($paymentMethod === 'Cartão de Crédito') {
                if (!$request->card_id) {
                    DB::rollBack();

                    return response()->json([
                        'error' => 'Selecione um cartão para pagar com cartão de crédito'
                    ], 422);
                }

                $cartao = DadosCartao::where('id', $request->card_id)
                    ->where('user_id', $request->user()->id)
                    ->first();

                if (!$cartao) {
                    DB::rollBack();

                    return response()->json([
                        'error' => 'Cartão não encontrado para este usuário'
                    ], 404);
                }

                $cardId = $cartao->id;
                $cardLastDigits = substr($cartao->numero_cartao, -4);
            }

            $order = Order::create([
                'id_user' => $request->user()->id,
                'endereco_id' => $enderecoId,
                'endereco_snapshot' => $enderecoSnapshot,
                'total_price' => $request->total_price,
                'status' => 'Pedido realizado',
                'payment_method' => $paymentMethod,
                'card_id' => $cardId,
                'card_last_digits' => $cardLastDigits
            ]);

            foreach ($request->items as $item) {
                Order_Items::create([
                    'id_order' => $order->id,
                    'id_product' => $item['id_product'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }

            DB::commit();

            $order->load([
                'order_items.product',
                'endereco',
                'cartao'
            ]);

            return response()->json([
                'message' => 'Compra realizada com sucesso! Os dados foram salvos em Minhas Compras.',
                'order' => $order
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Erro ao processar pedido',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Request $request, $id)
    {
        $order = Order::with([
                'order_items.product',
                'endereco',
                'cartao'
            ])
            ->where('id_user', $request->user()->id)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Nenhuma ordem encontrada'
            ], 404);
        }

        return response()->json($order, 200);
    }

    public function store(Request $request)
    {
        return $this->checkout($request);
    }

    public function update(Request $request, $id)
    {
        $order = Order::where('id_user', $request->user()->id)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Ordem não encontrada'
            ], 404);
        }

        $order->update($request->all());

        return response()->json([
            'message' => 'Ordem atualizada'
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $order = Order::where('id_user', $request->user()->id)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Ordem não encontrada'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'message' => 'Ordem deletada'
        ], 200);
    }

    

public function gerarQrCode(Request $request)
{
    // 1. Valida se a string do QR Code veio na requisição
    $text = $request->input('qr');
    
    if (!$text) {
        return response()->json([
            'status' => 'error',
            'message' => 'O parâmetro "qr" é obrigatório.'
        ], 400);
    }

    // Configurações do Cloudflare R2
    $r2AccountId = '70472f08ee4fc836a76c8ee222b5a1ab';
    $r2BucketName = 'qrcodes';
    $r2AccessKey = '8c69ab5600725530668a5f9eb5078d49';
    $r2SecretKey = 'ed49a2d46cee1c005475edf768127c2814cfac89133410fa1f07fb6514a11044';
    $r2PublicUrl = 'https://pub-25c0dd25f2674cc08b638a62174677e8.r2.dev'; 

    $name = md5(time() . uniqid()) . '.png';
    
    $options = [
        "w" => 450,
        "h" => 450
    ];

    // 2. Gera o QR Code usando a biblioteca
    $generator = new \QRCode($text, $options);
    $image = $generator->render_image();

    // 3. Captura a imagem diretamente no buffer de memória do PHP (evita salvar arquivo em disco)
    ob_start();
    imagepng($image);
    $fileData = ob_get_contents();
    ob_end_clean();
    imagedestroy($image);

    // 4. Configuração de cabeçalhos e assinatura AWS S3 v4 para o Cloudflare R2
    $host = $r2BucketName . "." . $r2AccountId . ".r2.cloudflarestorage.com";
    $url = "https://" . $host . "/{$name}";
    
    $timestamp = gmdate('Ymd\THis\Z');
    $date = gmdate('Ymd');
    $contentType = "image/png";
    
    $headers = [
        'Host: ' . $host,
        'x-amz-content-sha256: ' . hash('sha256', $fileData),
        'x-amz-date: ' . $timestamp,
        'Content-Type: ' . $contentType
    ];
    
    $hashedCanonicalRequest = hash('sha256', "PUT\n/{$name}\n\ncontent-type:{$contentType}\nhost:{$host}\nx-amz-content-sha256:" . hash('sha256', $fileData) . "\nx-amz-date:{$timestamp}\n\ncontent-type;host;x-amz-content-sha256;x-amz-date\n" . hash('sha256', $fileData));
    $stringToSign = "AWS4-HMAC-SHA256\n{$timestamp}\n{$date}/auto/s3/aws4_request\n" . $hashedCanonicalRequest;
    
    $kDate = hash_hmac('sha256', $date, "AWS4" . $r2SecretKey, true);
    $kRegion = hash_hmac('sha256', "auto", $kDate, true);
    $kService = hash_hmac('sha256', "s3", $kRegion, true);
    $kSigning = hash_hmac('sha256', "aws4_request", $kService, true);
    $signature = hash_hmac('sha256', $stringToSign, $kSigning);
    
    $headers[] = "Authorization: AWS4-HMAC-SHA256 Credential=" . $r2AccessKey . "/{$date}/auto/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=" . $signature;

    // 5. Disparo via cURL seguindo o padrão moderno do PHP 8.5+ (sem curl_close)
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fileData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($httpCode == 200) {
        $finalUrl = $r2PublicUrl . "/{$name}";
        
        return response()->json([
            "status" => "success",
            "message" => "QR Code salvo no Cloudflare R2!",
            "url" => $finalUrl
        ], 200);
    } else {
        return response()->json([
            "status" => "error",
            "message" => "Erro ao enviar para o Cloudflare R2.",
            "http_code" => $httpCode,
            "details" => $response
        ], 500);
    }
}
}