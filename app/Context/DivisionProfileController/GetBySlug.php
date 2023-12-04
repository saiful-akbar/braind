<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionProfileController;

use App\Context\Reader;
use App\Models\DivisionProfile;

class GetBySlug implements Reader
{
    private $slug;

    public function __construct($slug)
    {
        $this->slug = $slug;
    }

    public function read()
    {
        $ic = DivisionProfile::join('divisions as d', 'd.id', 'division_profiles.division_id')
            ->where('d.slug', $this->slug)
            ->select()
            ->first();
        if (is_null($ic)) {
            throw new \Exception("Data not found", 422);
        }

        return Get::PopulateDetail($ic);
    }
}
