<x-layouts.report title="Report Kantor">
    <x-slot:header>Kantor</x-slot:header>

    <table class="table" width="100%">
        <thead>
            <tr>
                <th class="text-center">No.</th>
                <th class="text-center">ID</th>
                <th class="text-center">Nama Kantor</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($kantor as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->nama }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</x-layouts.report>
