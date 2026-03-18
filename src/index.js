import ArrayBufferConverter from './js/ArrayBufferConverter';
import getBuffer from './js/getBuffer';

const converter = new ArrayBufferConverter();
const buffer = getBuffer();

converter.load(buffer);
console.log('Преобразованный ArrayBuffer в строку:');
console.log(converter.toString());

console.log('ArrayBufferConverter готов к использованию!');
