import { Buffer } from "node:buffer";
import { Client } from "../Client";
import {
  AUDIT_EXPORT_API_PATH,
  AUDIT_EXPORT_DOWNLOAD_API_PATH,
  AUDIT_EXPORT_STATUS_API_PATH,
  GET,
  POST,
} from "../Constants";
import {
  AuditExportRequest,
  AuditExportResponse,
  AuditExportStatusResponse,
} from "../interfaces/response/AuditExportResponse";
import { makeApiRequest } from "../request";

/**
 * Triggers an asynchronous audit data export.
 *
 * @export
 * @param {AuditExportRequest} payload - Date range and optional API-name filter for the export
 * @return {Promise<AuditExportResponse>} The accepted export request, including its request ID
 * @throws {Error} Throws if the request is invalid, the caller is not an admin, or a matching export already exists
 *
 * @example
 * const auditExport = await trigger({
 *   fromDate: "2025-01-01",
 *   toDate: "2025-03-31",
 *   apiName: "location"
 * });
 */
export async function trigger(
  payload: AuditExportRequest
): Promise<AuditExportResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_EXPORT_API_PATH;

  return makeApiRequest<AuditExportResponse>({
    method: POST,
    url,
    data: payload,
  });
}

/**
 * Retrieves the processing status of an audit export.
 *
 * @export
 * @param {string} requestId - Request ID returned by trigger
 * @return {Promise<AuditExportStatusResponse>} Current export status and, when complete, download details
 * @throws {Error} Throws if the request ID is invalid or the caller is not an admin
 *
 * @example
 * const status = await getStatus(auditExport.requestId);
 */
export async function getStatus(
  requestId: string
): Promise<AuditExportStatusResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_EXPORT_STATUS_API_PATH;

  return makeApiRequest<AuditExportStatusResponse>({
    method: GET,
    url,
    params: { requestId },
  });
}

/**
 * Downloads a completed audit export as a ZIP archive.
 *
 * @export
 * @param {string} requestId - Request ID returned by trigger
 * @return {Promise<Buffer>} ZIP archive containing audit-export.csv
 * @throws {Error} Throws while processing, when the export failed or expired, or if the caller is not an admin
 *
 * @example
 * const auditExportZip = await download(auditExport.requestId);
 */
export async function download(requestId: string): Promise<Buffer> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_EXPORT_DOWNLOAD_API_PATH;

  return makeApiRequest<Buffer>({
    method: GET,
    url,
    params: { requestId },
    responseType: "arraybuffer",
  });
}
