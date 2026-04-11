-- Add display_style to banners
-- 'overlay'    : image + smoky dark overlay + optional text (current default)
-- 'image_only' : full image, no text, whole banner is a clickable link
-- 'solid'      : solid bg color + centered text, no image needed
ALTER TABLE public.banners
  ADD COLUMN IF NOT EXISTS display_style text NOT NULL DEFAULT 'overlay'
    CHECK (display_style IN ('overlay', 'image_only', 'solid'));
