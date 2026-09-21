import { Buffer } from "buffer";
import { Client } from "../src/Client";
import { download, getStatus, trigger } from "../src/api/AuditExport";
import {
  AUDIT_EXPORT_API_PATH,
  AUDIT_EXPORT_DOWNLOAD_API_PATH,
  AUDIT_EXPORT_STATUS_API_PATH,
  GET,
  POST,
} from "../src/Constants";
import * as request from "../src/request";

jest.mock("../src/request");
jest.mock("../src/Client");

describe("AuditExport", () => {
  const domain = "https://dev.api.ibm.com/ghgemissions/test";
  const requestId = "tenant-uuid/20250101-20250331-location";

  beforeEach(() => {
    jest.clearAllMocks();
    (Client.getInstance as jest.Mock).mockReturnValue({
      getDomain: jest.fn().mockReturnValue(domain),
    });
  });

  it("triggers an audit export", async () => {
    const payload = {
      fromDate: "2025-01-01",
      toDate: "2025-03-31",
      apiName: "location",
    };
    const response = { requestId, status: "QUEUED" };
    (request.makeApiRequest as jest.Mock).mockResolvedValue(response);

    await expect(trigger(payload)).resolves.toEqual(response);
    expect(request.makeApiRequest).toHaveBeenCalledWith({
      method: POST,
      url: `${domain}${AUDIT_EXPORT_API_PATH}`,
      data: payload,
    });
  });

  it("gets an audit export status", async () => {
    const response = { requestId, status: "COMPLETED" };
    (request.makeApiRequest as jest.Mock).mockResolvedValue(response);

    await expect(getStatus(requestId)).resolves.toEqual(response);
    expect(request.makeApiRequest).toHaveBeenCalledWith({
      method: GET,
      url: `${domain}${AUDIT_EXPORT_STATUS_API_PATH}`,
      params: { requestId },
    });
  });

  it("downloads a completed audit export as binary data", async () => {
    const response = Buffer.from("zip-content");
    (request.makeApiRequest as jest.Mock).mockResolvedValue(response);

    await expect(download(requestId)).resolves.toBe(response);
    expect(request.makeApiRequest).toHaveBeenCalledWith({
      method: GET,
      url: `${domain}${AUDIT_EXPORT_DOWNLOAD_API_PATH}`,
      params: { requestId },
      responseType: "arraybuffer",
    });
  });
});
