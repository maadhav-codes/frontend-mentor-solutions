export function showGeneratedTicket({
  fullName,
  email,
  githubUsername,
  previewAvatar,
}) {
  const template = document.getElementById('ticket-template');
  if (!template) {
    console.error('Ticket template not found!');
    return;
  }

  const ticketClone = template.content.cloneNode(true);

  const ticketHeading = ticketClone.querySelector('#ticket-heading');
  const ticketDescription = ticketClone.querySelector('#ticket-description');
  const attendeeImg = ticketClone.querySelector('#ticket-avatar');
  const attendeeName = ticketClone.querySelector('#ticket-name');
  const githubHandle = ticketClone.querySelector('#ticket-github');
  const ticketNumberEl = ticketClone.querySelector('#ticket-number');

  const fragment = document.createDocumentFragment();

  // Split name for gradient effect
  const nameParts = fullName.trim().split(' ');

  // Generate random ticket number
  const ticketNumber = '#' + Math.floor(10000 + Math.random() * 90000);

  nameParts.forEach((part, index) => {
    const span = document.createElement('span');
    span.textContent = part;
    span.classList.add('text-gradient');
    fragment.appendChild(span);

    if (index < nameParts.length - 1) {
      fragment.appendChild(document.createTextNode(' '));
    }
  });

  ticketHeading.appendChild(fragment);

  const emailSpan = document.createElement('span');
  emailSpan.textContent = email;
  emailSpan.classList.add('text-color');
  ticketDescription.appendChild(emailSpan);

  attendeeImg.src = previewAvatar;
  attendeeImg.alt = `Profile picture of ${fullName}`;

  attendeeName.textContent = fullName;

  githubHandle.textContent = githubUsername.startsWith('@')
    ? githubUsername
    : `@${githubUsername}`;

  ticketNumberEl.textContent = ticketNumber;

  const ticketGenerator = document.querySelector('.ticket-generator');
  if (ticketGenerator) {
    ticketGenerator.style.display = 'none';
  }

  const oldTicket = document.querySelector('.ticket-generated');
  if (oldTicket) {
    oldTicket.remove();
  }

  document.querySelector('.container').appendChild(ticketClone);

  console.log('🎟️ Ticket generated successfully!');
}
