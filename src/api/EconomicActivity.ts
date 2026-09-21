import { Client } from "../Client";
import { ECONOMIC_ACTIVITY_API_PATH, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { makeApiRequest } from "../request";

/**
 * Performs scope 3 Spend based emission calculations by making a POST request to the economic activity API endpoint.
 * Supports optional attribution with revenue for proportional allocation.
 *
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the API
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Basic economic activity request
 * const request = {
    "time": {
      "date": "2025-01-04"
    },
    "location": {
      "country": "usa"
    },
    "activity": {
      "type": "accomodation",
      "value": 1500.12,
      "unit": "usd"
    },
    "includeDetails": false
  };
 * const result = await calculate(request);
 *
 * @example
 * // Economic activity request with revenue attribution
 * const requestWithAttribution = {
    "time": {
      "date": "2025-01-04"
    },
    "location": {
      "country": "usa"
    },
    "activity": {
      "type": "accomodation",
      "value": 1500.12,
      "unit": "usd"
    },
    "attribution": {
      "outstandingAmount": 500000.0,
      "revenue": 2000000.0
    },
    "includeDetails": true
  };
 * const resultWithAttribution = await calculate(requestWithAttribution);
 *
 * @example
 * // Economic activity request with attribution (equity/debt based for private companies)
 * const requestWithEquityDebt = {
     "time": {
       "date": "2025-01-04"
     },
     "location": {
       "country": "usa"
     },
     "activity": {
       "type": "accomodation",
       "value": 1500.12,
       "unit": "usd"
     },
     "attribution": {
       "outstandingAmount": 500000.0,
       "totalEquity": 3000000.0,
       "totalDebt": 2000000.0
     },
     "includeDetails": true
   };
 * const resultWithEquityDebt = await calculate(requestWithEquityDebt);
 *
 * @example
 * // Economic activity request with attribution (EVIC based for listed companies)
 * const requestWithEvic = {
     "time": {
       "date": "2025-01-04"
     },
     "location": {
       "country": "usa"
     },
     "activity": {
       "type": "accomodation",
       "value": 1500.12,
       "unit": "usd"
     },
     "attribution": {
       "outstandingAmount": 500000.0,
       "evic": 10000000.0
     },
     "includeDetails": true
   };
 * const resultWithEvic = await calculate(requestWithEvic);
 */

export async function calculate(
  payload: CommonRequest
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url =  client.getDomain() + ECONOMIC_ACTIVITY_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}
