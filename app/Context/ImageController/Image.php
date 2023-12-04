<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\ImageController;

use App\Helpers\Path;

class Image
{
    public static function createThumbnail($path, $newWidth, $newHeight)
    {
        $mime = getimagesize($path);

        $srcImg = null;

        if ($mime['mime'] == 'image/png') {
            $srcImg = imagecreatefrompng($path);
        }
        if ($mime['mime'] == 'image/jpg' || $mime['mime'] == 'image/jpeg' || $mime['mime'] == 'image/pjpeg') {
            $srcImg = imagecreatefromjpeg($path);
        }
        if (is_null($srcImg)) {
            echo "ERROR resize img " . $path . PHP_EOL;
            return;
        }

        $oldX          =   imageSX($srcImg);
        $oldY          =   imageSY($srcImg);

        if ($oldX < $oldY) {
            $thumbW    =   $newWidth;
            $thumbH    =   $oldY * ($newHeight / $oldX);
            $y = ($thumbH - $newHeight) / 2;
            $x = 0;
        }

        if ($oldX > $oldY) {
            $thumbW    =   $oldX * ($newWidth / $oldY);
            $thumbH    =   $newHeight;
            $x = ($thumbW - $newWidth) / 2;
            $y = 0;
        }

        if ($oldX == $oldY) {
            $thumbW    =   $newWidth;
            $thumbH    =   $newHeight;
            $x = 0;
            $y = 0;
        }
        // dd(['ox' => $oldX, 'oy' => $oldY, 'th' => $thumbH, 'tw' => $thumbW]);

        $dstImg        =   ImageCreateTrueColor($thumbW, $thumbH);

        imagecopyresampled($dstImg, $srcImg, 0, 0, 0, 0, $thumbW, $thumbH, $oldX, $oldY);

        $dstImg = imagecrop($dstImg, ['x' => $x, 'y' => $y, 'width' => $newWidth, 'height' => $newHeight]);

        $paths = explode('/', $path);

        $newThumbLoc = Path::basePath("images/thumbs_" . $paths[count($paths) - 1]);

        if ($mime['mime'] == 'image/png') {
            $result = imagepng($dstImg, $newThumbLoc, 8);
        }
        if ($mime['mime'] == 'image/jpg' || $mime['mime'] == 'image/jpeg' || $mime['mime'] == 'image/pjpeg') {
            $result = imagejpeg($dstImg, $newThumbLoc, 80);
        }

        imagedestroy($dstImg);
        imagedestroy($srcImg);

        return $result;
    }
}
