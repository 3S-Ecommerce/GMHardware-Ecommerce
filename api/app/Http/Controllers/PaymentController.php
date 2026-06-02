<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

class PaymentController extends Controller
{
    public function createPixPayment(Request $request)
    {
        MercadoPagoConfig::setAccessToken(
            config('services.mercadopago.token')
        );

        $client = new PaymentClient();

        $payment = $client->create([

            "transaction_amount" =>
                (float) $request->amount,

            "description" =>
                "Pagamento Pix",

            "payment_method_id" =>
                "pix",

            "payer" => [
                "email" => $request->email
            ]
        ]);

        return response()->json([

            "id" => $payment->id,

            "status" => $payment->status,

            "qr_code" =>
                $payment->point_of_interaction
                ->transaction_data
                ->qr_code,

            "qr_code_base64" =>
                $payment->point_of_interaction
                ->transaction_data
                ->qr_code_base64
        ]);
    }
}