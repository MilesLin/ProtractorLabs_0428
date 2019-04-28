import { JasmineIntroService } from './jasmine-intro.service';

describe('JasmineIntroService', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });

  beforeEach(() => {
    console.log('beforeEach');
  });

  it('should add two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.addNumber(1, 2);

    expect(result).toEqual(3);
  });

  it('should subtract two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.subtractNumber(1, 2);

    expect(result).toEqual(-1);
  });

  it('should multiply two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.multiplyNumber(5, 2);

    expect(result).toEqual(10);
  });

  it('should divide two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.dividedNumber(4, 2);

    expect(result).toEqual(2);
  });

  afterEach(() => {
    console.log('afterEach');
  });

  afterAll(() => {
    console.log('afterAll');
  });
});
