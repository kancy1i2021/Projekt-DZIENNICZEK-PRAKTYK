const dod = document.getElementById('dodawanie');
const form = document.getElementById('formularz');
const nazwaKomitetuInput = document.getElementById('nazwakomitetu');
const czyKoalicjaInput = document.getElementById('czykoalicja');
const iloscGlosowInput = document.getElementById('iloscsglosow');
const zarejestrowaneKomitetyDiv = document.getElementById('zarejestrowanekomitety');
const liczenieButton = document.getElementById('liczenie');
const wynikiTabelaBody = document.querySelector('#wynikiwyborow table tbody');

const komitety = [];

dod.addEventListener('click', (event) => {
    event.preventDefault();

    const nazwaKomitetu = nazwaKomitetuInput.value.trim();
    const czyKoalicja = czyKoalicjaInput.checked;
    const iloscGlosow = parseInt(iloscGlosowInput.value);

    if (nazwaKomitetu === '' || isNaN(iloscGlosow) || iloscGlosow < 0) {
        alert('Proszę wprowadzić poprawną nazwę komitetu oraz liczbę głosów.');
        return;
    }

    komitety.push({
        nazwa: nazwaKomitetu,
        koalicja: czyKoalicja,
        glosy: iloscGlosow,
    });

    const danekomitetow = document.createElement('p');
    danekomitetow.innerHTML = `Komitet: <strong>${nazwaKomitetu}</strong>, Koalicja: ${czyKoalicja ? 'Tak' : 'Nie'}, Głosy: <strong>${iloscGlosow}</strong>`;
    zarejestrowaneKomitetyDiv.appendChild(danekomitetow);

    nazwaKomitetuInput.value = '';
    iloscGlosowInput.value = '';
    czyKoalicjaInput.checked = false;
});

liczenieButton.addEventListener('click', () => {

    let totalGlosy = 0;
    for (const komitet of komitety) {
        totalGlosy += komitet.glosy;
    }

    if (totalGlosy === 0) {
        const row = wynikiTabelaBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.textContent = 'Brak zarejestrowanych głosów.';
        cell.style.textAlign = 'center';
        return;
    }

    const wynikiSzczegolowe = [];
    for (const komitet of komitety) {
        const progWyborczy = komitet.koalicja ? 8 : 5;
        const wynikProcentowy = (komitet.glosy / totalGlosy) * 100;

        wynikiSzczegolowe.push({
            nazwa: komitet.nazwa,
            progWyborczy: progWyborczy,
            glosy: komitet.glosy,
            wynikProcentowy: wynikProcentowy,
            powyzejProgu: wynikProcentowy >= progWyborczy,
        });
    }

    function sortowanie(a, b) {
        return b.glosy - a.glosy; 
    }
    wynikiSzczegolowe.sort(sortowanie);


    for (let i = 0; i < wynikiSzczegolowe.length; i++) {
        const komitet = wynikiSzczegolowe[i];
        const row = wynikiTabelaBody.insertRow();
        if (komitet.powyzejProgu) {
            row.classList.add('powyzejprogu');
        }
        row.insertCell(0).textContent = i + 1;
        row.insertCell(1).textContent = komitet.nazwa;
        row.insertCell(2).textContent = komitet.progWyborczy;
        row.insertCell(3).textContent = komitet.glosy;
        row.insertCell(4).textContent = komitet.wynikProcentowy.toFixed(2);
    }
});
