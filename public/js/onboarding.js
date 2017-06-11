'use strict';
const typesContainer = document.getElementById('types-container');
const btnAddRow = document.getElementById('btn-add-row');

function createRow() {
    const divFormGroup = document.createElement('div');
    divFormGroup.classList.add('form-group');

    const input = document.createElement('input');
    input.classList.add('form-control');
    input.classList.add('input-lg');
    input.type = 'text';
    input.name = 'types[]';
    input.placeholder = 'Enquiries, reports, \u2026';

    divFormGroup.appendChild(input);
    return divFormGroup;
}

btnAddRow.addEventListener('click', () => {
    typesContainer.appendChild(createRow());
});
