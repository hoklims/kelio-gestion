-- Enable Row Level Security
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.commission_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.objectives ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'commercial', 'developer')) DEFAULT 'commercial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    notes TEXT,
    archived BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create missions table
CREATE TABLE IF NOT EXISTS public.missions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    deadline DATE,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    advance_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'paid')) DEFAULT 'pending',
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create commission_settings table
CREATE TABLE IF NOT EXISTS public.commission_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    commission_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Create objectives table
CREATE TABLE IF NOT EXISTS public.objectives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    month TEXT NOT NULL,
    year INTEGER NOT NULL,
    target_missions INTEGER NOT NULL DEFAULT 0,
    target_revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(month, year, created_by)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clients_created_by ON public.clients(created_by);
CREATE INDEX IF NOT EXISTS idx_clients_archived ON public.clients(archived);
CREATE INDEX IF NOT EXISTS idx_missions_client_id ON public.missions(client_id);
CREATE INDEX IF NOT EXISTS idx_missions_created_by ON public.missions(created_by);
CREATE INDEX IF NOT EXISTS idx_missions_status ON public.missions(status);
CREATE INDEX IF NOT EXISTS idx_missions_created_at ON public.missions(created_at);
CREATE INDEX IF NOT EXISTS idx_objectives_created_by ON public.objectives(created_by);
CREATE INDEX IF NOT EXISTS idx_objectives_year_month ON public.objectives(year, month);

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_clients_updated_at ON public.clients;
CREATE TRIGGER trigger_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_missions_updated_at ON public.missions;
CREATE TRIGGER trigger_missions_updated_at
    BEFORE UPDATE ON public.missions
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_commission_settings_updated_at ON public.commission_settings;
CREATE TRIGGER trigger_commission_settings_updated_at
    BEFORE UPDATE ON public.commission_settings
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_objectives_updated_at ON public.objectives;
CREATE TRIGGER trigger_objectives_updated_at
    BEFORE UPDATE ON public.objectives
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ language 'plpgsql' security definer;

-- Trigger to create profile on signup
CREATE TRIGGER trigger_create_profile_on_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Row Level Security Policies

-- Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Clients: Users can see all clients, but only edit their own
CREATE POLICY "Users can view all clients" ON public.clients
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert clients" ON public.clients
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own clients" ON public.clients
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own clients" ON public.clients
    FOR DELETE USING (auth.uid() = created_by);

-- Missions: Users can see all missions, but only edit their own
CREATE POLICY "Users can view all missions" ON public.missions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert missions" ON public.missions
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own missions" ON public.missions
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own missions" ON public.missions
    FOR DELETE USING (auth.uid() = created_by);

-- Commission settings: Users can see all, but only edit their own
CREATE POLICY "Users can view all commission settings" ON public.commission_settings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert own commission settings" ON public.commission_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own commission settings" ON public.commission_settings
    FOR UPDATE USING (auth.uid() = user_id);

-- Objectives: Users can see all, but only edit their own
CREATE POLICY "Users can view all objectives" ON public.objectives
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert objectives" ON public.objectives
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own objectives" ON public.objectives
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own objectives" ON public.objectives
    FOR DELETE USING (auth.uid() = created_by);

-- Insert default commission settings for new users
CREATE OR REPLACE FUNCTION public.create_default_commission_settings()
RETURNS TRIGGER AS $$
BEGIN
    -- Default: 40% commercial, 60% developer
    INSERT INTO public.commission_settings (user_id, commission_percentage)
    VALUES (NEW.id, 40);
    RETURN NEW;
END;
$$ language 'plpgsql' security definer;

CREATE TRIGGER trigger_create_default_commission
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.create_default_commission_settings();
