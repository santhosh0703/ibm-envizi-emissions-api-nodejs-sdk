===============
Getting Started
===============

Prerequisites
-------------

Before using the SDK, ensure you have:

- **Node.js** installed
- Active internet connection
- An IBMid account. Sign up at the `IBMid sign up <https://www.ibm.com/account/reg/us-en/signup?formid=urx-54311>`_ page.
- Access to the Emissions API service and the required credentials
- Read the `Introduction <https://developer.ibm.com/apis/catalog/ghgemissions--ibm-envizi-emissions-api/Introduction>`_ page for an overview of the Emissions API


Installation
------------

You can install the SDK using `npm <https://www.npmjs.com/package/emissions-api-sdk>`_ or `yarn <https://yarnpkg.com/package?q=emissions-api-sdk&name=emissions-api-sdk>`_:

Using npm:

.. code-block:: bash

  npm install emissions-api-sdk


Using yarn:

.. code-block:: bash

  yarn install emissions-api-sdk


Basic Import
~~~~~~~~~~~~

After installation, you can import the SDK in your project:

.. code-block:: javascript

  // Import the entire SDK
  const enviziSDK = require('emissions-api-sdk');
  
  // Or using ES modules
  import { Client, LocationEmission } from 'emissions-api-sdk';


Authentication
--------------

The SDK supports three authentication methods:

- **Personal Access Token (PAT)**, recommended for most users
- **API key**, where the SDK retrieves and refreshes a bearer token
- **Pre-generated JWT token**, managed outside the SDK

Using Personal Access Token (PAT)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';

  await Client.getClient({
    patToken: process.env.ENVIZI_PAT_TOKEN,
    clientId: process.env.ENVIZI_CLIENT_ID
  });

.. note::

   When using a PAT token, do not provide ``orgId``.

Using API Key
~~~~~~~~~~~~~

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';

  await Client.getClient({
    apiKey: process.env.ENVIZI_API_KEY,
    clientId: process.env.ENVIZI_CLIENT_ID,
    orgId: process.env.ENVIZI_ORG_ID
  });

Using Pre-generated JWT Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';

  await Client.getClient({
    token: process.env.JWT_TOKEN,
    clientId: process.env.ENVIZI_CLIENT_ID
  });

First API Call
--------------

After initializing the client, you can make your first API call. Here's a quick start example of calculating location-based emissions:

.. code-block:: javascript

  import { Client, Location } from 'emissions-api-sdk';

  await Client.getClient({
    patToken: process.env.ENVIZI_PAT_TOKEN,
    clientId: process.env.ENVIZI_CLIENT_ID
  });

  const result = await Location.calculate({
    "location": {
      "country": "USA",
      "stateProvince": "california"
    },
    "activity": {
      "type": "electricity",
      "value": 1,
      "unit": "kWh"
    }
  });

Example Response
----------------

The API returns emission calculation results in JSON format. Here's an example response:

.. code-block:: json

    {
      "transactionId": "95a7efe7-02ae-47a3-a7fd-831bfca7cecd",
      "totalCO2e": 0.20750174,
      "CO2": 0.20681091,
      "CH4": 0.00033022,
      "N2O": 0.00036061,
      "indirectCO2e": 0.01115131,
      "unit": "kgCO2e",
      "description": "The electricity emissions factor used to calculate this result was obtained from the  year 2022 Managed - eGRID & US Climate Leaders factor set for the area United States and the region California."
    }

Example Response with Details
------------------------------

When you need more detailed information about the emission factors used in calculations, you can request the response to include the ``details`` object. This provides comprehensive information about the factor set and specific factor used:

.. code-block:: json

    {
      "transactionId": "29df5ecd-fc3b-4797-b6fd-da03bc007f30",
      "totalCO2e": 5912000,
      "CO2": 5840000,
      "CH4": 2000.0000000000002,
      "N2O": 70000,
      "indirectCO2e": 1340000,
      "unit": "kgCO2e",
      "description": "The Freight - Cargo Ship - Bulk Carrier - 0-9999 dwt emissions factor used to calculate this result was obtained from the DEFRA factor set for the Global region year 2025.",
      "details": {
        "factorSet": {
          "name": "DEFRA",
          "description": "The UK Government and DEFRA publish GHG emission factors covering Scope 1, Scope 2, and selected Scope 3 sources. While primarily intended for UK-based reporting, many organizations apply these factors across European sites—especially for air travel-related emissions.",
          "provider": "His Majesty's Government (United Kingdom of Great Britain and Northern Ireland): Department for Energy Security and Net Zero",
          "sourceUrl": "https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2024"
        },
        "factor": {
          "name": "Bulk carrier - 0–9999 dwt - 2025",
          "description": "Cargo ship - tonne.km",
          "totalCO2e": 0.02956,
          "CO2": 0.0292,
          "CH4": 0.00001,
          "N2O": 0.00035,
          "indirectCO2e": 0.0067,
          "inputUnit": "t-km",
          "unit": "tonne.km",
          "conversionRatio": "1:1",
          "activityType": "Freight - Cargo Ship - Bulk Carrier - 0-9999 dwt",
          "activitySubtype": "Default Factor",
          "factorId": 190405,
          "methodology": "activity-based",
          "scopes": [
            "3.4",
            "3.9"
          ],
          "areaName": "Earth",
          "areaType": "Planet",
          "publishedFrom": "2025-01-01",
          "source": "2025 Greenhouse Gas Reporting: Conversion Factors 2025 (DEFRA) provided by gov.uk, license - https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
        }
      }
    }

Response Structure Details
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The response includes the following key components:

**Top-level Fields:**

- ``transactionId``: Unique identifier for the calculation
- ``totalCO2e``: Total CO2 equivalent emissions
- ``CO2``: Carbon dioxide emissions
- ``CH4``: Methane emissions
- ``N2O``: Nitrous oxide emissions
- ``indirectCO2e``: Indirect CO2 equivalent emissions
- ``unit``: Unit of measurement (typically kgCO2e)
- ``description``: Human-readable description of the calculation

**Details Object (when requested):**

The ``details`` object provides comprehensive information about the emission factors:

*Factor Set Information:*

- ``name``: Name of the factor set (e.g., DEFRA, EPA)
- ``description``: Detailed description of the factor set
- ``provider``: Organization that provides the factor set
- ``sourceUrl``: URL to the source documentation

*Factor Information:*

- ``name``: Specific name of the emission factor
- ``description``: Description of the factor
- ``totalCO2e``, ``CO2``, ``CH4``, ``N2O``, ``indirectCO2e``: Emission values per unit
- ``inputUnit``: Unit for input values
- ``unit``: Unit of the factor
- ``conversionRatio``: Conversion ratio applied
- ``activityType``: Type of activity (e.g., transportation, energy)
- ``activitySubtype``: Subtype classification
- ``factorId``: Unique identifier for the factor
- ``methodology``: Calculation methodology used
- ``scopes``: Applicable GHG Protocol scopes
- ``areaName``: Geographic area name
- ``areaType``: Type of geographic area
- ``publishedFrom``: Date from which the factor is valid

Currency Conversion Support
---------------------------

Overview
~~~~~~~~

The SDK supports automatic currency conversion for API methods that accept monetary values. This feature allows you to input values in your preferred currency, and the system will automatically convert them to the appropriate base currency for emissions calculations.

**Supported Methods**

Currency conversion is available for the following calculation methods:

- ``EconomicActivity.calculate()``
- ``Calculation.calculate()``

Supported Currencies
~~~~~~~~~~~~~~~~~~~~

The SDK supports conversion for 170 currencies:

.. list-table::
   :header-rows: 1
   :widths: 60 40

   * - Currency Name
     - Symbol
   * - ADB Unit of Account
     - XUA
   * - Afghani
     - AFN
   * - Algerian Dinar
     - DZD
   * - Arab Accounting Dinar
     - XAD
   * - Argentine Peso
     - ARS
   * - Armenian Dram
     - AMD
   * - Aruban Florin
     - AWG
   * - Australian Dollar
     - AUD
   * - Azerbaijan Manat
     - AZN
   * - Bahamian Dollar
     - BSD
   * - Bahraini Dinar
     - BHD
   * - Baht
     - THB
   * - Balboa
     - PAB
   * - Barbados Dollar
     - BBD
   * - Belarusian Ruble
     - BYN
   * - Belize Dollar
     - BZD
   * - Bermudian Dollar
     - BMD
   * - Boliviano
     - BOB
   * - Bolívar Soberano
     - VED
   * - Bolívar Soberano
     - VES
   * - Brazilian Real
     - BRL
   * - Brunei Dollar
     - BND
   * - Bulgarian Lev
     - BGN
   * - Burundi Franc
     - BIF
   * - Cabo Verde Escudo
     - CVE
   * - Canadian Dollar
     - CAD
   * - Caribbean Guilder
     - XCG
   * - Cayman Islands Dollar
     - KYD
   * - CFA Franc BCEAO
     - XOF
   * - CFA Franc BEAC
     - XAF
   * - CFP Franc
     - XPF
   * - Chilean Peso
     - CLP
   * - Colombian Peso
     - COP
   * - Comorian Franc
     - KMF
   * - Congolese Franc
     - CDF
   * - Convertible Mark
     - BAM
   * - Cordoba Oro
     - NIO
   * - Costa Rican Colon
     - CRC
   * - Cuban Peso
     - CUP
   * - Czech Koruna
     - CZK
   * - Dalasi
     - GMD
   * - Danish Krone
     - DKK
   * - Denar
     - MKD
   * - Djibouti Franc
     - DJF
   * - Dobra
     - STN
   * - Dominican Peso
     - DOP
   * - Dong
     - VND
   * - East Caribbean Dollar
     - XCD
   * - Egyptian Pound
     - EGP
   * - El Salvador Colon
     - SVC
   * - Ethiopian Birr
     - ETB
   * - Euro
     - EUR
   * - Falkland Islands Pound
     - FKP
   * - Fiji Dollar
     - FJD
   * - Forint
     - HUF
   * - Ghana Cedi
     - GHS
   * - Gibraltar Pound
     - GIP
   * - Gourde
     - HTG
   * - Guarani
     - PYG
   * - Guinean Franc
     - GNF
   * - Guyana Dollar
     - GYD
   * - Hong Kong Dollar
     - HKD
   * - Hryvnia
     - UAH
   * - Iceland Krona
     - ISK
   * - Indian Rupee
     - INR
   * - Iranian Rial
     - IRR
   * - Iraqi Dinar
     - IQD
   * - Jamaican Dollar
     - JMD
   * - Jordanian Dinar
     - JOD
   * - Kenyan Shilling
     - KES
   * - Kina
     - PGK
   * - Kuwaiti Dinar
     - KWD
   * - Kwanza
     - AOA
   * - Kyat
     - MMK
   * - Lao Kip
     - LAK
   * - Lari
     - GEL
   * - Lebanese Pound
     - LBP
   * - Lek
     - ALL
   * - Lempira
     - HNL
   * - Leone
     - SLE
   * - Liberian Dollar
     - LRD
   * - Libyan Dinar
     - LYD
   * - Lilangeni
     - SZL
   * - Loti
     - LSL
   * - Malagasy Ariary
     - MGA
   * - Malawi Kwacha
     - MWK
   * - Malaysian Ringgit
     - MYR
   * - Mauritius Rupee
     - MUR
   * - Mexican Peso
     - MXN
   * - Mexican Unidad de Inversion (UDI)
     - MXV
   * - Moldovan Leu
     - MDL
   * - Moroccan Dirham
     - MAD
   * - Mozambique Metical
     - MZN
   * - Mvdol
     - BOV
   * - Naira
     - NGN
   * - Nakfa
     - ERN
   * - Namibia Dollar
     - NAD
   * - Nepalese Rupee
     - NPR
   * - Netherlands Antillean Guilder
     - ANG
   * - New Israeli Sheqel
     - ILS
   * - New Taiwan Dollar
     - TWD
   * - New Zealand Dollar
     - NZD
   * - Ngultrum
     - BTN
   * - North Korean Won
     - KPW
   * - Norwegian Krone
     - NOK
   * - Ouguiya
     - MRU
   * - Pa'anga
     - TOP
   * - Pakistan Rupee
     - PKR
   * - Pataca
     - MOP
   * - Peso Uruguayo
     - UYU
   * - Philippine Peso
     - PHP
   * - Pound Sterling
     - GBP
   * - Pula
     - BWP
   * - Qatari Rial
     - QAR
   * - Quetzal
     - GTQ
   * - Rand
     - ZAR
   * - Rial Omani
     - OMR
   * - Riel
     - KHR
   * - Romanian Leu
     - RON
   * - Rufiyaa
     - MVR
   * - Rupiah
     - IDR
   * - Russian Ruble
     - RUB
   * - Rwanda Franc
     - RWF
   * - Saint Helena Pound
     - SHP
   * - Saudi Riyal
     - SAR
   * - SDR (Special Drawing Right)
     - XDR
   * - Serbian Dinar
     - RSD
   * - Seychelles Rupee
     - SCR
   * - Singapore Dollar
     - SGD
   * - Sol
     - PEN
   * - Solomon Islands Dollar
     - SBD
   * - Som
     - KGS
   * - Somali Shilling
     - SOS
   * - Somoni
     - TJS
   * - South Sudanese Pound
     - SSP
   * - Sri Lanka Rupee
     - LKR
   * - Sucre
     - XSU
   * - Sudanese Pound
     - SDG
   * - Surinam Dollar
     - SRD
   * - Swedish Krona
     - SEK
   * - Swiss Franc
     - CHF
   * - Syrian Pound
     - SYP
   * - Taka
     - BDT
   * - Tala
     - WST
   * - Tanzanian Shilling
     - TZS
   * - Tenge
     - KZT
   * - Trinidad and Tobago Dollar
     - TTD
   * - Tugrik
     - MNT
   * - Tunisian Dinar
     - TND
   * - Turkish Lira
     - TRY
   * - Turkmenistan New Manat
     - TMT
   * - UAE Dirham
     - AED
   * - Uganda Shilling
     - UGX
   * - Unidad de Fomento
     - CLF
   * - Unidad de Valor Real
     - COU
   * - Unidad Previsional
     - UYW
   * - United States dollar
     - USD
   * - Uruguay Peso en Unidades Indexadas (UI)
     - UYI
   * - US Dollar (Next day)
     - USN
   * - Uzbekistan Sum
     - UZS
   * - Vatu
     - VUV
   * - WIR Euro
     - CHE
   * - WIR Franc
     - CHW
   * - Won
     - KRW
   * - Yemeni Rial
     - YER
   * - Yen
     - JPY
   * - Yuan Renminbi
     - CNY
   * - Zambian Kwacha
     - ZMW
   * - Zimbabwe Gold
     - ZWG
   * - Zloty
     - PLN

Exchange Rate Data
~~~~~~~~~~~~~~~~~~

**Data Source**

Exchange rates are sourced from the U.S. Department of the Treasury's Fiscal Data API, which provides official exchange rates used by the U.S. government for accounting and reporting purposes.

- **API Source**: https://api.fiscaldata.treasury.gov/services/api/fiscal_service
- **Data Provider**: U.S. Department of the Treasury, Bureau of the Fiscal Service

**Historical Coverage**

Exchange rate data is available from **March 31, 2001** onwards. If you specify a date earlier than this, the system will use the earliest available rate.

**Data Updates**

The exchange rate database is automatically synchronized with the Treasury API to ensure you always have access to the most current rates. Updates are captured as soon as they become available from the Treasury.

- **Update Frequency**: The U.S. Treasury typically publishes exchange rates on a **quarterly basis**
- **Amendment Policy**: If current rates deviate from the published rates by 10% or more, Treasury will issue amendments to the quarterly report


- ``source``: Source citation and license information

Finance Emissions APIs
----------------------

The SDK supports three scope 3 finance-based emission APIs: **Real Estate**, **Physical Activity**, and **Economic Activity**. Each supports optional PCAF attribution to proportionally allocate emissions.

Real Estate
~~~~~~~~~~~

Real Estate calculates scope 3 emissions from commercial and residential property. Attribution uses ``propertyValue`` to compute an attribution factor.

**Without attribution:**

.. code-block:: javascript

  const result = await RealEstate.calculate({
    "time": { "date": "2022-01-01" },
    "location": { "country": "usa", "stateProvince": "new york" },
    "activity": {
      "type": "Commercial Real Estate:Office",
      "value": 123456.0,
      "unit": "m2"
    },
    "includeDetails": false
  });

**With attribution (property value based):**

.. code-block:: javascript

  const result = await RealEstate.calculate({
    "time": { "date": "2022-01-01" },
    "location": { "country": "usa", "stateProvince": "new york" },
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
  });

.. note::

   Real estate attribution only accepts ``propertyValue``. Using ``totalEquity``, ``totalDebt``, ``evic``, or ``revenue`` will result in a 400 error.

Physical Activity
~~~~~~~~~~~~~~~~~

Physical Activity calculates scope 3 emissions from physical activities. Attribution supports two methods: equity/debt for private companies, or EVIC for listed companies.

**Without attribution:**

.. code-block:: javascript

  const result = await PhysicalActivity.calculate({
    "time": { "date": "2022-01-01" },
    "location": { "country": "usa", "stateProvince": "new york" },
    "activity": {
      "type": "Physical Activity Type",
      "value": 123456.0,
      "unit": "kg"
    },
    "includeDetails": false
  });

**With attribution (equity/debt — private companies):**

.. code-block:: javascript

  const result = await PhysicalActivity.calculate({
    "time": { "date": "2022-01-01" },
    "location": { "country": "usa", "stateProvince": "new york" },
    "activity": {
      "type": "Physical Activity Type",
      "value": 123456.0,
      "unit": "kg"
    },
    "attribution": {
      "outstandingAmount": 1000000.0,
      "totalEquity": 3000000.0,
      "totalDebt": 2000000.0
    },
    "includeDetails": true
  });

**With attribution (EVIC — listed companies):**

.. code-block:: javascript

  const result = await PhysicalActivity.calculate({
    "time": { "date": "2022-01-01" },
    "location": { "country": "usa", "stateProvince": "new york" },
    "activity": {
      "type": "Physical Activity Type",
      "value": 123456.0,
      "unit": "kg"
    },
    "attribution": {
      "outstandingAmount": 1000000.0,
      "evic": 10000000.0
    },
    "includeDetails": true
  });

.. note::

   Physical activity attribution does not accept ``propertyValue`` or ``revenue``. Use ``totalEquity + totalDebt`` for private companies, or ``evic`` for listed companies — not both.

Economic Activity
~~~~~~~~~~~~~~~~~

Economic Activity calculates scope 3 spend-based emissions. Attribution supports equity/debt, EVIC, or revenue-based allocation.

**Without attribution:**

.. code-block:: javascript

  const result = await EconomicActivity.calculate({
    "time": { "date": "2022-01-01" },
    "location": { "country": "usa", "stateProvince": "new york" },
    "activity": {
      "type": "Accomodation",
      "value": 123456.0,
      "unit": "usd"
    },
    "includeDetails": false
  });

**With attribution (revenue based):**

.. code-block:: javascript

  const result = await EconomicActivity.calculate({
    "time": { "date": "2025-01-04" },
    "location": { "country": "usa" },
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
  });

**With attribution (equity/debt — private companies):**

.. code-block:: javascript

  const result = await EconomicActivity.calculate({
    "time": { "date": "2025-01-04" },
    "location": { "country": "usa" },
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
  });

**With attribution (EVIC — listed companies):**

.. code-block:: javascript

  const result = await EconomicActivity.calculate({
    "time": { "date": "2025-01-04" },
    "location": { "country": "usa" },
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
  });

.. note::

   ``propertyValue`` is not supported for economic activity. ``totalEquity`` and ``totalDebt`` must always be provided together.

Attribution Summary
~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 30 14 20 12 12 12

   * - API
     - ``propertyValue``
     - ``totalEquity`` + ``totalDebt``
     - ``evic``
     - ``revenue``
     - ``outstandingAmount``
   * - Real Estate
     - ✓
     - ✗
     - ✗
     - ✗
     - Required
   * - Physical Activity
     - ✗
     - ✓
     - ✓
     - ✗
     - Required
   * - Economic Activity
     - ✗
     - ✓
     - ✓
     - ✓
     - Required
