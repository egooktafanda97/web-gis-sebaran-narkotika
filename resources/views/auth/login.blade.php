@extends('layouts.app')

@section('content')
    <div style="position: fixed; width: 100%; height: 100%; background: rgb(228, 228, 228)">
        <div class="container" style="width:100%; height:100%">
            <div class="row justify-content-center align-items-center" style="width:100%; height:100%;">
                <div class="col-lg-4 col-md-6">
                    <div class="card" style="border: none;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
                        <div class="card-body">
                            <div class="w-100 text-center mb-4">
                                <img src="https://iconape.com/wp-content/png_logo_vector/kepolisian-negara-republik-indonesia-logo.png" class="w-50">
                            </div>
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <input id="email" type="email"
                                            class="form-control @error('email') is-invalid @enderror" name="email"
                                            value="{{ old('email') }}" required autocomplete="email" autofocus
                                            placeholder="email">

                                        @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <input id="password" type="password"
                                            class="form-control @error('password') is-invalid @enderror" name="password"
                                            required autocomplete="current-password" placeholder="password">

                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>
                                <div class="form-group row mb-0 text-right">
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-primary w-50">
                                            {{ __('Login') }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
