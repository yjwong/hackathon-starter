'use strict';
const btnCopyEmail = document.getElementById('btn-copy-email');
const clipboard = new Clipboard(btnCopyEmail);

clipboard.on('success', () => {
    toastr.success('Successfully copied to clipboard!');
});

const contexts = Array.prototype.slice.call(document.querySelectorAll('.sample-context'));
for (const context of contexts) {
  const inputSelectedKeywords = context.querySelector('.input-selected-keywords');
  jQuery(inputSelectedKeywords).tagsinput();

  const sampleId = context.dataset.sampleId;
  const sampleText = context.querySelector('.sample-text');
  const highlighter = new TextHighlighter(sampleText, {
    onAfterHighlight: function (range, highlights) {
      console.log(highlights[0].innerText);
      jQuery(inputSelectedKeywords).tagsinput('add', highlights[0].innerText);
    }
  });

  const btnRemoveAll = context.querySelector('.btn-remove-all');
  btnRemoveAll.addEventListener('click', () => {
    highlighter.removeHighlights();
    jQuery(inputSelectedKeywords).removeAll();
  });
}

const ws = new WebSocket(`ws://${location.host}`);

ws.addEventListener('open', () => {
  console.log(`Connected to WebSocket server at ${ws.url}`);
});

ws.addEventListener('message', (message) => {
  // TODO: Should properly handle views.
  location.reload();
});