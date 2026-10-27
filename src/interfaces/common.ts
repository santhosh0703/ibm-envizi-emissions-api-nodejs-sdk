/**
 * Represents a geographical location.
 * @interface Location
 */
export interface Location {
  /**
   * The country of the location.
   */
  country: string;
  
  /**
   * Optional state or province within the country.
   */
  stateProvince?: string;
  
  /**
   * Optional power grid identifier for the location.
   */
  powerGrid?: string;
}

/**
 * Represents a point in time with date information.
 * @interface Time
 */
export interface Time {
  /**
   * The date in string format.
   */
  date: string
}

/**
 * Represents an activity with type, value, and unit of measurement.
 * @interface Activity
 */
export interface Activity {
  /**
   * The type or category of the activity.
   */
  type: string;
  
  /**
   * The numerical value of the activity.
   */
  value: number;
  
  /**
   * The unit of measurement for the activity value.
   */
  unit: string; 
}

/**
 * Represents an activity identified by a factor ID instead of a type.
 * @interface ActivityWithFactorId
 */
export interface ActivityWithFactorId {
  /**
   * The unique identifier for the activity factor.
   */
  factorId: number;
  
  /**
   * The numerical value of the activity.
   */
  value: number;
  
  /**
   * The unit of measurement for the activity value.
   */
  unit: string; 
}

/**
 * Represents an activity that can have single or multiple values and units.
 * @interface CombinedUnitsActivity
 */
export interface CombinedUnitsActivity {
  /**
   * The type or category of the activity.
   */
  type: string;
  
  /**
   * The numerical value(s) of the activity. Can be a single number or an array of numbers.
   */
  value: number | number[];
  
  /**
   * The unit(s) of measurement for the activity value(s). Can be a single string or an array of strings.
   */
  unit: string | string[]; 
}

/**
 * Represents an activity with factor ID that can have single or multiple values and units.
 * @interface CombinedUnitsActivityWithFactorId
 */
export interface CombinedUnitsActivityWithFactorId {
  /**
   * The unique identifier for the activity factor.
   */
  factorId: number;
  
  /**
   * The numerical value(s) of the activity. Can be a single number or an array of numbers.
   */
  value: number | number[];
  
  /**
   * The unit(s) of measurement for the activity value(s). Can be a single string or an array of strings.
   */
  unit: string | string[]; 
}

/**
 * Represents a factor activity with a type and optional unit.
 * @interface FactorActivity
 */
export interface FactorActivity {
  /**
   * The type or category of the factor activity.
   */
  type: string;
  
  /**
   * Optional unit of measurement for the factor activity.
   */
  unit?: string; 
}

/**
 * Represents a factor activity identified by a factor ID instead of a type.
 * @interface FactorActivityWithFactorId
 */
export interface FactorActivityWithFactorId {
  /**
   * The unique identifier for the factor activity.
   */
  factorId: number;
  
  /**
   * Optional unit of measurement for the factor activity.
   */
  unit?: string; 
}

/**
 * Represents a search query for activities.
 * @interface SearchActivity
 */
export interface SearchActivity {
  /**
   * The search query string.
   */
  search: string;

  /**
   * Optional unit (symbol) for search activity.
   */
  unit?: string;

  /**
   * Optional scope(1,2,3,3.1 to 3.15) for search activity.
   */
  scope?: string;

  /**
   * Optional factor set identifier to restrict search results to a specific
   * factor set (e.g. "EPA", "DEFRA").
   */
  factorSet?: string;
}

/**
 * Represents pagination parameters for paginated results.
 * @interface Pagination
 */
export interface Pagination {
  /**
   * The page number (1-based).
   */
  page: number;
  
  /**
   * The number of items per page.
   */
  size: number
}

/**
 * Represents attribution information for real estate, physical activity, and economic activity calculations.
 * Supports four scenarios:
 * 1. Property value based (for general real estate)
 * 2. Equity/Debt based (for private companies)
 * 3. EVIC based (Enterprise Value Including Cash for physical activity)
 * 4. Revenue based (for economic activity)
 * @interface Attribution
 */
export interface Attribution {
  /**
   * The outstanding amount for the property or activity.
   */
  outstandingAmount?: number;
  
  /**
   * The total property value (used in property value based scenario).
   * Optional - use either propertyValue OR (totalEquity + totalDebt) OR evic OR revenue.
   */
  propertyValue?: number;
  
  /**
   * The total equity amount (used in equity/debt based scenario for private companies).
   * Optional - use either propertyValue OR (totalEquity + totalDebt) OR evic OR revenue.
   */
  totalEquity?: number;
  
  /**
   * The total debt amount (used in equity/debt based scenario for private companies).
   * Optional - use either propertyValue OR (totalEquity + totalDebt) OR evic OR revenue.
   */
  totalDebt?: number;

  /**
   * Enterprise Value Including Cash (EVIC) - used in EVIC based scenario for physical activity calculations.
   * Optional - use either propertyValue OR (totalEquity + totalDebt) OR evic OR revenue.
   */
  evic?: number;

  /**
   * Total revenue - used in revenue based scenario for economic activity calculations.
   * Optional - use either propertyValue OR (totalEquity + totalDebt) OR evic OR revenue.
   */
  revenue?: number;
}
