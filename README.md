# kvshort

This is a simple URL shortener service designed to be used privately. It runs on Cloudflare Workers and utilizes Workers KV. You can either access it through the API or the web interface.

## Features
- **API and Browser Access**: You can access the service either via the API or through the web interface.
- **Authenticated URL Shortening**: You must provide an API key either as an `api-key` cookie or an `x-api-key` header to shorten URLs. You do not need the api key to use the shortened urls.
- **Custom Expiry**: You can specify an expiry time for the link.

## Getting Started
1. Setup Workers KV and add it to `wrangler.toml`
2. Deploy it on Cloudflare Pages. Make sure to set the `API_KEY` environment variable for your secret API key.
3. Head to /admin in the browser to log in and get started with making shortlinks.

## API Documentation
### Shorten URL
```
POST /:slug
```
Request Body:
```json
{
  "url": "https://example.com", // required
  "expiry": 2147483647 // optional unix seconds
}
```

A response of 200 indicates that the shortlink has been created

### Delete shortlink
```
DELETE /:slug
```

## Authentication
Authentication is required for shortening URLs. You can authenticate by passing the API key either in an `api-key` cookie or in the `x-api-key` header.

When deploying, ensure to set the `API_KEY` environment variable for the secret API key for authentication.

## Planned Features
- View all active shortlinks
- Update a link pointed by a slug without affecting its expiry
- Delete shortlinks
- Make an existing shortlink expire later

## License
This project is licensed under the GNU AGPL - see the [license](LICENSE.md) file for details.

## Privacy
This project is not an IP grabber. Read our [privacy policy](PRIVACY.md) for details.
