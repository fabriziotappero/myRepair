#!/bin/bash
curl -X POST http://127.0.0.1:8090/api/admins/auth-with-password -H "Content-Type: application/json" -d '{"identity": "email@email.com", "password": "XXXXXXXX"}'
