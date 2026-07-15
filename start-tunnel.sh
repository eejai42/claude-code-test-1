#!/bin/bash

# Kill any existing processes
killall node lt 2>/dev/null || true
sleep 2

cd /home/user/claude-code-test-1

# Start the app server
export PGPASSWORD=landscaping
node api/unified-server.js > /tmp/app.log 2>&1 &
APP_PID=$!
echo "App server started (PID: $APP_PID)"
sleep 3

# Start localtunnel
echo "Starting localtunnel..."
lt --port 3001 --subdomain landscaping-tracker 2>&1 &
LT_PID=$!

sleep 5

echo ""
echo "============================================"
echo "🌿 Landscaping Tracker is LIVE!"
echo "============================================"
echo ""
echo "Local:  http://localhost:3001"
echo ""
echo "To access remotely:"
echo "Try: https://landscaping-tracker.loca.lt"
echo ""
echo "Or find your tunnel URL with:"
echo "  curl http://localhost:4040/api/tunnels"
echo ""
echo "============================================"
