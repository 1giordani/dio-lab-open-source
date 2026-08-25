const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('arquivos essenciais existem', () => {
  [
    'docs/ferias.html',
    'docs/assets/css/ferias.css',
    'docs/assets/js/ferias.js',
    'docs/assets/data/ferias.json'
  ].forEach((file) => assert.ok(fs.existsSync(path.join(root, file)), `${file} não encontrado`));
});

test('dados fictícios possuem estrutura e períodos válidos', () => {
  const records = JSON.parse(read('docs/assets/data/ferias.json'));
  assert.ok(records.length >= 1);
  records.forEach((record) => {
    assert.equal(typeof record.usuario, 'string');
    assert.equal(typeof record.matricula, 'string');
    assert.ok(record.ferias['2025']);
    assert.ok(record.ferias['2026']);
    Object.values(record.ferias).forEach(({ inicio, fim }) => {
      assert.match(inicio, /^\d{4}-\d{2}-\d{2}$/);
      assert.match(fim, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(new Date(inicio) <= new Date(fim));
    });
  });
});

test('página referencia seus recursos e informa o caráter demonstrativo', () => {
  const page = read('docs/ferias.html');
  assert.match(page, /assets\/css\/ferias\.css/);
  assert.match(page, /assets\/js\/ferias\.js/);
  assert.match(page, /dados são fictícios/i);
});
