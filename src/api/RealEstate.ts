import { Client } from "../Client";
import { REAL_ESTATE_API_PATH, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { makeApiRequest } from "../request";

/**
 * Performs scope 3 Real estate emission calculations by making a POST request to the real estate API endpoint.
 *
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the API
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Basic request without attribution
 * const request = {
    "time": {
      "date": "2025-01-04"
    },
    "location": {
      "country": "usa"
    },
    "activity": {
      "type": "Commercial Real Estate:Industrial distribution warehouse",
      "value": 17000.123,
      "unit": "m2"
    },
    "includeDetails": false
  };
 * const result = await calculate(request);
 *
 * @example
 * // Request with attribution (property value based)
 * const requestWithAttribution = {
    "time": {
      "date": "2022-01-01"
    },
    "location": {
      "country": "usa",
      "stateProvince": "new york"
    },
    "activity": {
      "type": "Commercial Real Estate:Office",
      "value": 123456.0,
      "unit": "m2"
    },
    "attribution": {
      "outstandingAmount": 1000000.0,
      "propertyValue": 5000000.0
    },
    "includeDetails": true
  };
* const resultWithAttribution = await calculate(requestWithAttribution);
*/

export async function calculate(
  payload: CommonRequest
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url =  client.getDomain() + REAL_ESTATE_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}