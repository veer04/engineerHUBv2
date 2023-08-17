#!/bin/bash

serve -s /app/dist >> /logs/server.log &
nginx 