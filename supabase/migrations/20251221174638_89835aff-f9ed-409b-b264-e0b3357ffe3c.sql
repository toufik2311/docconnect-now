-- Add RLS policies for authenticated users to manage doctors
CREATE POLICY "Authenticated users can insert doctors" 
ON public.doctors 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update doctors" 
ON public.doctors 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete doctors" 
ON public.doctors 
FOR DELETE 
TO authenticated
USING (true);

-- Allow authenticated users to view all appointments (for admin)
CREATE POLICY "Authenticated users can view all appointments" 
ON public.appointments 
FOR SELECT 
TO authenticated
USING (true);

-- Allow authenticated users to update any appointment status
CREATE POLICY "Authenticated users can update any appointment" 
ON public.appointments 
FOR UPDATE 
TO authenticated
USING (true);