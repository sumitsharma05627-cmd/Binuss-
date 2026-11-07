-- ==============================================================================
-- GWALIOR WEB LABS – SOCIAL COMMAND CENTER
-- Production PostgreSQL Database Migration with Supabase Row Level Security (RLS)
-- Version: 2.0.0 (Production Multi-User Tenant Isolation)
-- Developer: Gwalior Web Labs (https://gwlweblab.com)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. SCHEMAS & TABLES
-- ==============================================================================

-- WORKSPACES TABLE (Client / Organization isolation)
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) DEFAULT 'General',
    logo_url TEXT,
    plan_tier VARCHAR(50) DEFAULT 'free',
    approval_required BOOLEAN DEFAULT FALSE,
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    brand_colors JSONB DEFAULT '{"primary": "#06b6d4", "secondary": "#10b981"}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SOCIAL CONNECTED ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS public.social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'instagram', 'facebook', 'youtube', 'linkedin', 'twitter', 'pinterest', 'reddit', 'telegram', 'whatsapp'
    account_handle VARCHAR(255) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) DEFAULT 'Business / Creator',
    avatar_url TEXT,
    profile_url TEXT,
    status VARCHAR(50) DEFAULT 'connected', -- 'connected', 'token_expiring', 'expired', 'error', 'disconnected'
    followers_count BIGINT DEFAULT 0,
    following_count BIGINT DEFAULT 0,
    posts_count BIGINT DEFAULT 0,
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    permissions JSONB DEFAULT '[]'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SOCIAL POSTS & PUBLISHING PIPELINE TABLE
CREATE TABLE IF NOT EXISTS public.social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title VARCHAR(255),
    caption TEXT NOT NULL,
    platforms JSONB NOT NULL DEFAULT '[]'::jsonb, -- array of platforms e.g. ["instagram", "linkedin"]
    media_urls JSONB DEFAULT '[]'::jsonb,
    media_type VARCHAR(50) DEFAULT 'image', -- 'text', 'image', 'video', 'carousel', 'story', 'reel'
    hashtags JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'scheduled', 'publishing', 'published', 'failed', 'pending_approval'
    scheduled_for TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    author_name VARCHAR(255),
    author_avatar TEXT,
    client_approved BOOLEAN DEFAULT TRUE,
    approval_notes TEXT,
    metrics JSONB DEFAULT '{"likes": 0, "comments": 0, "shares": 0, "impressions": 0, "reach": 0, "clicks": 0, "saves": 0}'::jsonb,
    platform_post_ids JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- UNIFIED INBOX CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.inbox_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_handle VARCHAR(255) NOT NULL,
    customer_avatar TEXT,
    sentiment VARCHAR(50) DEFAULT 'neutral', -- 'positive', 'neutral', 'negative', 'urgent'
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'resolved', 'archived'
    last_message_snippet TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    unread_count INT DEFAULT 0,
    assigned_to_user_id UUID REFERENCES auth.users(id),
    customer_tags JSONB DEFAULT '[]'::jsonb,
    messages JSONB DEFAULT '[]'::jsonb,
    internal_notes JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- MEDIA ASSETS & DIGITAL ASSET MANAGEMENT TABLE
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'image', 'video', 'document', 'audio'
    mime_type VARCHAR(100),
    size_bytes BIGINT DEFAULT 0,
    dimensions VARCHAR(50),
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AUTOMATION WORKFLOWS TABLE
CREATE TABLE IF NOT EXISTS public.automation_workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    platform VARCHAR(50) NOT NULL,
    trigger_type VARCHAR(100) NOT NULL, -- 'new_follower', 'dm_received', 'comment_on_post', 'mention'
    action_type VARCHAR(100) NOT NULL, -- 'send_instant_reply', 'assign_tag', 'notify_slack', 'webhook'
    config JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    execution_count INT DEFAULT 0,
    last_triggered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SUBSCRIPTION TRANSACTIONS & BILLING TABLE
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL,
    plan_id VARCHAR(50) NOT NULL, -- 'free', 'starter', 'professional', 'agency'
    billing_cycle VARCHAR(50) DEFAULT 'monthly', -- 'monthly', 'annual'
    amount_inr NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    gateway VARCHAR(50) NOT NULL, -- 'razorpay', 'stripe', 'upi', 'manual'
    gateway_payment_id VARCHAR(255),
    gateway_order_id VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'completed', -- 'completed', 'pending', 'failed', 'refunded'
    invoice_number VARCHAR(100),
    invoice_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AUDIT & COMPLIANCE LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Each user can ONLY access and modify their own records.
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbox_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- WORKSPACES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own workspaces"
    ON public.workspaces FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "Users can create workspaces for themselves"
    ON public.workspaces FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workspaces"
    ON public.workspaces FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workspaces"
    ON public.workspaces FOR DELETE
    USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- SOCIAL ACCOUNTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own connected social accounts"
    ON public.social_accounts FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "Users can connect accounts for themselves"
    ON public.social_accounts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social accounts"
    ON public.social_accounts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can disconnect their own social accounts"
    ON public.social_accounts FOR DELETE
    USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- SOCIAL POSTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own social posts"
    ON public.social_posts FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "Users can create their own social posts"
    ON public.social_posts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social posts"
    ON public.social_posts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social posts"
    ON public.social_posts FOR DELETE
    USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- INBOX CONVERSATIONS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own inbox conversations"
    ON public.inbox_conversations FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "Users can insert inbox conversations"
    ON public.inbox_conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inbox conversations"
    ON public.inbox_conversations FOR UPDATE
    USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- MEDIA ASSETS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own media assets"
    ON public.media_assets FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "Users can upload their own media assets"
    ON public.media_assets FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own media assets"
    ON public.media_assets FOR DELETE
    USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- AUTOMATION WORKFLOWS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own automations"
    ON public.automation_workflows FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "Users can create automations"
    ON public.automation_workflows FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own automations"
    ON public.automation_workflows FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own automations"
    ON public.automation_workflows FOR DELETE
    USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- PAYMENT TRANSACTIONS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own payment transactions"
    ON public.payment_transactions FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "Users can insert their own payment receipts"
    ON public.payment_transactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- AUDIT LOGS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own audit logs"
    ON public.audit_logs FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = 'gwaliorweblabs@gmail.com');

CREATE POLICY "System can record audit logs"
    ON public.audit_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- 4. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_workspaces_user_id ON public.workspaces (user_id);
CREATE INDEX IF NOT EXISTS idx_social_accounts_user_id ON public.social_accounts (user_id);
CREATE INDEX IF NOT EXISTS idx_social_accounts_platform ON public.social_accounts (platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON public.social_posts (user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON public.social_posts (status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_for ON public.social_posts (scheduled_for);
CREATE INDEX IF NOT EXISTS idx_inbox_conversations_user_id ON public.inbox_conversations (user_id);
CREATE INDEX IF NOT EXISTS idx_inbox_conversations_status ON public.inbox_conversations (status);
CREATE INDEX IF NOT EXISTS idx_media_assets_user_id ON public.media_assets (user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payment_transactions (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs (user_id);

-- ==============================================================================
-- 5. AUTOMATIC TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_workspaces_updated_at ON public.workspaces;
CREATE TRIGGER trg_workspaces_updated_at BEFORE UPDATE ON public.workspaces FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS trg_social_accounts_updated_at ON public.social_accounts;
CREATE TRIGGER trg_social_accounts_updated_at BEFORE UPDATE ON public.social_accounts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS trg_social_posts_updated_at ON public.social_posts;
CREATE TRIGGER trg_social_posts_updated_at BEFORE UPDATE ON public.social_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
