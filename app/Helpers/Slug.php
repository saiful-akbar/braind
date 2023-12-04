<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Helpers;

use Illuminate\Support\Str;

class Slug
{
    public static function make($class, $name)
    {
        $sl = Str::slug($name, "-");
        $oc = $class->where("slug", $sl)
            ->first();
        if (is_null($oc)) {
            return $sl;
        }
        $items = $class->where("slug", "like", $sl . "%")
            ->orderBy('slug', 'asc')
            ->get();
        $count = 1;
        foreach ($items as $item) {
            $dbCount = (int)str_replace($sl . "-", "", $item->slug);
            if ($count == $dbCount) {
                $count++;
                continue;
            }
        }

        return $sl . "-" . $count;
    }
}
