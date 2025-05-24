// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://azqcatdyejcnksxvhuro.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cWNhdGR5ZWpjbmtzeHZodXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTc3MzYsImV4cCI6MjA2Mjk3MzczNn0.6pWHwNPDNsE7LKvyBExHhp0nVdCS_-iEpYUD2M5rL6c'

export const supabase = createClient(supabaseUrl, supabaseKey)
