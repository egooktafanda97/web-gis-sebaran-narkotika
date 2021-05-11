<?php
if (!function_exists('getkode')) {
    function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
if (!function_exists('getkode')) {
    function getkode()
    {
        $panjang = 55;
        $karakter = 'kodingin.com4543534-039849kldsam][].';
        $panjangKata = strlen($karakter);
        $kode = '';
        for ($i = 0; $i < $panjang; $i++) {
            $kode .= $karakter[rand(0, $panjangKata - 1)];
        }
        return $kode;
    }
}
// --------------------
if (!function_exists('potong_karakter')) {

    function potong_karakter($string, $min, $max)
    {
        if (strlen($string) > $max) {
            return substr($string, $min, $max) . '...';
        } else {
            return substr($string, $min, $max);
        }
    }
}
if (!function_exists('potong_karakter_readmore')) {

    function potong_karakter_readmore($string, $min, $max, $elemet)
    {
        if (strlen($string) > $max) {
            return substr($string, $min, $max) . '...' . $elemet;
        } else {
            return substr($string, $min, $max);
        }
    }
}
if (!function_exists('tgl_indo')) {
    function tgl_indo($tanggal)
    {
        $bulan = array(
            1 => 'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        );
        $pecahkan = explode('-', $tanggal);

        // variabel pecahkan 0 = tanggal
        // variabel pecahkan 1 = bulan
        // variabel pecahkan 2 = tahun

        return $pecahkan[2] . ' ' . $bulan[(int) $pecahkan[1]] . ' ' . $pecahkan[0];
    }
}
// ================================================================================

if (!function_exists('timestamp_ex_indo')) {
    function timestamp_ex_indo($time)
    {

        $ex = explode(' ', $time);

        return tgl_indo($ex[0]) . ' / ' . $ex[1];
    }
}

if (!function_exists('no_empty')) {
    function no_empty($data)
    {

        return !empty($data) ? $data : '';
    }
}
if (!function_exists('getIp')) {
    function getIp()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if (isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}

function random_color_part() {
    return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
}

function random_color() {
    return "#".random_color_part() . random_color_part() . random_color_part();
}
