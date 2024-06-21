const cron = require("node-cron");
const scrapeAndSave = require("../controllers/scraperdolar.controller");

jest.mock("node-cron");
jest.mock("../controllers/scraperdolar.controller");

describe("Cron Job", () => {
  let scheduleMock;

  beforeAll(() => {
    scheduleMock = jest.fn((interval, callback) => {
      callback();
    });
    cron.schedule.mockImplementation(scheduleMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should schedule the cron job to run every minute", () => {
    require("../controllers/cron");
    expect(cron.schedule).toHaveBeenCalledWith(
      "*/1 * * * *",
      expect.any(Function)
    );
  });

  it("should call scrapeAndSave function when cron job runs", () => {
    require("../controllers/cron");
    expect(scrapeAndSave).toHaveBeenCalled();
  });

  it("should log an error if scrapeAndSave throws an error", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    scrapeAndSave.mockImplementation(() => {
      throw new Error("Test Error");
    });

    require("../controllers/cron");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error en la tarea cron:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
