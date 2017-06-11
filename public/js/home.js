'use strict';
const btnCopyEmail = document.getElementById('btn-copy-email');
if (btnCopyEmail) {
  const clipboard = new Clipboard(btnCopyEmail);

  clipboard.on('success', () => {
      toastr.success('Successfully copied to clipboard!');
  });
}
