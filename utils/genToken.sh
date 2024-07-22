#!/bin/bash
curl -X POST https://fabdb.pockethost.io/api/collections/users/auth-with-password -H "Content-Type: application/json" -d '{"identity": "email@email.com", "password": "XXXXXXXX"}'
