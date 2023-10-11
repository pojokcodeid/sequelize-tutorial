# Address API Specification

## Create Address API

- Endpint : POST /api/address
- Request Body :

```json
{
  "alamat": "Jl. Jalan",
  "kota": "Bandung",
  "provinsi": "Jawa Barat",
  "negara": "Indonesia",
  "kodepos": "12345"
}
```

- Response Sucess :

```json
{
  "errors": null,
  "data": [
    {
      "id": 1,
      "alamat": "Jl. Jalan",
      "kota": "Bandung",
      "provinsi": "Jawa Barat",
      "negara": "Indonesia",
      "kodepos": "12345"
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["Alamat harus diisi", "Negara harus diisi"],
  "data": null
}
```

## Get ALL Addresses

- Endpint : GET /api/address
- Request Body :

- Response Sucess :
- Response Error :

## Get Address by ID

- Endpint : GET /api/address/:id
- Request Body :
- Response Sucess :
- Response Error :

## Update Address by ID

- Endpint : PUT /api/address/:id
- Request Body :
- Response Sucess :
- Response Error :

## Delete Address by ID

- Endpint : DELETE /api/address/:id
- Request Body :
- Response Sucess :
- Response Error :
