# API Reference

OpenPecha provides a comprehensive set of APIs that allow developers to access and interact with our Buddhist text resources programmatically. This page provides an overview of our available APIs and how to use them.

## Getting Started

### Authentication

Most OpenPecha APIs require authentication. To get started:

1. [Create an account](https://api.openpecha.org/register) on our API portal
2. Generate an API key from your account dashboard
3. Include your API key in the header of all requests:

```
Authorization: Bearer YOUR_API_KEY
```

### Base URL

All API endpoints are available at:

```
https://api.openpecha.org/v1
```

## Text APIs

### Get Text

Retrieve the content of a specific text by its ID.

```
GET /texts/{text_id}
```

**Parameters:**
- `text_id` (path, required): The unique identifier of the text
- `format` (query, optional): Response format (options: `plain`, `html`, `opf`, `hfml`; default: `plain`)
- `layers` (query, optional): Comma-separated list of annotation layers to include

**Example Request:**
```bash
curl -X GET "https://api.openpecha.org/v1/texts/P000123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example Response:**
```json
{
  "id": "P000123",
  "title": "Heart Sutra",
  "content": "༄༅། །རྒྱ་གར་སྐད་དུ། བྷ་ག་ཝ་ཏི་པྲ་ཛྙཱ་པཱ་ར་མི་ཏཱ་ཧྲྀ་ད་ཡ།...",
  "language": "bo",
  "word_count": 280,
  "metadata": {
    "source": "Kangyur",
    "volume": 34,
    "folios": "144b-146a"
  }
}
```

### Search Texts

Search across all available texts.

```
GET /texts/search
```

**Parameters:**
- `q` (query, required): Search query
- `language` (query, optional): Filter by language code
- `collection` (query, optional): Filter by collection
- `limit` (query, optional): Maximum number of results (default: 10)
- `offset` (query, optional): Pagination offset (default: 0)

**Example Request:**
```bash
curl -X GET "https://api.openpecha.org/v1/texts/search?q=བྱམས་པ&language=bo&limit=5" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Annotation APIs

### Get Annotations

Retrieve annotations for a specific text.

```
GET /texts/{text_id}/annotations
```

**Parameters:**
- `text_id` (path, required): The unique identifier of the text
- `type` (query, optional): Filter by annotation type
- `span_start` (query, optional): Filter by annotation span start position
- `span_end` (query, optional): Filter by annotation span end position

**Example Request:**
```bash
curl -X GET "https://api.openpecha.org/v1/texts/P000123/annotations?type=pagination" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Create Annotation

Add a new annotation to a text.

```
POST /texts/{text_id}/annotations
```

**Parameters:**
- `text_id` (path, required): The unique identifier of the text

**Request Body:**
```json
{
  "type": "note",
  "span": {
    "start": 120,
    "end": 145
  },
  "metadata": {
    "note": "This is an important passage explaining emptiness"
  }
}
```

## Translation APIs

### Get Translations

Retrieve available translations for a text.

```
GET /texts/{text_id}/translations
```

**Parameters:**
- `text_id` (path, required): The unique identifier of the text
- `target_language` (query, optional): Filter by target language code

**Example Request:**
```bash
curl -X GET "https://api.openpecha.org/v1/texts/P000123/translations?target_language=en" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Get Aligned Translations

Retrieve aligned translations between source and target languages.

```
GET /texts/{text_id}/aligned-translations
```

**Parameters:**
- `text_id` (path, required): The unique identifier of the text
- `source_language` (query, required): Source language code
- `target_language` (query, required): Target language code

## Dataset APIs

### List Datasets

Get a list of available datasets.

```
GET /datasets
```

**Parameters:**
- `type` (query, optional): Filter by dataset type
- `language` (query, optional): Filter by language
- `limit` (query, optional): Maximum number of results (default: 10)
- `offset` (query, optional): Pagination offset (default: 0)

**Example Request:**
```bash
curl -X GET "https://api.openpecha.org/v1/datasets?type=parallel&language=bo" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Get Dataset

Retrieve metadata and download information for a specific dataset.

```
GET /datasets/{dataset_id}
```

**Parameters:**
- `dataset_id` (path, required): The unique identifier of the dataset

**Example Request:**
```bash
curl -X GET "https://api.openpecha.org/v1/datasets/D000050" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Rate Limits

Our API enforces rate limits to ensure fair usage:

- 1,000 requests per day for free tier
- 10,000 requests per day for standard tier
- 100,000 requests per day for premium tier

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - The request was malformed |
| 401 | Unauthorized - Authentication failed |
| 403 | Forbidden - You don't have permission |
| 404 | Not Found - The resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Server Error - Something went wrong on our end |

## SDKs and Client Libraries

We provide client libraries for easy integration:

- [Python SDK](https://github.com/OpenPecha/openpecha-api-python)
- [JavaScript SDK](https://github.com/OpenPecha/openpecha-api-js)

## Support

If you encounter any issues or have questions about our API, please:

- Check our [API documentation](https://api.openpecha.org/docs)
- Visit our [community forum](https://forum.openpecha.org/c/api)
- [Contact our support team](connect.md)
