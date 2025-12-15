// Initialize EmailJS (only if keys are provided)
// Replace the placeholders below with your actual EmailJS credentials:
const EMAILJS_PUBLIC_KEY = '';
const EMAILJS_SERVICE_ID = '';
const EMAILJS_TEMPLATE_ID = '';

if (EMAILJS_PUBLIC_KEY) {
  // eslint-disable-next-line no-undef
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/**
 * Validate booking time and handle submission
 */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bookingForm');
  const resultDiv = document.getElementById('bookingResult');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const dateStr = document.getElementById('date').value;
    const timeStr = document.getElementById('time').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!dateStr || !timeStr) {
      resultDiv.textContent = 'Por favor selecione data e hora.';
      return;
    }

    // Parse selected date and time
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const selectedDate = new Date(year, month - 1, day, hours, minutes);
    const dayOfWeek = selectedDate.getDay(); // 0=Dom,1=Seg,...,6=Sab
    const minutesTotal = hours * 60 + minutes;

    // Determine allowed time range in minutes since midnight
    let startAllowed;
    let endAllowed;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Segunda a Sexta: 17:30–21:30
      startAllowed = 17 * 60 + 30;
      endAllowed = 21 * 60 + 30;
    } else {
      // Sábado e Domingo: 10:00–19:00
      startAllowed = 10 * 60;
      endAllowed = 19 * 60;
    }

    // Check if selected time is within allowed range
    if (minutesTotal < startAllowed || minutesTotal > endAllowed) {
      resultDiv.textContent =
        'Horário inválido. Selecione um horário dentro do período permitido.';
      return;
    }

    // Load existing bookings from localStorage
    const bookingsKey = 'washclean_bookings';
    const bookings = JSON.parse(localStorage.getItem(bookingsKey) || '[]');
    const bookingIdentifier = `${dateStr}T${timeStr}`;

    // If slot already taken, suggest next available slot
    if (bookings.includes(bookingIdentifier)) {
      let nextMinutes = minutesTotal + 30;
      let suggestion = null;
      while (nextMinutes <= endAllowed) {
        const hh = String(Math.floor(nextMinutes / 60)).padStart(2, '0');
        const mm = String(nextMinutes % 60).padStart(2, '0');
        const candidate = `${dateStr}T${hh}:${mm}`;
        if (!bookings.includes(candidate)) {
          suggestion = `${hh}:${mm}`;
          break;
        }
        nextMinutes += 30;
      }
      if (suggestion) {
        resultDiv.textContent = `Esse horário já está reservado. Sugerimos ${suggestion}.`;
      } else {
        resultDiv.textContent =
          'Todos os horários disponíveis para esse dia já estão reservados. Escolha outra data.';
      }
      return;
    }

    // Add booking to localStorage
    bookings.push(bookingIdentifier);
    localStorage.setItem(bookingsKey, JSON.stringify(bookings));

    // Prepare parameters for EmailJS
    const templateParams = {
      name: name,
      email: email,
      service: service,
      date: dateStr,
      time: timeStr,
      message: message,
    };

    // Send email via EmailJS if configured
    if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
      // eslint-disable-next-line no-undef
      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(
          function () {
            resultDiv.textContent =
              'Marcação efetuada com sucesso! Confirmação enviada por email.';
          },
          function () {
            resultDiv.textContent =
              'Marcação registada mas ocorreu um erro ao enviar email.';
          }
        );
    } else {
      // Fallback when EmailJS is not configured
      resultDiv.textContent =
        'Marcação efetuada com sucesso! Em breve entraremos em contacto por email.';
    }

    // Reset form
    form.reset();
  });
});
