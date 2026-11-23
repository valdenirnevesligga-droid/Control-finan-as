// Copia o leitor de PDF para dentro do app (assim funciona offline)
const fs = require('fs'), path = require('path');
const origem = path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build');
const destino = path.join(__dirname, '..', 'www', 'libs');
fs.mkdirSync(destino, { recursive: true });
['pdf.min.js', 'pdf.worker.min.js'].forEach(f => {
  fs.copyFileSync(path.join(origem, f), path.join(destino, f));
  console.log('copiado', f);
});
