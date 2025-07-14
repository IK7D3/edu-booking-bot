<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class TelegramService
{
    protected $botToken;

    public function __construct()
    {
        $this->botToken = env('TELEGRAM_BOT_TOKEN');
    }

    public function sendMessage($chatId, $text)
    {
        $url = "https://api.telegram.org/bot{$this->botToken}/sendMessage";

        return Http::post($url, [
            'chat_id' => $chatId,
            'text'    => $text,
        ]);
    }
}
