<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        if ($this->isHttpException($e)) {
            if ($e->getStatusCode() == 404) {
                return response(view('index'));
            }
        }

        return parent::render($request, $e);

        if ($e->getCode() == 401) {
            return response()->json(
                [
                    'errors' => [
                        'status' => 401,
                        'message' => 'Unauthenticated',
                    ]
                ],
                401
            );
        }

        //        if ($e->getCode() == 422) {
        $errorFormat = [
            'status' => $e->getCode(),
            'developer_message' => $e->getMessage() . " on " . $e->getFile() . ":" . $e->getLine(),
            'user_message' => $e->getMessage(),
            'error_code' => $e->getCode(),
            'more_info' => 'Contact Administrator'
        ];
        return response()->json($errorFormat);
    }
}
