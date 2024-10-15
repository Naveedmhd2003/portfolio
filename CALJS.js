document.addEventListener('DOMContentLoaded', function() {
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const monthYear = document.querySelector('.month-year');
    const days = document.querySelector('.days');
    const monthImage = document.getElementById('month-image');
    const currentDateElement = document.querySelector('.current-date');
    const currentTimeElement = document.querySelector('.current-time');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthImages = [
        'january.jpg', 'february.jpg', 'march.jpg',
        'april.jpg', 'may.jpg', 'june.jpg',
        'july.jpg', 'august.jpg', 'september.jpg',
        'october.jpg', 'november.jpg', 'december.jpg'
    ];

    const holidays = {
        '2024-01-15': 'Tamil Thai Pongal Day',
        '2024-01-25': 'Duruthu Full Moon Poya Day',
        '2024-02-04': 'National Day',
        '2024-02-23': 'Navam Full Moon Poya Day',
        '2024-03-08': 'Mahasivarathri Day',
        '2024-03-24': 'Madin Full Moon Poya Day',
        '2024-03-29': 'Good Friday',
        '2024-04-11': 'Id Ul-Fitr',
        '2024-04-12': 'Day prior to Sinhala & Tamil New Year Day',
        '2024-04-13': 'Sinhala & Tamil New Year Day',
        '2024-04-23': 'Bak Full Moon Poya Day',
        '2024-05-01': 'May Day',
        '2024-05-23': 'Vesak Full Moon Poya Day',
        '2024-05-24': 'Day following Vesak Full Moon Poya Day',
        '2024-06-17': 'Id Ul-Alha',
        '2024-06-21': 'Poson Full Moon Poya Day',
        '2024-07-20': 'Esala Full Moon Poya Day',
        '2024-08-19': 'Nikini Full Moon Poya Day',
        '2024-09-16': 'Milad un-Nabi',
        '2024-09-17': 'Binara Full Moon Poya Day',
        '2024-10-17': 'Vap Full Moon Poya Day',
        '2024-10-31': 'Deepavali',
        '2024-11-15': 'Ill Full Moon Poya Day',
        '2024-12-14': 'Unduvap Full Moon Poya Day',
        '2024-12-25': 'Christmas Day'
    };

    function renderCalendar() {
        days.innerHTML = '';
        monthYear.textContent = `${months[currentMonth]} ${currentYear}`;
        monthImage.src = monthImages[currentMonth];

        let firstDay = new Date(currentYear, currentMonth, 1).getDay();
        let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        firstDay = (firstDay + 6) % 7;

        for (let i = 0; i < firstDay; i++) {
            days.innerHTML += '<li></li>';
        }

        for (let i = 1; i <= lastDate; i++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isHoliday = holidays[dateStr] !== undefined;
            const holidayName = holidays[dateStr] || '';
            const holidayClass = isHoliday ? 'holiday' : '';
            const tooltip = isHoliday ? `title="${holidayName}"` : '';
            const todayClass = (i === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) ? 'today' : '';
			
            days.innerHTML += `<li class="${holidayClass} ${todayClass}" ${tooltip}>${i}</li>`;
        }

        const totalDays = firstDay + lastDate;
        const remainingDays = 7 - (totalDays % 7);

        if (remainingDays < 7) {
            for (let i = 0; i < remainingDays; i++) {
                days.innerHTML += '<li></li>';
            }
        }
    }

    function updateDateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString(undefined, options);
        const formattedTime = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        currentDateElement.textContent = formattedDate;
        currentTimeElement.textContent = formattedTime;
    }

    prev.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    next.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    renderCalendar();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
