#!/bin/bash

BASE_URL="http://localhost:8000"
ADMIN_EMAIL="admin@test.com"
ADMIN_PASSWORD="Test123!!"
BUILDER_EMAIL="builder$(date +%s)@test.com"
BUILDER_PASSWORD="Test123!!"

echo "=== TEST 1: Register Admin and Get Admin Token ==="
# First register an admin if not exists
ADMIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\",
    \"full_name\": \"Admin User\",
    \"role\": \"admin\"
  }")

echo "Admin response: $ADMIN_RESPONSE"

# Login as admin
ADMIN_LOGIN=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\"
  }")

echo "Admin login: $ADMIN_LOGIN"
ADMIN_TOKEN=$(echo "$ADMIN_LOGIN" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo "Admin token: $ADMIN_TOKEN"

echo ""
echo "=== TEST 2: Register Builder and Check BuilderRequest Created ==="
BUILDER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$BUILDER_EMAIL\",
    \"password\": \"$BUILDER_PASSWORD\",
    \"full_name\": \"Test Builder\",
    \"role\": \"builder\"
  }")

echo "Builder response: $BUILDER_RESPONSE"

echo ""
echo "=== TEST 3: Get Admin Requests (should show the pending builder) ==="
REQUESTS=$(curl -s -X GET "$BASE_URL/api/admin/requests" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

echo "Admin requests: $REQUESTS"

echo ""
echo "=== TEST 4: Get Pending Count ==="
COUNT=$(curl -s -X GET "$BASE_URL/api/admin/requests/pending/count" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

echo "Pending count: $COUNT"

