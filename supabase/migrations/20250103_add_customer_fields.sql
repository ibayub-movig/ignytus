-- Add customer fields to search_requests table
ALTER TABLE search_requests ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE search_requests ADD COLUMN IF NOT EXISTS customer_email TEXT; 