document.addEventListener("DOMContentLoaded", function() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    
    if (!lastVisit) {
        // Es la primera visita
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDifference = currentVisit - lastVisitDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Guardar la fecha de la visita actual en localStorage
    localStorage.setItem('lastVisit', currentVisit);

    const lazyImages = document.querySelectorAll('.lazy-image');

    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy-image');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(image => {
            lazyImageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
        });
    }

    const calendarElement = document.getElementById('calendar');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Nombres de los días de la semana
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Mostrar los encabezados de los días de la semana
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('header');
        dayHeader.textContent = day;
        calendarElement.appendChild(dayHeader);
    });

    // Función para obtener el primer día del mes y cuántos días tiene
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Función para obtener el día de la semana del primer día del mes
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    // Generar los días del calendario
    function generateCalendar(year, month) {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        // Limpiar el calendario
        calendarElement.querySelectorAll('.day').forEach(day => day.remove());

        // Agregar espacios en blanco para los días antes del primer día del mes
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarElement.appendChild(emptyCell);
        }

        // Agregar los días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day');
            dayCell.textContent = day;
            calendarElement.appendChild(dayCell);
        }
    }

    // Generar el calendario para el mes actual
    generateCalendar(currentYear, currentMonth);
});

