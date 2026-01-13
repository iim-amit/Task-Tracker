-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read tasks
CREATE POLICY "Allow all users to read tasks" ON tasks
  FOR SELECT
  USING (true);

-- Create policy to allow all users to insert tasks
CREATE POLICY "Allow all users to insert tasks" ON tasks
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow all users to update tasks
CREATE POLICY "Allow all users to update tasks" ON tasks
  FOR UPDATE
  USING (true);

-- Create policy to allow all users to delete tasks
CREATE POLICY "Allow all users to delete tasks" ON tasks
  FOR DELETE
  USING (true);
