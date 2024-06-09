export default defineEventHandler(() => {
    const sortedCitiesListData: any = [
            {
                "name": "Aleksandrowice",
                "lat": "49.8144",
                "lng": "19.2333",
                "admin_name": "Śląskie"
            },
            {
                "name": "Aleksandrów Kujawski",
                "lat": "52.8767",
                "lng": "18.6936",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Bartoszyce",
                "lat": "54.2500",
                "lng": "20.8000",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Bełchatów",
                "lat": "51.3667",
                "lng": "19.3667",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Biały Kamień",
                "lat": "50.7814",
                "lng": "16.2539",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Białystok",
                "lat": "53.1353",
                "lng": "23.1456",
                "admin_name": "Podlaskie"
            },
            {
                "name": "Bielsko-Biała",
                "lat": "49.8225",
                "lng": "19.0444",
                "admin_name": "Śląskie"
            },
            {
                "name": "Biłgoraj",
                "lat": "50.5500",
                "lng": "22.7333",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Bogucice",
                "lat": "50.2668",
                "lng": "19.0397",
                "admin_name": "Śląskie"
            },
            {
                "name": "Bolesławiec",
                "lat": "51.2667",
                "lng": "15.5667",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Braniewo",
                "lat": "54.3833",
                "lng": "19.8333",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Brodnica",
                "lat": "53.2597",
                "lng": "19.3956",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Brzeg",
                "lat": "50.8667",
                "lng": "17.4833",
                "admin_name": "Opolskie"
            },
            {
                "name": "Bydgoszcz",
                "lat": "53.1219",
                "lng": "18.0003",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Bytom",
                "lat": "50.3483",
                "lng": "18.9156",
                "admin_name": "Śląskie"
            },
            {
                "name": "Będzin",
                "lat": "50.3333",
                "lng": "19.1167",
                "admin_name": "Śląskie"
            },
            {
                "name": "Chełm",
                "lat": "51.1322",
                "lng": "23.4778",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Chełmno",
                "lat": "53.3492",
                "lng": "18.4231",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Chełmża",
                "lat": "53.1847",
                "lng": "18.6042",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Chodzież",
                "lat": "52.9833",
                "lng": "16.9000",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Chojnice",
                "lat": "53.7000",
                "lng": "17.5500",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Chojnów",
                "lat": "51.2667",
                "lng": "15.9333",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Chorzów",
                "lat": "50.3000",
                "lng": "18.9500",
                "admin_name": "Śląskie"
            },
            {
                "name": "Chropaczów",
                "lat": "50.3131",
                "lng": "18.9150",
                "admin_name": "Śląskie"
            },
            {
                "name": "Chruszczów",
                "lat": "50.3333",
                "lng": "18.8833",
                "admin_name": "Śląskie"
            },
            {
                "name": "Cieszyn",
                "lat": "49.7484",
                "lng": "18.6332",
                "admin_name": "Śląskie"
            },
            {
                "name": "Czarnków",
                "lat": "52.9000",
                "lng": "16.5667",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Czechowice-Dziedzice",
                "lat": "49.9131",
                "lng": "19.0064",
                "admin_name": "Śląskie"
            },
            {
                "name": "Czeladź",
                "lat": "50.3333",
                "lng": "19.0833",
                "admin_name": "Śląskie"
            },
            {
                "name": "Częstochowa",
                "lat": "50.8000",
                "lng": "19.1167",
                "admin_name": "Śląskie"
            },
            {
                "name": "Człuchów",
                "lat": "53.6500",
                "lng": "17.3667",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Działdowo",
                "lat": "53.2333",
                "lng": "20.1833",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Dzierżoniów",
                "lat": "50.7281",
                "lng": "16.6511",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Dąb",
                "lat": "50.2739",
                "lng": "18.9992",
                "admin_name": "Śląskie"
            },
            {
                "name": "Dąbrowa Górnicza",
                "lat": "50.3214",
                "lng": "19.1872",
                "admin_name": "Śląskie"
            },
            {
                "name": "Dąbrówka Mała",
                "lat": "50.2769",
                "lng": "19.0808",
                "admin_name": "Śląskie"
            },
            {
                "name": "Dębica",
                "lat": "50.0500",
                "lng": "21.4167",
                "admin_name": "Podkarpackie"
            },
            {
                "name": "Długa Szlachecka",
                "lat": "52.2500",
                "lng": "21.3167",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Elbląg",
                "lat": "54.1667",
                "lng": "19.4000",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Ełk",
                "lat": "53.8214",
                "lng": "22.3622",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Gdańsk",
                "lat": "54.3475",
                "lng": "18.6453",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Gdynia",
                "lat": "54.5175",
                "lng": "18.5400",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Giszowiec",
                "lat": "50.2236",
                "lng": "19.0694",
                "admin_name": "Śląskie"
            },
            {
                "name": "Giżycko",
                "lat": "54.0400",
                "lng": "21.7589",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Gliwice",
                "lat": "50.2833",
                "lng": "18.6667",
                "admin_name": "Śląskie"
            },
            {
                "name": "Gniezno",
                "lat": "52.5358",
                "lng": "17.5958",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Golub-Dobrzyń",
                "lat": "53.1000",
                "lng": "19.0500",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Gorlice",
                "lat": "49.6547",
                "lng": "21.1597",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Gorzów Wielkopolski",
                "lat": "52.7333",
                "lng": "15.2500",
                "admin_name": "Lubuskie"
            },
            {
                "name": "Grajewo",
                "lat": "53.6500",
                "lng": "22.4500",
                "admin_name": "Podlaskie"
            },
            {
                "name": "Górowo Iławeckie",
                "lat": "54.2861",
                "lng": "20.4917",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Głogów",
                "lat": "51.6589",
                "lng": "16.0803",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Halemba",
                "lat": "50.2378",
                "lng": "18.8633",
                "admin_name": "Śląskie"
            },
            {
                "name": "Inowrocław",
                "lat": "52.7931",
                "lng": "18.2611",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Iława",
                "lat": "53.5964",
                "lng": "19.5656",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Jasien",
                "lat": "54.3667",
                "lng": "18.6333",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Jawor",
                "lat": "51.0500",
                "lng": "16.2000",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Jodłówka",
                "lat": "50.0628",
                "lng": "21.1122",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Kajkowo",
                "lat": "53.6667",
                "lng": "19.9667",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Kalisz",
                "lat": "51.7575",
                "lng": "18.0800",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Katowice",
                "lat": "50.2625",
                "lng": "19.0217",
                "admin_name": "Śląskie"
            },
            {
                "name": "Kielce",
                "lat": "50.8742",
                "lng": "20.6333",
                "admin_name": "Świętokrzyskie"
            },
            {
                "name": "Knurów",
                "lat": "50.2167",
                "lng": "18.6833",
                "admin_name": "Śląskie"
            },
            {
                "name": "Kobyłka",
                "lat": "52.3333",
                "lng": "21.2000",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Koszalin",
                "lat": "54.2000",
                "lng": "16.1833",
                "admin_name": "Zachodniopomorskie"
            },
            {
                "name": "Koszutka",
                "lat": "50.2711",
                "lng": "19.0211",
                "admin_name": "Śląskie"
            },
            {
                "name": "Koszyce",
                "lat": "49.9689",
                "lng": "20.9475",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Koło",
                "lat": "52.2000",
                "lng": "18.6333",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Kołobrzeg",
                "lat": "54.1761",
                "lng": "15.5761",
                "admin_name": "Zachodniopomorskie"
            },
            {
                "name": "Kościan",
                "lat": "52.0833",
                "lng": "16.6500",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Kościerzyna",
                "lat": "54.1167",
                "lng": "17.9833",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Kraków",
                "lat": "50.0614",
                "lng": "19.9372",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Kraśnik",
                "lat": "50.9167",
                "lng": "22.2167",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Ksawerów",
                "lat": "51.6822",
                "lng": "19.4028",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Kwidzyn",
                "lat": "53.7358",
                "lng": "18.9308",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Kętrzyn",
                "lat": "54.0833",
                "lng": "21.3833",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Latoszyn",
                "lat": "50.0333",
                "lng": "21.3667",
                "admin_name": "Podkarpackie"
            },
            {
                "name": "Legionowo",
                "lat": "52.4000",
                "lng": "20.8833",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Legnica",
                "lat": "51.2083",
                "lng": "16.1603",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Leszno",
                "lat": "51.8458",
                "lng": "16.5806",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Libertów",
                "lat": "49.9667",
                "lng": "19.8833",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Lidzbark Warmiński",
                "lat": "54.1167",
                "lng": "20.5833",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Lipno",
                "lat": "52.8500",
                "lng": "19.1667",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Lubartów",
                "lat": "51.4667",
                "lng": "22.6000",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Lubań",
                "lat": "51.1181",
                "lng": "15.2889",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Lubin",
                "lat": "51.4000",
                "lng": "16.2000",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Lublin",
                "lat": "51.2500",
                "lng": "22.5667",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Luboń",
                "lat": "52.3333",
                "lng": "16.8833",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Lębork",
                "lat": "54.5500",
                "lng": "17.7500",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Malbork",
                "lat": "54.0333",
                "lng": "19.0333",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Marki",
                "lat": "52.3333",
                "lng": "21.1000",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Mielec",
                "lat": "50.2833",
                "lng": "21.4333",
                "admin_name": "Podkarpackie"
            },
            {
                "name": "Milanówek",
                "lat": "52.1167",
                "lng": "20.6500",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Mińsk Mazowiecki",
                "lat": "52.1833",
                "lng": "21.5667",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Mrągowo",
                "lat": "53.8667",
                "lng": "21.3000",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Mysłowice",
                "lat": "50.2333",
                "lng": "19.1333",
                "admin_name": "Śląskie"
            },
            {
                "name": "Nowa Sól",
                "lat": "51.8000",
                "lng": "15.7167",
                "admin_name": "Lubuskie"
            },
            {
                "name": "Nowy Sącz",
                "lat": "49.6239",
                "lng": "20.6972",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Oleśnica",
                "lat": "51.2000",
                "lng": "17.3833",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Olsztyn",
                "lat": "53.7778",
                "lng": "20.4792",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Opole",
                "lat": "50.6667",
                "lng": "17.9333",
                "admin_name": "Opolskie"
            },
            {
                "name": "Osowa",
                "lat": "54.4272",
                "lng": "18.4708",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Ostrowiec Świętokrzyski",
                "lat": "50.9333",
                "lng": "21.4000",
                "admin_name": "Świętokrzyskie"
            },
            {
                "name": "Ostrołęka",
                "lat": "53.0667",
                "lng": "21.5667",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Ostrów Wielkopolski",
                "lat": "51.6494",
                "lng": "17.8164",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Ozorków",
                "lat": "51.9667",
                "lng": "19.2833",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Oława",
                "lat": "50.9333",
                "lng": "17.3000",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Oświęcim",
                "lat": "50.0381",
                "lng": "19.2214",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Pabianice",
                "lat": "51.6500",
                "lng": "19.3833",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Piastów",
                "lat": "52.1833",
                "lng": "20.8500",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Piekary Śląskie",
                "lat": "50.3833",
                "lng": "18.9500",
                "admin_name": "Śląskie"
            },
            {
                "name": "Podgórze",
                "lat": "50.0417",
                "lng": "19.9833",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Poznań",
                "lat": "52.4083",
                "lng": "16.9336",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Pruszcz Gdański",
                "lat": "54.2667",
                "lng": "18.6333",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Pruszków",
                "lat": "52.1667",
                "lng": "20.8000",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Puck",
                "lat": "54.7000",
                "lng": "18.4000",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Płock",
                "lat": "52.5500",
                "lng": "19.7000",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Płońsk",
                "lat": "52.6333",
                "lng": "20.3833",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Raciąż",
                "lat": "52.7794",
                "lng": "20.1153",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Radom",
                "lat": "51.4036",
                "lng": "21.1567",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Radzionków Nowy",
                "lat": "50.3833",
                "lng": "18.8833",
                "admin_name": "Śląskie"
            },
            {
                "name": "Rawa Mazowiecka",
                "lat": "51.7658",
                "lng": "20.2533",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Ruda Śląska",
                "lat": "50.2628",
                "lng": "18.8536",
                "admin_name": "Śląskie"
            },
            {
                "name": "Rumia",
                "lat": "54.5667",
                "lng": "18.4000",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Rury",
                "lat": "51.2386",
                "lng": "22.5164",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Rybnik",
                "lat": "50.0833",
                "lng": "18.5500",
                "admin_name": "Śląskie"
            },
            {
                "name": "Rypin",
                "lat": "53.0667",
                "lng": "19.4500",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Rzeszów",
                "lat": "50.0333",
                "lng": "22.0000",
                "admin_name": "Podkarpackie"
            },
            {
                "name": "Sejny",
                "lat": "54.1167",
                "lng": "23.3667",
                "admin_name": "Podlaskie"
            },
            {
                "name": "Sidlice",
                "lat": "54.3471",
                "lng": "18.6171",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Siemianowice Śląskie",
                "lat": "50.2758",
                "lng": "18.9858",
                "admin_name": "Śląskie"
            },
            {
                "name": "Skawina",
                "lat": "49.9833",
                "lng": "19.8333",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Sochaczew",
                "lat": "52.2333",
                "lng": "20.2333",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Sopot",
                "lat": "54.4333",
                "lng": "18.5500",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Sosnowiec",
                "lat": "50.2833",
                "lng": "19.1333",
                "admin_name": "Śląskie"
            },
            {
                "name": "Starachowice",
                "lat": "51.0500",
                "lng": "21.0667",
                "admin_name": "Świętokrzyskie"
            },
            {
                "name": "Stargard Szczeciński",
                "lat": "53.3333",
                "lng": "15.0333",
                "admin_name": "Zachodniopomorskie"
            },
            {
                "name": "Starogard Gdański",
                "lat": "53.9667",
                "lng": "18.5333",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Suchanino",
                "lat": "54.3667",
                "lng": "18.6500",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Sulejówek",
                "lat": "52.2442",
                "lng": "21.2800",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Szczecin",
                "lat": "53.4325",
                "lng": "14.5481",
                "admin_name": "Zachodniopomorskie"
            },
            {
                "name": "Szczytno",
                "lat": "53.5628",
                "lng": "20.9853",
                "admin_name": "Warmińsko-Mazurskie"
            },
            {
                "name": "Słupsk",
                "lat": "54.4642",
                "lng": "17.0287",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Tarnów",
                "lat": "50.0125",
                "lng": "20.9886",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Tczew",
                "lat": "54.0875",
                "lng": "18.7972",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Tomaszów Lubelski",
                "lat": "50.4500",
                "lng": "23.4167",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Tomaszów Mazowiecki",
                "lat": "51.5167",
                "lng": "20.0167",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Toruń",
                "lat": "53.0222",
                "lng": "18.6111",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Turek",
                "lat": "52.0167",
                "lng": "18.5000",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Tychy",
                "lat": "50.1236",
                "lng": "18.9867",
                "admin_name": "Śląskie"
            },
            {
                "name": "Ustka",
                "lat": "54.5833",
                "lng": "16.8500",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Warsaw",
                "lat": "52.2300",
                "lng": "21.0111",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Wałbrzych",
                "lat": "50.7667",
                "lng": "16.2833",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Wejherowo",
                "lat": "54.6000",
                "lng": "18.2500",
                "admin_name": "Pomorskie"
            },
            {
                "name": "Wiśniowa Góra",
                "lat": "51.7167",
                "lng": "19.6333",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Wola Rzędzińska",
                "lat": "50.0500",
                "lng": "21.0833",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Wołomin",
                "lat": "52.3500",
                "lng": "21.2333",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Wrocław",
                "lat": "51.1100",
                "lng": "17.0325",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Wąbrzeźno",
                "lat": "53.2833",
                "lng": "18.9500",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Wągrowiec",
                "lat": "52.8000",
                "lng": "17.2000",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Włocławek",
                "lat": "52.6592",
                "lng": "19.0681",
                "admin_name": "Kujawsko-Pomorskie"
            },
            {
                "name": "Zabrze",
                "lat": "50.3025",
                "lng": "18.7781",
                "admin_name": "Śląskie"
            },
            {
                "name": "Zambrów",
                "lat": "52.9833",
                "lng": "22.2500",
                "admin_name": "Podlaskie"
            },
            {
                "name": "Zamość",
                "lat": "50.7167",
                "lng": "23.2528",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Zawodzie",
                "lat": "50.2585",
                "lng": "19.0449",
                "admin_name": "Śląskie"
            },
            {
                "name": "Załęże",
                "lat": "50.2672",
                "lng": "18.9892",
                "admin_name": "Śląskie"
            },
            {
                "name": "Zbylitowska Góra",
                "lat": "49.9833",
                "lng": "20.9167",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Zgierz",
                "lat": "51.8500",
                "lng": "19.4167",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Zgorzelec",
                "lat": "51.1500",
                "lng": "15.0083",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Zgłobice",
                "lat": "49.9833",
                "lng": "20.9167",
                "admin_name": "Małopolskie"
            },
            {
                "name": "Zielona Góra",
                "lat": "51.9333",
                "lng": "15.5000",
                "admin_name": "Lubuskie"
            },
            {
                "name": "Ząbki",
                "lat": "52.2928",
                "lng": "21.1161",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Złotoryja",
                "lat": "51.1333",
                "lng": "15.9167",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Złotów",
                "lat": "53.3603",
                "lng": "17.0408",
                "admin_name": "Wielkopolskie"
            },
            {
                "name": "Łańcut",
                "lat": "50.0667",
                "lng": "22.2333",
                "admin_name": "Podkarpackie"
            },
            {
                "name": "Łomianki",
                "lat": "52.3333",
                "lng": "20.8833",
                "admin_name": "Mazowieckie"
            },
            {
                "name": "Łowicz",
                "lat": "52.1000",
                "lng": "19.9333",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Łódź",
                "lat": "51.7769",
                "lng": "19.4547",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Łęczyca",
                "lat": "52.0500",
                "lng": "19.2000",
                "admin_name": "Łódzkie"
            },
            {
                "name": "Świdnica",
                "lat": "50.8500",
                "lng": "16.4833",
                "admin_name": "Dolnośląskie"
            },
            {
                "name": "Świdnik",
                "lat": "51.2167",
                "lng": "22.7000",
                "admin_name": "Lubelskie"
            },
            {
                "name": "Świętochłowice",
                "lat": "50.2919",
                "lng": "18.9178",
                "admin_name": "Śląskie"
            },
            {
                "name": "Żary",
                "lat": "51.6333",
                "lng": "15.1333",
                "admin_name": "Lubuskie"
            },
            {
                "name": "Żyrardów",
                "lat": "52.0500",
                "lng": "20.4333",
                "admin_name": "Mazowieckie"
            }
        ];

    return {
        sortedCitiesListData
    }
})

