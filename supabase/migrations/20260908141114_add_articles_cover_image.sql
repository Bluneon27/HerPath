-- Adds article thumbnails: every article's source page exposes a usable
-- og:image (verified individually), so this mirrors books.cover_image_url —
-- not null, empty string allowed for the rare page with no real per-article
-- image (see the inline note in scripts/articles-data.js).
alter table articles add column cover_image_url text not null default '';
