
 const studentForm = document.getElementById('student-form');
 const displaySection = document.getElementById('display-section');
 const formTitle = document.getElementById('form-title');

 studentForm.addEventListener('submit', function(event) {
     event.preventDefault(); 

     const imie = document.getElementById('imie').value;
     const nazwisko = document.getElementById('nazwisko').value;
     const klasa = document.getElementById('klasa').value;
     const rokSzkolny = document.getElementById('rok_szkolny').value;
     const odbytejW = document.getElementById('odbytej_w').value;
     const dataRozpoczecia = document.getElementById('data_rozpoczecia').value;
     const dataZakonczenia = document.getElementById('data_zakonczenia').value;

     if (!imie || !nazwisko || !klasa || !rokSzkolny || !odbytejW || !dataRozpoczecia || !dataZakonczenia) {
         alert('Proszę wypełnić wszystkie pola formularza.');
         return; 
     }

     
     const displayHTML = `
         <p>Imię i nazwisko: <span class="data-value">${imie} ${nazwisko}</span></p>
         <p>Klasa: <span class="data-value">${klasa}</span>, rok szkolny: <span class="data-value">${rokSzkolny}</span></p>
         <p>Odbytej w: <span class="data-value">${odbytejW}</span></p>
         <p>W terminie: od <span class="data-value">${dataRozpoczecia}</span> do <span class="data-value">${dataZakonczenia}</span></p>
         <button id="edit-button" class="edit-button">Edytuj</button>
     `;

     displaySection.innerHTML = displayHTML;

     formTitle.textContent = 'Dane ucznia';

     studentForm.style.display = 'none';

     displaySection.style.display = 'block';


     const editButton = document.getElementById('edit-button');
     editButton.addEventListener('click', function() {
             studentForm.style.display = 'block';
             displaySection.style.display = 'none';
             formTitle.textContent = 'Wprowadź dane ucznia i praktyki';
         });
     }
 );
