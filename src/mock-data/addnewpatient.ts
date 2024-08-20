// Provider Group Location response 
export const location1 = {
  "date": "2023-08-10T14:11:31.701+00:00",
  "code": "OK",
  "message": "Successfully fetched locations for current provider group",
  "data": {
    "content": [
      {
        "id": 1,
        "uuid": "bcfa4cbc-db5d-4888-a36b-807a5bbd5d86",
        "locationId": "23",
        "name": "1212 Nagpur Nagpur highway",
        "specialities": [
          {
            "id": 3,
            "name": "Sports Medicine Specialist"
          }
        ],
        "contactNumber": "1234567898",
        "avatar": null,
        "newAvatar": null,
        "email": "sunit191@gmail.com",
        "fax": "123",
        "information": "Hi there",
        "physicalAddress": {
          "id": 2,
          "line1": "123 Main St",
          "line2": "Helo",
          "city": "City",
          "state": "State",
          "country": "India",
          "zipcode": "12345"
        },
        "billingAddress": {
          "id": 1,
          "line1": "123 Main St",
          "line2": "Helo",
          "city": "City",
          "state": "State",
          "country": "India",
          "zipcode": "54321"
        },
        "locationHours": [
          {
            "id": 1,
            "dayOfWeek": "MONDAY",
            "openingTime": "09:00:00",
            "closingTime": "16:00:00"
          }
        ],
        "active": true,
        "addressCheckBox": false
      }
    ],
    "pageable": {
      "sort": [
        {
          "direction": "DESC",
          "property": "created",
          "ignoreCase": false,
          "nullHandling": "NATIVE",
          "ascending": false,
          "descending": true
        }
      ],
      "offset": 0,
      "pageNumber": 0,
      "pageSize": 20,
      "paged": true,
      "unpaged": false
    },
    "last": true,
    "totalElements": 1,
    "totalPages": 1,
    "size": 20,
    "number": 0,
    "sort": [
      {
        "direction": "DESC",
        "property": "created",
        "ignoreCase": false,
        "nullHandling": "NATIVE",
        "ascending": false,
        "descending": true
      }
    ],
    "first": true,
    "numberOfElements": 1,
    "empty": false
  },
  "path": "/api/admin/provider-group/location/provider-group-uuid/903ad8e1-864a-47f0-914a-4ac35fe80679",
  "requestId": "0f5820b1-7ba6-4f44-85a1-0588a3c9810f",
  "version": "1.0"
}
