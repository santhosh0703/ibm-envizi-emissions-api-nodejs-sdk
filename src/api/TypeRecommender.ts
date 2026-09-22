import { Client } from "../Client";
import { TYPE_RECOMMENDER_API_PATH, POST } from "../Constants";
import { SearchRequest } from "../interfaces/Api";
import { TypeRecommenderResponse } from "../interfaces/response/TypeRecommenderResponse";
import { makeApiRequest } from "../request";

/**
 * Search for activity types using semantic search with location, time, and license context. Supports pagination and optional reranker control.
 *
 * @export
 * @param {SearchRequest} payload - The search request data to be sent to the API
 * @return {Promise<TypeRecommenderResponse>} A promise that resolves to the activity types returned by the API
 * @throws {Error} May throw an error if the API request fails
 *
 * The API applies cross-encoder reranking by default. Set `enableReranker` to
 * `false` to keep semantic similarity ordering without reranking. Returned
 * activity type items can include `scope`, a list of distinct GHG Protocol
 * scopes associated with the activity type.
 *
 * @example
 * // Basic search
 * const result = await search({
    "location": {
      "country": "usa"
    },
    "activity": {
      "search": "electricity"
    }
  });

 * @example
 * // Search with time and pagination
 * const result = await search({
    "location": {
      "country": "usa",
      "stateProvince": "california"
    },
    "time": {
      "date": "2025-06-10"
    },
    "activity": {
      "search": "electricity"
    },
    "pagination": {
      "page": 1,
      "size": 10
    }
  });
 
 * @example
 * // Search with power grid
 * const result = await search({
    "location": {
      "country": "usa",
      "powerGrid": "WECC"
    },
    "activity": {
      "search": "renewable energy"
    }
  });
 *
 * @example
 * // Search without cross-encoder reranking
 * const result = await search({
    "location": {
      "country": "usa"
    },
    "activity": {
      "search": "electricity"
    },
    "enableReranker": false
  });
 *
 * @example
 * // Search with optional unit parameter
 * const result = await search({
    "location": {
      "country": "usa"
    },
    "activity": {
      "search": "electricity",
      "unit": "kWh"
    }
  });
 *
 * @example
 * // Search with optional scope parameter
 * const result = await search({
    "location": {
      "country": "usa"
    },
    "activity": {
      "search": "natural gas",
      "scope": "1"
    }
  });
 *
 * @example
 * // Search with both unit and scope parameters
 * const result = await search({
    "location": {
      "country": "usa",
      "stateProvince": "california"
    },
    "time": {
      "date": "2025-06-10"
    },
    "activity": {
      "search": "electricity",
      "unit": "MWh",
      "scope": "2"
    },
    "pagination": {
      "page": 1,
      "size": 10
    }
  });
 */
export async function search(
  payload: SearchRequest
): Promise<TypeRecommenderResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + TYPE_RECOMMENDER_API_PATH;

  return makeApiRequest<TypeRecommenderResponse>({
    method: POST,
    url,
    data: payload,
  });
}