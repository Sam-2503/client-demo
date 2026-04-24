#!/bin/bash

BASE_URL="http://localhost:8000"

echo "============================================================"
echo "COMPREHENSIVE API TEST"
echo "============================================================"

# Generate unique emails
ADMIN_EMAIL="admin_test_$(date +%s%N)@rjs.com"
CLIENT_EMAIL="client_test_$(date +%s%N)@rjs.com"
BUILDER_EMAIL="builder_test_$(date +%s%N)@rjs.com"

echo ""
echo "📧 Test emails:"
echo "  Admin:   $ADMIN_EMAIL"
echo "  Client:  $CLIENT_EMAIL"  
echo "  Builder: $BUILDER_EMAIL"

# Step 1: Register a client (should work and return access_token)
echo ""
echo "============================================================"
echo "STEP 1: Register Client (non-builder role)"
echo "============================================================"
CLIENT_RESP=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$CLIENT_EMAIL\",
    \"password\": \"TestPass123!\",
    \"full_name\": \"Test Client\",
    \"role\": \"client\"
  }")

echo "Response:"
echo "$CLIENT_RESP" | python3 -m json.tool 2>/dev/null || echo "$CLIENT_RESP"

CLIENT_TOKEN=$(echo "$CLIENT_RESP" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo ""
echo "Extracted token: '$CLIENT_TOKEN'"
if [ -z "$CLIENT_TOKEN" ]; then
  echo "❌ ERROR: No access_token in response! Register endpoint doesn't return Token for non-builders"
fi

# Step 2: Register a builder (should work and create BuilderRequest)
echo ""
echo "============================================================"
echo "STEP 2: Register Builder"
echo "============================================================"
BUILDER_RESP=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$BUILDER_EMAIL\",
    \"password\": \"TestPass123!\",
    \"full_name\": \"Test Builder\",
    \"role\": \"builder\"
  }")

echo "Response:"
echo "$BUILDER_RESP" | python3 -m json.tool 2>/dev/null || echo "$BUILDER_RESP"

BUILDER_ID=$(echo "$BUILDER_RESP" | grep -o '"request_id":"[^"]*' | cut -d'"' -f4)
echo ""
echo "BuilderRequest ID: '$BUILDER_ID'"

# Step 3: Try to login as client to get a valid token
echo ""
echo "============================================================"
echo "STEP 3: Login as Client to get valid token"
echo "============================================================"
LOGIN_RESP=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$CLIENT_EMAIL\",
    \"password\": \"TestPass123!\"
  }")

echo "Response:"
echo "$LOGIN_RESP" | python3 -m json.tool 2>/dev/null || echo "$LOGIN_RESP"

CLIENT_TOKEN=$(echo "$LOGIN_RESP" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo ""
echo "Token from login: '$CLIENT_TOKEN'"

# Step 4: Try to call /api/admin/requests with client token (should fail with 403)
echo ""
echo "============================================================"
echo "STEP 4: Try /api/admin/requests with CLIENT token (should fail)"
echo "============================================================"
ADMIN_REQ=$(curl -s -X GET "$BASE_URL/api/admin/requests" \
  -H "Authorization: Bearer $CLIENT_TOKEN")

echo "Response:"
echo "$ADMIN_REQ" | python3 -m json.tool 2>/dev/null || echo "$ADMIN_REQ"

# Now register an admin to approve the builder
echo ""
echo "============================================================"
echo "STEP 5: Register ADMIN to approve builder requests"
echo "============================================================"
ADMIN_RESP=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"TestPass123!\",
    \"full_name\": \"Test Admin\",
    \"role\": \"admin\"
  }")

echo "Response:"
echo "$ADMIN_RESP" | python3 -m json.tool 2>/dev/null || echo "$ADMIN_RESP"

# Step 6: Login as admin
echo ""
echo "============================================================"
echo "STEP 6: Login as Admin"
echo "============================================================"
ADMIN_LOGIN=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"TestPass123!\"
  }")

echo "Response:"
echo "$ADMIN_LOGIN" | python3 -m json.tool 2>/dev/null || echo "$ADMIN_LOGIN"

ADMIN_TOKEN=$(echo "$ADMIN_LOGIN" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo ""
echo "Admin token: '$ADMIN_TOKEN'"

# Step 7: Call /api/admin/requests with admin token
echo ""
echo "============================================================"
echo "STEP 7: Get /api/admin/requests with ADMIN token"
echo "============================================================"
REQUESTS=$(curl -s -X GET "$BASE_URL/api/admin/requests" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

echo "Response:"
echo "$REQUESTS" | python3 -m json.tool 2>/dev/null || echo "$REQUESTS"

# Step 8: Get pending count
echo ""
echo "============================================================"
echo "STEP 8: Get /api/admin/requests/pending/count"
echo "============================================================"
COUNT=$(curl -s -X GET "$BASE_URL/api/admin/requests/pending/count" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

echo "Response:"
echo "$COUNT" | python3 -m json.tool 2>/dev/null || echo "$COUNT"

