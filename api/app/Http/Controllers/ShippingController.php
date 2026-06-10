<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class ShippingController extends Controller
{
    public function calcularFrete(Request $request)
    {
        try {
            $dados = $request->validate([
                'cep_destino' => [
                    'required',
                    'string'
                ],

                'items' => [
                    'required',
                    'array',
                    'min:1'
                ],

                'items.*.id' => [
                    'required'
                ],

                'items.*.quantity' => [
                    'required',
                    'integer',
                    'min:1'
                ],

                'items.*.price' => [
                    'required',
                    'numeric',
                    'min:0.01'
                ],

                'items.*.width' => [
                    'nullable',
                    'numeric',
                    'min:1'
                ],

                'items.*.height' => [
                    'nullable',
                    'numeric',
                    'min:1'
                ],

                'items.*.length' => [
                    'nullable',
                    'numeric',
                    'min:1'
                ],

                'items.*.weight' => [
                    'nullable',
                    'numeric',
                    'min:0.01'
                ],
            ]);

            $cepDestino = preg_replace(
                '/\D/',
                '',
                $dados['cep_destino']
            );

            $cepOrigem = preg_replace(
                '/\D/',
                '',
                (string) config(
                    'services.melhor_envio.from_cep'
                )
            );

            if (strlen($cepDestino) !== 8) {
                return response()->json([
                    'error' => 'CEP de destino inválido.'
                ], 422);
            }

            if (strlen($cepOrigem) !== 8) {
                return response()->json([
                    'error' =>
                        'CEP de origem não configurado corretamente.'
                ], 500);
            }

            $token = config(
                'services.melhor_envio.token'
            );

            if (!$token) {
                return response()->json([
                    'error' =>
                        'Token do Melhor Envio não configurado.'
                ], 500);
            }

            $urlConfigurada = config(
                'services.melhor_envio.url'
            );

            if (!$urlConfigurada) {
                return response()->json([
                    'error' =>
                        'URL do Melhor Envio não configurada.'
                ], 500);
            }

            $userAgent = config(
                'services.melhor_envio.user_agent'
            );

            if (!$userAgent) {
                return response()->json([
                    'error' =>
                        'User-Agent do Melhor Envio não configurado.'
                ], 500);
            }

            $produtos = [];

            foreach ($dados['items'] as $item) {
                $produtos[] = [
                    'id' => (string) $item['id'],

                    'width' => (float) (
                        $item['width'] ?? 20
                    ),

                    'height' => (float) (
                        $item['height'] ?? 10
                    ),

                    'length' => (float) (
                        $item['length'] ?? 30
                    ),

                    'weight' => (float) (
                        $item['weight'] ?? 1
                    ),

                    'insurance_value' => (float) (
                        $item['price']
                    ),

                    'quantity' => (int) (
                        $item['quantity']
                    ),
                ];
            }

            $url = rtrim(
                $urlConfigurada,
                '/'
            );

            $resposta = Http::acceptJson()
                ->asJson()
                ->withToken($token)
                ->withHeaders([
                    'User-Agent' => $userAgent
                ])
                ->timeout(30)
                ->post(
                    $url .
                    '/api/v2/me/shipment/calculate',
                    [
                        'from' => [
                            'postal_code' => $cepOrigem
                        ],

                        'to' => [
                            'postal_code' => $cepDestino
                        ],

                        'products' => $produtos,

                        'options' => [
                            'receipt' => false,
                            'own_hand' => false,
                            'collect' => false
                        ]
                    ]
                );

            if ($resposta->failed()) {
                return response()->json([
                    'error' =>
                        'O Melhor Envio não conseguiu calcular o frete.',

                    'status_melhor_envio' =>
                        $resposta->status(),

                    'details' =>
                        $resposta->json() ??
                        $resposta->body()
                ], $resposta->status());
            }

            return response()->json(
                $resposta->json(),
                200
            );

        } catch (ValidationException $e) {
            return response()->json([
                'error' =>
                    'Os dados enviados para o cálculo são inválidos.',

                'errors' => $e->errors()
            ], 422);

        } catch (\Throwable $e) {
            return response()->json([
                'error' =>
                    'Erro interno ao calcular o frete.',

                'message' => $e->getMessage()
            ], 500);
        }
    }
}