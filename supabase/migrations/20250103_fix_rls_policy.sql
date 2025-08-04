-- Update RLS policy to allow public insertions for job finder requests
DROP POLICY IF EXISTS "Users can insert their own search requests" ON search_requests;

CREATE POLICY "Allow public insertions for job finder" ON search_requests
  FOR INSERT WITH CHECK (true);

-- Keep existing policies for authenticated users
CREATE POLICY "Users can view their own search requests" ON search_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own search requests" ON search_requests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own search requests" ON search_requests
  FOR DELETE USING (auth.uid() = user_id); 