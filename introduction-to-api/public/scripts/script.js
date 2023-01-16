let companies;


function createEditableCell(value) {
  const cell = document.createElement('td');

  const input = document.createElement('input');

  input.value = value;
  input.type = isNaN(value) ? 'text' : 'number';

  cell.appendChild(input);

  return cell;
}

function createCell(text) {
  let cell = document.createElement('td');
  cell.innerText = text;
  return cell;
}

function createButton(text, onClick) {
  let button = document.createElement('button');
  button.innerText = text;
  button.onclick = onClick;
  return button;
}

function viewRow(company, index) {
  const tbody = document.querySelector('tbody');

  tbody.replaceChild(createRow(company, index), tbody.children[index]);
}

function editRow(company, index) {
  const tbody = document.querySelector('tbody');

  tbody.replaceChild(createEditableRow(company), tbody.children[index]);
}

function createEditButtons(company) {
  let cell = document.createElement('td');

  cell.appendChild(
    createButton('Save', () => {
      const index = companies.indexOf(company);
      const row = document.querySelector('tbody').children[index];

      company.name = row.children[0].children[0].value;
      company.ticker = row.children[1].children[0].value;
      company.price = row.children[2].children[0].value;

      viewRow(companies[index], index);
    })
  );

  cell.appendChild(
    createButton('Cancel', () => viewRow(company, companies.indexOf(company)))
  );

  return cell;
}

function createButtons(company) {
  let cell = document.createElement('td');

  let edit = createButton('Edit', () => {
    let index = companies.indexOf(company);

    editRow(company, index);
  });

  let remove = createButton('Remove', () => {
    let index = companies.indexOf(company);
    companies.splice(index, 1);
    cell.parentElement.remove();
  });

  cell.appendChild(edit);
  cell.appendChild(remove);

  return cell;
}

function addCompanyToTable(company) {
  const tbody = document.querySelector('tbody');

  tbody.appendChild(createRow(company));
}

function createRow(company) {
  const tr = document.createElement('tr');

  tr.appendChild(createCell(company.name));
  tr.appendChild(createCell(company.ticker));
  tr.appendChild(createCell(company.price));
  tr.appendChild(createButtons(company));

  return tr;
}

function createEditableRow(company) {
  const tr = document.createElement('tr');

  tr.appendChild(createEditableCell(company.name));
  tr.appendChild(createEditableCell(company.ticker));
  tr.appendChild(createEditableCell(company.price));
  tr.appendChild(createEditButtons(company));

  return tr;
}

function showForm() {
  document.querySelector('form').style.display = 'block';
  document.querySelector('#add').style.display = 'none';
}

function hideForm() {
  document.querySelector('form').style.display = 'none';
  document.querySelector('#add').style.display = 'block';
}

async function loadCompanies() {
  let params = new URLSearchParams(location.search)
  
  let res = await fetch(`/companies?token=${params.get('token')}`);
  companies = await res.json();
  for (let company of companies) {
    addCompanyToTable(company);
  }
}

window.onload = () => {
  loadCompanies();
}


