IBM Envizi - Emissions API Node.js SDK
======================================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   getting_started
   sdk
   authentication
   client
   reference
   troubleshooting

Introduction
============

IBM Envizi - Emissions API (Emissions API) is a managed factor database and calculation engine for embedding greenhouse gas (GHG) emissions calculations into operational decision making.

The **emissions-api-sdk** is a Node.js SDK for using Emissions API in your projects.

Supported Emission Types
------------------------

* **Location** – emissions from region-specific factors
* **Fugitive** – emissions from leaks or fugitive sources
* **Mobile** – emissions from vehicles and mobile equipment
* **Stationary** – emissions from fixed fuel consumption
* **Transportation & distribution** – logistics and supply chain activities
* **Real Estate** – emissions from commercial and residential properties
* **Economic Activity** – spend-based emissions from business activities
* **Physical Activity** – scope 3 emissions from physical activities with attribution for private companies (equity/debt or EVIC-based)
* **Generic** – custom emission calculations

The SDK is designed for embedding emission calculations in applications, building sustainability dashboards, automating large-scale datasets, and tracking carbon footprints.

Additional capabilities
-----------------------

* **Metadata API** – query supported types, areas, and units across endpoints
* **Type Recommender API** – semantic search to identify likely activity types
* **Factor Search API** – search for emission factors with unit and scope filtering
* **Usage API** – retrieve organization billing-period or historical usage
* **Audit Log API** – manage whether API requests and responses are stored for auditing
* **Audit Export API** – export, monitor, and download organization audit data
