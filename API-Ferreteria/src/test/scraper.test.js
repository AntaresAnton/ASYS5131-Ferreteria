// tests/scraper.test.js
const axios = require('axios');
const mysql = require('mysql');
const scrapeAndSave = require('../controllers/scraperdolar.controller');

jest.mock('axios');
jest.mock('mysql');

describe('scrapeAndSave', () => {
  let queryMock;
  let endMock;

  beforeAll(() => {
    queryMock = jest.fn();
    endMock = jest.fn();

    mysql.createConnection.mockReturnValue({
      connect: jest.fn(),
      query: queryMock,
      end: endMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should scrape the API and save the data to the database', async () => {
    const mockData = {
      data: {
        dolar: {
          valor: 800
        }
      }
    };

    axios.get.mockResolvedValue(mockData);

    await scrapeAndSave();

    expect(axios.get).toHaveBeenCalledWith('https://mindicador.cl/api');
    expect(queryMock).toHaveBeenCalledWith(
      'UPDATE divisas SET valor = ? WHERE divisas.codigo_divisa = \'USD\'',
      [800],
      expect.any(Function)
    );
    expect(endMock).not.toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    await scrapeAndSave();

    expect(axios.get).toHaveBeenCalledWith('https://mindicador.cl/api');
    expect(queryMock).not.toHaveBeenCalled();
    expect(endMock).toHaveBeenCalled();
  });

  it('should handle database errors', async () => {
    const mockData = {
      data: {
        dolar: {
          valor: 800
        }
      }
    };

    axios.get.mockResolvedValue(mockData);
    queryMock.mockImplementation((query, values, callback) => {
      callback(new Error('Database Error'));
    });

    await scrapeAndSave();

    expect(axios.get).toHaveBeenCalledWith('https://mindicador.cl/api');
    expect(queryMock).toHaveBeenCalledWith(
      'UPDATE divisas SET valor = ? WHERE divisas.codigo_divisa = \'USD\'',
      [800],
      expect.any(Function)
    );
    expect(endMock).not.toHaveBeenCalled();
  });
});
