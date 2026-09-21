/**
 * Request body used to trigger an audit data export.
 *
 * @interface AuditExportRequest
 */
export interface AuditExportRequest {
  /** Inclusive start date in yyyy-MM-dd format. */
  fromDate: string;

  /** Inclusive end date in yyyy-MM-dd format. */
  toDate: string;

  /** Optional case-insensitive endpoint filter. */
  apiName?: string;
}

/**
 * Processing states for an audit export.
 */
export type AuditExportStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "EXPIRED";

/**
 * Follow-up links returned by the audit export API.
 *
 * @interface AuditExportLinks
 */
export interface AuditExportLinks {
  /** URL for retrieving the export status. */
  status?: string;

  /** URL for downloading a completed export. */
  download?: string;
}

/**
 * Response returned when an audit export is accepted.
 *
 * @interface AuditExportResponse
 */
export interface AuditExportResponse {
  /** Unique identifier used to retrieve the export status and download. */
  requestId: string;

  /** Current processing state. A newly accepted export is QUEUED. */
  status: AuditExportStatus;

  /** Human-readable result message. */
  message?: string;

  /** ISO-8601 timestamp for when the export was submitted. */
  submittedAt?: string;

  /** Links for retrieving the export status and download. */
  links?: AuditExportLinks;
}

/**
 * Response returned when checking an audit export's status.
 *
 * @interface AuditExportStatusResponse
 */
export interface AuditExportStatusResponse {
  /** Unique identifier returned when the export was triggered. */
  requestId: string;

  /** Current processing state. */
  status: AuditExportStatus;

  /** ISO-8601 timestamp for when the export was submitted. */
  submittedAt?: string;

  /** ISO-8601 timestamp for when processing completed. */
  completedAt?: string;

  /** ISO-8601 timestamp after which the completed export is unavailable. */
  expiresAt?: string;

  /** Download link when the export is completed. */
  links?: Pick<AuditExportLinks, "download">;

  /** Human-readable failure or expiry message. */
  message?: string;
}
