document.getElementById('regForm').addEventListener('submit', function (e) {
    let valid = true;

    const mezok = [
        {
            elem: document.getElementById('email'),
            feltetel: (value) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
            uzenet: 'E-mail'
        },
        {
            elem: document.getElementById('nev'),
            feltetel: (value) => value.length >= 5 && value.length <= 30,
            uzenet: 'Név (5–30 karakter)'
        },
        {
            elem: document.getElementById('jelszo'),
            feltetel: (value) => value.length >= 6 && value.length <= 12,
            uzenet: 'Jelszó (6–12 karakter)'
        },
        {
            elem: document.getElementById('kor'),
            feltetel: (value) => !isNaN(parseInt(value)) && parseInt(value) >= 18 && parseInt(value) <= 100,
            uzenet: 'Kor (18–100)'
        }
    ];

    const nemek = document.getElementsByName('nem');

    // Mezők visszaállítása
    mezok.forEach(({ elem }) => {
        elem.style.backgroundColor = '';
        const elozetesHiba = document.querySelector(`#hiba-${elem.id}`);
        if (elozetesHiba) elozetesHiba.remove();
    });

    // Hiba megjelenítés
    const mutatHibat = (mezo, uzenet) => {
        const hiba = document.createElement('div');
        hiba.id = 'hiba-' + mezo.id;
        hiba.style.color = 'red';
        hiba.textContent = 'Hibás adat: ' + uzenet;
        mezo.parentNode.insertBefore(hiba, mezo);
        mezo.style.backgroundColor = '#f99';
        valid = false;
    };

    // Mezők validációja
    mezok.forEach(({ elem, feltetel, uzenet }) => {
        if (!feltetel(elem.value.trim())) {
            mutatHibat(elem, uzenet);
        }
    });

    // Nemek validációja
    if (!Array.from(nemek).some(nem => nem.checked)) {
        alert('Hibás adat: Nem');
        valid = false;
    }

    if (!valid) e.preventDefault();
});
