#!/bin/bash

BASE_URL="http://localhost:8000"

echo "=== Creating a test admin user directly using curl (to bypass potential auth issues) ==="
# Try register with a unique admin email
ADMIN_EMAIL="admin_$(date +%s)@rjs.com"
BUILDER_EMAIL="builder_$(date +%s)@rjs.com"

echo "Admin email: $ADMIN_EMAIL"
echo "Builder email: $BUILDER_EMAIL"

# Register builder first - this works
echo ""
echo "--- Registering builder ---"
BUILDER_REG=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$BUILDER_EMAIL\",
    \"password\": \"TestPass123!\",
    \"full_name\": \"Test Builder\",
    \"role\": \"builder\"
  }")

echo "$BUILDER_REG" | python3 -m json.tool 2>/dev/null || echo "$BUILDER_REG"

# Now try registering a client
CLIENT_EMAIL="client_$(date +%s)@rjs.com"
echo ""
echo "--- Registering client ---"
CLIENT_REG=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$CLIENT_EMAIL\",
    \"password\": \"TestPass123!\",
    \"full_name\": \"Test Client\",
    \"role\": \"client\"
  }")

echo "$CLIENT_REG" | python3 -m json.tool 2>/dev/null || echo "$CLIENT_REG"

# Extract client token
CLIENT_TOKEN=$(echo "$CLIENT_REG" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo "Client token: $CLIENT_TOKEN"

# Try to get admin requests with client token (should fail)
echo ""
echo "--- Try getting admin requests with client token (should fail) ---"
curl -s -X GET "$BASE_URL/api/admin/requests" \
  -H "Authorization: Bearer $CLIENT_TOKEN" | python3 -m json.tool 2>/dev/null || true

# Try to get admin requests without token
echo ""
echo "--- Try getting admin requests without token ---"
curl -s -X GET "$BASE_URL/api/admin/requests" | python3 -m json.tool 2>/dev/null || true

