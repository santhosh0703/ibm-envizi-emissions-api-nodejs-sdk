=========
Reference
=========


.. js:autoclass:: Client
   :members: 

.. js:autofunction:: request.makeApiRequest

.. js:autofunction:: utils.findExpiryTime

API
===

.. js:autofunction:: Factor.retrieveFactor

.. js:autofunction:: Factor.search

.. js:autofunction:: Fugitive.calculate

.. js:autofunction:: Calculation.calculate

.. js:autofunction:: Location.calculate

.. js:autofunction:: Mobile.calculate

.. js:autofunction:: Stationary.calculate

.. js:autofunction:: TransportationAndDistribution.calculate

.. js:autofunction:: RealEstate.calculate

.. js:autofunction:: EconomicActivity.calculate
   
.. js:autofunction:: PhysicalActivity.calculate

Type Recommender API
====================

.. js:autofunction:: TypeRecommender.search


Audit Log API
=============

Controls whether the organization's API requests and responses are stored for auditing.
Organizations can disable storage if they don't need their API calls to be audited.

.. js:autofunction:: AuditLog.getAuditConfig

.. js:autofunction:: AuditLog.updateAuditConfig


Audit Export API
================

The Audit Export API asynchronously generates an audit-data ZIP archive for an admin user. Call ``trigger`` to create an export, ``getStatus`` until it is complete, and ``download`` to retrieve the archive.

.. js:autofunction:: AuditExport.trigger

.. js:autofunction:: AuditExport.getStatus

.. js:autofunction:: AuditExport.download


Global Metadata API
====================

The global Metadata API provides a unified way to query metadata across different endpoints without calling endpoint-specific methods.

- **getTypes/postTypes** and **getArea/postArea**: Accept an optional ``endpoint`` parameter to query metadata for specific endpoints
- **getUnits/postUnits**: Accept an optional ``type`` parameter to query units for specific emission types

**Supported endpoints** (for getTypes/postTypes and getArea/postArea): ``calculation``, ``location``, ``stationary``, ``mobile``, ``fugitive``, ``factor``, ``search``, ``transportation-and-distribution``, ``economic-activity``, ``real-estate``

getTypes
--------

.. js:autofunction:: Metadata.getTypes

.. js:autofunction:: Metadata.postTypes

getArea
-------

.. js:autofunction:: Metadata.getArea

.. js:autofunction:: Metadata.postArea

getUnits
--------

.. js:autofunction:: Metadata.getUnits

.. js:autofunction:: Metadata.postUnits


Usage API
===========

.. js:autofunction:: Usage.getUsage

Interfaces
==========

.. js:autoclass:: Api.LocationRequestWithoutFactorId

.. js:autoclass:: Api.LocationRequestWithFactorId

.. js:autoclass:: Api.CommonRequestWithoutFactorId

.. js:autoclass:: Api.CommonRequestWithFactorId

.. js:autoclass:: Api.GenericCalculationRequestWithoutFactorId

.. js:autoclass:: Api.GenericCalculationRequestWithFactorId

.. js:autoclass:: Api.FactorRequestWithoutFactorId

.. js:autoclass:: Api.FactorRequestWithFactorId

.. js:autoclass:: Api.SearchRequest

.. js:autoclass:: common.Location

.. js:autoclass:: common.Time

.. js:autoclass:: common.Activity

.. js:autoclass:: common.ActivityWithFactorId

.. js:autoclass:: common.CombinedUnitsActivity

.. js:autoclass:: common.CombinedUnitsActivityWithFactorId

.. js:autoclass:: common.FactorActivity

.. js:autoclass:: common.FactorActivityWithFactorId

.. js:autoclass:: common.SearchActivity

.. js:autoclass:: common.Pagination

.. js:autoclass:: Config.RequestConfig

.. js:autoclass:: Config.ClientConfig

.. js:autoclass:: AuditLogResponse.AuditLogResponse

.. js:autoclass:: AuditLogResponse.AuditLogRequest

.. js:autoclass:: TypeRecommenderResponse.TypeRecommenderResponse

.. js:autoclass:: TypeRecommenderResponse.ActivityRequest

.. js:autoclass:: AuditExportResponse.AuditExportRequest

.. js:autoclass:: AuditExportResponse.AuditExportResponse

.. js:autoclass:: AuditExportResponse.AuditExportStatusResponse

.. js:autoclass:: AuditExportResponse.AuditExportLinks
