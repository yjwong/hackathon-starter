'use strict';
const testForm = document.getElementById('test-form');
const testResponse = document.getElementById('test-response');
testForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const request = new XMLHttpRequest();
  request.open('POST', `/api/types/${UI.typeId}/test`, true);
  request.responseType = 'json';
  request.setRequestHeader('content-type', 'application/json');
  request.send(JSON.stringify({
    text: testForm.testText.value
  }));

  testResponse.innerHTML = '';

  const loading = document.createElement('i');
  loading.classList.add('fa');
  loading.classList.add('fa-spinner');
  loading.classList.add('fa-spin');
  loading.classList.add('fa-3x');
  loading.classList.add('fa-fw');
  testResponse.appendChild(loading);

  request.addEventListener('load', () => {
    testResponse.removeChild(loading);

    if (request.status === 204) {
      const placeholder = document.createElement('em');
      placeholder.innerText = 'No response was generated. Email will be forwarded to a forwarding address.';
      testResponse.appendChild(placeholder);
    } else {
      testResponse.innerText = request.response.body;
    }
  });
});
