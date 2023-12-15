<!DOCTYPE html>
<html lang="id">
	<head>
		<title>Division Export</title>
	</head>

	<body>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Nama Kanwil</th>
				</tr>
			</thead>

			<tbody>
				@foreach ($divisions as $division)
					<tr>
						<td>{{ $division->id }}</td>
						<td>{{ $division->name }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</body>
</html>