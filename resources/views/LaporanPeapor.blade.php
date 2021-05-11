<html>

<head>
    {{-- <link rel="stylesheet" href="{{ $css }}"> --}}
    <style>
        /** 
                Set the margins of the page to 0, so the footer and the header
                can be of the full height and width !
             **/
        @page {
            margin: 1.27cm 1.27cm;
        }

        /** Define now the real margins of every page in the PDF **/
        body {
            margin-top: 3cm;
            margin-left: 0cm;
            margin-right: 0cm;
            margin-bottom: 4cm;
        }

        /** Define the header rules **/
        header {
            position: fixed;
            top: 0cm;
            left: 0cm;
            right: 0cm;
            height: 2.5cm;
            border-bottom: 1px solid #ccc
        }

        /** Define the footer rules **/
        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 4cm;
        }

        .kiri {
            width: 60%;
            text-align: center;
        }

        .tengah {
            width: 0%;
        }

        .kanan {
            width: calc(100% - 60%);
            text-align: left;
        }

        .tbcontent tr td {
            vertical-align: top;
            text-align: left;
        }

        .tabs {
            display: inline-block;
            margin-left: 40px;
        }

        /* ///////////////////////////////// */
        #tb-content th {
            padding: 5px;
            background-color: #ccc;
            border: 1px solid rgb(102, 100, 100);

        }

        #tb-content tbody tr {
            background-color: rgb(250, 250, 250);
        }

        #tb-content tbody tr td {
            padding-left: 5px;
            padding-bottom: 10px;
            padding-top: 10px;
            border-bottom: 1px solid rgb(177, 175, 175)
        }

    </style>
</head>

<body>
    <!-- Define header and footer blocks before your content -->
    <header>
        {{-- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIYUEKDAwt8_rYy7lcuCRJ9nLo5b2XoE4ipA&usqp=CAU"
            style="position: absolute; width: 60px; height: auto;"> --}}
        <table style="width: 100%;">
            <tr>
                <td align="center">
                    <span style="line-height: 1; font-weight: bold; margin-bottom: 0; font-size: 1.5em">
                        {{ strtoupper('Kepolisian Republik Indonesia') }}
                    </span>
                    <br>
                    <span style="line-height: 1; font-weight: bold; margin-bottom: 0; font-size: 1.5em">
                        {{ strtoupper('Sat Resnarkoba') }}
                    </span>
                    <p>
                        Kuantan Singingi
                    </p>
                </td>
            </tr>
        </table>

    </header>



    <footer>

        <table style="width: 100%">
            <tr>
                <td class="kiri">

                </td>
                <td class="tengah">

                </td>
                <td class="kanan">

                    <br>
                    Teluk kuantan {{ date('Y-m-d') }}
                    <br>
                    <br>
                    <br>
                    <br>
                    <hr style="border-top: 1px solid #000;">
                </td>
            </tr>
        </table>

    </footer>

    <!-- Wrap the content of your PDF inside a main tag -->
    <div style="width: 100%">
        <table id="tb-content" width="100%">
            <thead>
                <tr style="font-size: 0.7rem">
                    <th>
                        No
                    </th>
                    <th>
                        NAMA PELAPOR
                    </th>
                    <th>
                        ALAMAT PELAPOR
                    </th>
                    <th>
                        NAMA YANG DI LAPORKAN
                    </th>
                    <th>
                        JENIS NARKOTIKA
                    </th>
                    <th>
                        ALAMAT YANG DI LAPORKAN
                    </th>
                    <th>
                        TANGGAL PELAPORAN
                    </th>
                    <th>
                        PUKUL PELAPORAN
                    </th>
                </tr>
            </thead>
            <tbody>

                @foreach ($data as $item)
                    <tr>
                        <td>#</td>
                        <td>{{$item->nama}}</td>
                        <td>{{$item->alamat}}</td>
                        <td>{{$item->atas_nama}}</td>
                        <td>{{$item->jenis_narkotika}}</td>
                        <td>{{$item->alamat_terduga}}</td>
                        <td>{{$item->taggal}}</td>
                        <td>{{$item->pukul}}</td>
                    </tr>
                @endforeach

            </tbody>
        </table>
    </div>
</body>

</html>
