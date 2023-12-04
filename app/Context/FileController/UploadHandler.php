<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\FileController;

use App\Context\Handler;
use App\Helpers\Path;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadHandler implements Handler
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function handle()
    {
        $user = auth()->user();
        $file = $this->request->file('file');
        $domain = "images";


        $fileName = $this->generateFileName($user);

        $file->move("$domain/", $fileName);
        $mimeType = mime_content_type("$domain/$fileName");

        $uri = "$domain/$fileName";

        $apiUrl = env('APP_URL');

        return [
            'uri' => "/" . $uri,
            'url' => $apiUrl . "/" . $uri,
            'mime_type' => $mimeType
        ];
    }

    private function generateFileSlug($user)
    {
        $userName = 'pub';
        if ($user) {
            $userName = $user->name;
        }
        return Str::slug($userName, '-') . "-"
            . str_replace('.', '-', Carbon::now()->timestamp / 10000);
    }

    private function generateFileName($user)
    {
        $slug = $this->generateFileSlug($user);
        $extension = $this->request->file->extension();
        return "$slug.$extension";
    }
}
