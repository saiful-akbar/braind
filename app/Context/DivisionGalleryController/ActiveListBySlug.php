<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\DivisionGalleryController;

use App\Context\HasPaginate;
use App\Context\Reader;
use App\Models\Division;
use App\Models\DivisionGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActiveListBySlug implements Reader
{
    use HasPaginate;

    public function __construct($slug, Request $request)
    {
        $div = Division::where('slug', $slug)
            ->first();
        if (is_null($div)) {
            throw new \Exception('Invalid division data', 422);
        }
        $type = $request->get('type');
        $mt = $request->get('mt');
        $this->request = $request;
        $this->data = DivisionGallery::whereNull('deleted_at')
            ->select('*', DB::raw('false as ed'))
            ->where('division_id', $div->id);
        if ($mt) {
            $this->data->where('mime_type', 'like', "%$mt%");
        }
        if ($type) {
            $this->data->where('type', $type);
        }
    }

    public function read()
    {
    }
}
