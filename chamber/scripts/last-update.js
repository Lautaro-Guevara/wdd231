const year = document.querySelector("#year");

const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

lastModified.innerHTML = `Last modification: <span class="highlight">${document.lastModified}</span>`;