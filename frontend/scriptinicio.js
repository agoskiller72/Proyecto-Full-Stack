
const productCards = document.querySelectorAll('.product-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

productCards.forEach(card => observer.observe(card));


function processFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Por favor, selecciona un archivo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const filename = file.name;
    gk_fileData[filename] = e.target.result.split(',')[1]; 
    gk_xlsxFileLookup[filename] = true;
    gk_isXlsx = filename.endsWith('.xlsx');

    const csvData = loadFileData(filename);
    if (csvData) {
      displayTable(csvData);
    } else {
      alert('Error al procesar el archivo.');
    }
  };
  reader.readAsDataURL(file);
}


function displayTable(csvData) {
  const rows = csvData.split('\n').map(row => row.split(','));
  let table = '<table class="w-full border-collapse border border-sky-600">';
  rows.forEach((row, index) => {
    table += '<tr>';
    row.forEach(cell => {
      const tag = index === 0 ? 'th' : 'td';
      table += `<${tag} class="border border-sky-600 p-2">${cell}</${tag}>`;
    });
    table += '</tr>';
  });
  table += '</table>';
  document.getElementById('tableContainer').innerHTML = table;
}