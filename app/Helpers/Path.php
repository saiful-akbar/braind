<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Helpers;

class Path
{
    public static function publicPath($path = null)
    {
        return rtrim(app()->basePath($path), '/');
    }

    public static function basePath($path = null)
    {
        return rtrim(app()->basePath($path), '/');
    }
}
