import ArrayBufferConverter from '../src/js/ArrayBufferConverter';
import getBuffer from '../src/js/getBuffer';

describe('ArrayBufferConverter', () => {
  let converter;
  let buffer;

  beforeEach(() => {
    converter = new ArrayBufferConverter();
    buffer = getBuffer();
  });

  test('should create instance correctly', () => {
    expect(converter).toBeInstanceOf(ArrayBufferConverter);
    expect(converter.buffer).toBeNull();
  });

  test('should load buffer correctly', () => {
    converter.load(buffer);
    expect(converter.buffer).toBe(buffer);
  });

  test('should convert buffer to string correctly', () => {
    converter.load(buffer);
    const result = converter.toString();
    const expected = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
    expect(result).toBe(expected);
  });

  test('should throw error when toString called without buffer', () => {
    expect(() => {
      converter.toString();
    }).toThrow('Buffer not loaded');
  });

  test('should handle empty buffer', () => {
    const emptyBuffer = new ArrayBuffer(0);
    converter.load(emptyBuffer);
    expect(converter.toString()).toBe('');
  });

  test('should convert different data correctly', () => {
    const testData = 'test string';
    const testBuffer = ((input) => {
      const buf = new ArrayBuffer(input.length * 2);
      const view = new Uint16Array(buf);
      for (let i = 0; i < input.length; i += 1) {
        view[i] = input.charCodeAt(i);
      }
      return buf;
    })(testData);

    converter.load(testBuffer);
    expect(converter.toString()).toBe(testData);
  });
});
