## C1

**English**

1. Use Postman for API testing. Configure Postman permissions according to this documentation: https://developer.xero.com/documentation/sdks-and-tools/tools/postman/#use-postman-with-custom-connections

2. Call the `/connections` endpoint and verify whether the returned content has any issues.

**中文**

1. 使用postman进行接口测试。按照如下文档对postman进行配置权限配置：https://developer.xero.com/documentation/sdks-and-tools/tools/postman/#use-postman-with-custom-connections

2. 调用/connections 接口，检查返回内容是否有问题。

## C2

**English**

Review the response status code returned:

**403** — Check: (1) incorrect `Xero-Tenant-Id`; (2) missing `accounting.invoices` scope; (3) insufficient permissions within the organization.

**400** — Check the validity and encoding of request parameters.

**404** — (1) Incorrect API URL spelling; (2) the specific invoice ID does not exist; (3) verify the `Xero-Tenant-Id` request header — copy the exact value from the `tenantId` field in the `/connections` response and add it to the request header.

**429** — Too many requests; global rate limit triggered.

**5xx** — Partial server-side failure.

**中文**

查看返回的响应编码

403 ：检查 （1）Xero-Tenant-Id 错误
（2）缺少accounting.invoices作用域
（3）组织内权限不足

400 ：检查请求参数的合法性与编码

404 ：（1）接口URL 拼写错误
（2）特定发票 ID 不存在
（3） 验证Xero-Tenant-Id请求头是否正确，正确做法：从/connections响应的tenantId字段精确复制值，添加到请求头

429 ：过多请求次数，触发全局速率限制

5xx ：服务端局部故障

## C3

**English**

`GET https://api.xero.com/api.xro/2.0/Invoices`

**中文**

GET https://api.xero.com/api.xro/2.0/Invoices

## C4

**English**

`GET https://api.xero.com/api.xro/2.0/Invoices/{InvoiceID}`

**中文**

GET https://api.xero.com/api.xro/2.0/Invoices/{InvoiceID}

## C5

**English**

429 reference documentation:
https://developer.xero.com/faq/limits#rate-limits

1. Handle immediate responses with standard retry logic: correctly parse Xero’s 429 response headers and retry according to the standard approach.
2. Proactively control the rate of requests sent from the backend to the Xero API to avoid triggering 429 in the first place.
3. Use caching appropriately on the backend, optimize API call patterns, and take other measures to reduce the number of calls to the Xero API.

**中文**

429参考文档：
https://developer.xero.com/faq/limits#rate-limits

1. 即时响应与标准重试处理,正确解析 Xero 的 429 响应头,按照标准重试。
2. 后端主动控制发往 Xero API 的请求速率，从根本上避免触发 429
3. 后端合理使用缓存，优化 API 调用方式等措施，减少调用Xero API次数
