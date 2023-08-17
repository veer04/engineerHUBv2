#!/bin/sh

serve -s /app/dist >> /logs/server.log &
nginx -g "daemon off;" 