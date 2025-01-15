const openBtn = document.querySelector('#open-modal');
const dialog = document.querySelector('#dialog');
const closeBtn = document.querySelector('#close-modal');

openBtn.addEventListener('click', () => dialog.showModal());
closeBtn.addEventListener('click', () => dialog.close());

// close modal when clicking outside
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  const isInDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isInDialog) {
    dialog.close();
  }
});


const open2Btn = document.querySelector('#open-2-modal');
const dialog2 = document.querySelector('#dialog2');
const close2Btn = document.querySelector('#close-2-modal');

open2Btn.addEventListener('click', () => dialog2.showModal());
close2Btn.addEventListener('click', () => dialog2.close());

// close modal when clicking outside
dialog2.addEventListener('click', event => {
  const rect = dialog2.getBoundingClientRect();
  const isIndialog2 =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isIndialog2) {
    dialog2.close();
  }
});