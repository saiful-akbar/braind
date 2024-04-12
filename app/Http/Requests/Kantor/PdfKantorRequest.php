<?php

namespace App\Http\Requests\Kantor;

use App\Models\Kantor;
use App\Models\MenuUser;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Response;
use Illuminate\Foundation\Http\FormRequest;

class PdfKantorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search' => 'nullable|string',
            'status' => 'nullable|in:aktif,dihapus'
        ];
    }

    /**
     * Manmpilkan report PDF kantor.
     *
     * @return Response
     */
    public function pdf(MenuUser $access): Response
    {
        $query = Kantor::select('*');
        $search = $this->query('search');

        // jika ada request "status" dengan nilai "dihapus" dan user
        // sebagai memiliki akses "destroy", tampilkan hanya data yang sudah dihapus
        if ($this->query('status') == 'dihapus' && $access->destroy) {
            $query->onlyTrashed();
        }

        // jika ada request "search" tambahkan query like
        if (!empty($search)) {
            $query->where(function (Builder $subQuery) use ($search): void {
                $subQuery->where('nama', 'like', "%{$search}%");
            });
        }

        $data = [
            'kantor' => $query->get(),
            'query' => $this->query(),
        ];

        return Pdf::loadView('reports.kantor', $data)
            ->setPaper('a4', 'potrait')
            ->stream();
    }
}
