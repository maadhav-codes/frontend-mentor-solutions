# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## My process

### Built with

- Semantic HTML5 markup with proper ARIA attributes for accessibility
- CSS custom properties (variables) for consistent theming
- CSS Flexbox for layout structure
- Mobile-first workflow with responsive media queries
- Vanilla JavaScript (ES6 modules) for dynamic functionality
- HTML `<template>` element for dynamic ticket generation
- HTML5 File API and Drag & Drop API for avatar uploads

### Key learnings

This project helped reinforce my understanding of:

- **Handling File Uploads:** Using the `FileReader` API to preview images before submission and implementing the HTML5 Drag and Drop API for an enhanced user experience.
- **Using HTML Templates:** Utilizing the `<template>` element and `DocumentFragment` to safely construct and insert the generated ticket into the DOM dynamically.
- **Securing against XSS vulnerabilities:** Replacing `innerHTML` with `textContent`, `document.createElement()`, and `document.createTextNode()` to safely render user-provided input (name, email) without executing potential malicious scripts.
- **Form Validation:** Building robust client-side validation logic, including custom file type and size constraints, and integrating proper ARIA live regions to announce errors to screen readers natively.

## Author

- GitHub - [maadhav-codes](https://github.com/maadhav-codes)
- Frontend Mentor - [@maadhav-codes](https://www.frontendmentor.io/profile/maadhav-codes)
