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

  const headerH1 = ticketClone.querySelector('.header h1');
  const headerP = ticketClone.querySelector('.header p');
  const attendeeImg = ticketClone.querySelector('#ticket-avatar');
  const attendeeName = ticketClone.querySelector('#ticket-name');
  const githubHandle = ticketClone.querySelector('#ticket-github');
  const ticketNumberEl = ticketClone.querySelector('#ticket-number');

  // Split name for gradient effect
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Generate random ticket number
  const ticketNumber = '#' + Math.floor(10000 + Math.random() * 90000);

  headerH1.innerHTML = `
    Congrats, 
    <span class="text-gradient">${firstName}</span>
    ${lastName ? `<span class="text-gradient">${lastName}</span>` : ''}! 
    Your ticket is ready.
  `;

  headerP.innerHTML = `
    We've emailed your ticket to 
    <span class="text-color">${email}</span> 
    and will send updates in the run up to the event.
  `;

  attendeeImg.src = previewAvatar.src;
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
