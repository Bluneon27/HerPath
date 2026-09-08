// Growth Videos feature — seed data for the `videos` table.
// Parsed directly from the user-supplied list. Deduplicated: several videos
// were listed under more than one growth path — those are represented once
// here with multiple entries in `growth_paths`, rather than as duplicate rows.
//
// EXCLUDED: "The Power of a Present Father" (originally listed under
// Life & Relationships) had a placeholder URL — youtube.com/watch?v=REPLACE_WITH_VERIFIED_ID
// — not a real video ID. It's left out of this file entirely. Supply the
// correct YouTube ID and add it manually if you still want it included.

export default [
  // ─── Spiritual Growth (SP) ───────────────────────────────────────────
  { title: "The Realities of Life in the Spirit", youtube_id: "bC4J-WprIY4", growth_paths: ["SP"], sequence_order: 1 },
  { title: "Your Extraordinary Advantage!", youtube_id: "GQI7BrbykAc", growth_paths: ["SP"], sequence_order: 2 },
  { title: "God's Call to Walk With Him Again", youtube_id: "8-DaCO2YgzY", growth_paths: ["SP"], sequence_order: 3 },
  { title: "Becoming God's Portal", youtube_id: "jWw4kIv5hYA", growth_paths: ["SP"], sequence_order: 4 },
  { title: "A Prophetic Call For Women In This Hour", youtube_id: "GkgDEyi-nVs", growth_paths: ["SP", "LR", "PP"], sequence_order: 5 },
  { title: "How to Activate the Power of God Within You", youtube_id: "T1O9iLIBn_c", growth_paths: ["SP"], sequence_order: 6 },
  { title: "How to Experience the Help of the Holy Spirit Daily", youtube_id: "UtciPUkOtIw", growth_paths: ["SP"], sequence_order: 7 },
  { title: "Pathway to Full Restoration", youtube_id: "g-RgG5duDaE", growth_paths: ["SP"], sequence_order: 8 },
  { title: "How to Activate God's Protection in Dangerous Times", youtube_id: "blC8FqrPJw8", growth_paths: ["SP"], sequence_order: 9 },
  { title: "Divine Keys That Force Hard Situations to Bow", youtube_id: "tBnSBc0D0kQ", growth_paths: ["SP"], sequence_order: 10 },
  { title: "How to Overcome Fear", youtube_id: "GGayEEi5d0M", growth_paths: ["SP", "PG"], sequence_order: 11 },
  { title: "Anointed and Still Struggling", youtube_id: "35vgLQINtjM", growth_paths: ["SP"], sequence_order: 12 },
  { title: "How to Follow the Holy Spirit in 2026", youtube_id: "2R0iS4Q3l90", growth_paths: ["SP"], sequence_order: 13 },
  { title: "The Power of the Holy Spirit in Your Life", youtube_id: "8B5qQcSVeOI", growth_paths: ["SP", "PP"], sequence_order: 14 },
  { title: "A Prayer for You", youtube_id: "vo8irfom7os", growth_paths: ["SP"], sequence_order: 15 },
  { title: "God Can Restore Your Circumstances", youtube_id: "HHRllMZKmlc", growth_paths: ["SP", "PP"], sequence_order: 16 },

  // ─── Life & Relationships (LR) ───────────────────────────────────────
  { title: "The Truth About Marriage: Open Mic with Pastor Yemi Davids", youtube_id: "QqqA8Jvg01Q", growth_paths: ["LR"], sequence_order: 17 },
  { title: "Learning How to Do Marriage", youtube_id: "8Iz3tkahepc", growth_paths: ["LR"], sequence_order: 18 },
  { title: "Uncovering Divine Principles for Lasting Relationships", youtube_id: "_XdUec3ICZ4", growth_paths: ["LR"], sequence_order: 19 },
  { title: "How to Be Better at Relationships – Rescue Series Part 1", youtube_id: "herkq7Yw5QY", growth_paths: ["LR"], sequence_order: 20 },
  { title: "The Real Reason Why Marriages and Relationships Fail (And How to Fix It)", youtube_id: "CkOxy8saL50", growth_paths: ["LR"], sequence_order: 21 },
  { title: "Why Most Relationships Don't Last", youtube_id: "EYhmc98agHo", growth_paths: ["LR"], sequence_order: 22 },
  { title: "Why Modern Relationships Are Failing", youtube_id: "syX73_5hc4A", growth_paths: ["LR"], sequence_order: 23 },
  { title: "Sexual Immorality as an Enemy of Relationships", youtube_id: "645dHOgL7O8", growth_paths: ["LR"], sequence_order: 24 },
  { title: "How to Navigate Adult Relationships", youtube_id: "eciyZwITiBE", growth_paths: ["LR"], sequence_order: 25 },
  { title: "The Authority of Motherhood", youtube_id: "OtUgvPp7Lyc", growth_paths: ["LR"], sequence_order: 26 },
  { title: "How to Build a Strong Family in God's Covenant", youtube_id: "cDrcGItNevM", growth_paths: ["LR"], sequence_order: 27 },
  { title: "How to Restore Relationships", youtube_id: "BmP-34JCT1g", growth_paths: ["LR"], sequence_order: 28 },
  { title: "Candid Conversations: The Truth About 50 Plus Years Of Marriage", youtube_id: "KSkExN_FsGw", growth_paths: ["LR"], sequence_order: 29 },
  { title: "Supernatural Marriage Course – Module 1", youtube_id: "l-1nLieSyv0", growth_paths: ["LR"], sequence_order: 30 },
  { title: "Supernatural Marriage Course – Module 2", youtube_id: "ekj_L3pFOGA", growth_paths: ["LR"], sequence_order: 31 },
  { title: "Supernatural Marriage Course – Module 3 (Part 1)", youtube_id: "mVFs9NONNb0", growth_paths: ["LR"], sequence_order: 32 },
  { title: "Supernatural Marriage Course – Module 3 (Part 2)", youtube_id: "LzzW75CwE98", growth_paths: ["LR"], sequence_order: 33 },
  { title: "Spiritual Marriage Course – Module 4 (Part 1)", youtube_id: "cezK8sp6Wlw", growth_paths: ["LR"], sequence_order: 34 },
  { title: "Spiritual Marriage Course – Module 4 (Part 2)", youtube_id: "N3k0uGOWHI8", growth_paths: ["LR"], sequence_order: 35 },
  { title: "Spiritual Marriage Course – Module 4 (Part 3)", youtube_id: "AIYovUa_0IY", growth_paths: ["LR"], sequence_order: 36 },
  { title: "Supernatural Marriage Course – Module 5", youtube_id: "gAqZ1oIawhY", growth_paths: ["LR"], sequence_order: 37 },
  { title: "God's Will for Your Marital Destiny", youtube_id: "ndop1UTAQ20", growth_paths: ["LR"], sequence_order: 38 },
  { title: "How to Enjoy a Long Lasting and Sweet Marriage", youtube_id: "Xs3gyyvSe7E", growth_paths: ["LR"], sequence_order: 39 },
  { title: "Question and Answer Session with Dr Paul & Dr (Mrs) Becky Enenche – Part 1", youtube_id: "Szy5sZ3RjFo", growth_paths: ["LR"], sequence_order: 40 },
  { title: "The Secrets of a Successful Marriage and Relationships", youtube_id: "ThbWgiQdbRo", growth_paths: ["LR"], sequence_order: 41 },

  // ─── Personal Growth (PG) ────────────────────────────────────────────
  { title: "Unlocking Confidence in Your God-Given Identity and Calling", youtube_id: "OsQRtBC15oE", growth_paths: ["PG", "PP"], sequence_order: 42 },
  { title: "Framework of the Sent Woman", youtube_id: "gGXkUDGHPV8", growth_paths: ["PG", "PP"], sequence_order: 43 },
  { title: "A Word for Everyone Still Waiting", youtube_id: "bphd3JPIQWI", growth_paths: ["PG"], sequence_order: 44 },
  { title: "God Is Making Room for You", youtube_id: "axHM-RqTvJs", growth_paths: ["PG"], sequence_order: 45 },
  { title: "How to Achieve All-Round Success in Your Life", youtube_id: "rjZeCQc80oI", growth_paths: ["PG", "PP"], sequence_order: 46 },
  { title: "Rising Above Failure", youtube_id: "-XCp02Oxb70", growth_paths: ["PG"], sequence_order: 47 },
  { title: "You Are Designed for Purpose", youtube_id: "V-hhXjUuuYk", growth_paths: ["PG", "PP"], sequence_order: 48 },
  { title: "Personal Development as the Core of Greatness", youtube_id: "ZP6TxwyW0rU", growth_paths: ["PG"], sequence_order: 49 },
  { title: "How to Gain Speed – Part 2", youtube_id: "-gOKmrVzZ30", growth_paths: ["PG", "PP"], sequence_order: 50 },
  { title: "Becoming a Covenant Giant in Your Generation", youtube_id: "FawH_Jfb4fc", growth_paths: ["PG"], sequence_order: 51 },
  { title: "Freedom From Insecurity", youtube_id: "RT0SBgQxzj4", growth_paths: ["PG"], sequence_order: 52 },
  { title: "You Have All the Strength You Need", youtube_id: "MccbV6YI0X8", growth_paths: ["PG"], sequence_order: 53 },

  // ─── Purpose & Progress (PP) ─────────────────────────────────────────
  { title: "Building Wealth, the God Way", youtube_id: "1WAFDfA_gyc", growth_paths: ["PP"], sequence_order: 54 },
  { title: "Becoming a Distinguished Kingdom Professional", youtube_id: "r1pHFG8n3S4", growth_paths: ["PP"], sequence_order: 55 },
  { title: "Leadership, Vision & Spiritual Capacity Building", youtube_id: "enIcS5aKeu8", growth_paths: ["PP"], sequence_order: 56 },
  { title: "Success Power System – Vision and Trust, Part 1", youtube_id: "_hLxY92-aSw", growth_paths: ["PP"], sequence_order: 57 },
  { title: "Success Power System – Vision and Trust, Part 2", youtube_id: "97ovS6e2ueg", growth_paths: ["PP"], sequence_order: 58 },
  { title: "Covenant Principles for Financial Dominion", youtube_id: "eJwWUL8oXC0", growth_paths: ["PP"], sequence_order: 59 },
  { title: "Unveiling the Secrets to Financial Breakthrough", youtube_id: "XQYonINsvQw", growth_paths: ["PP"], sequence_order: 60 },
  { title: "The Secrets to Unlimited Wealth: Prosper with Kingdom Principles", youtube_id: "o8YdXIIrQCE", growth_paths: ["PP"], sequence_order: 61 },
  { title: "School of Divine Prosperity: Master God's Economy in 6 Steps", youtube_id: "0zSpfM7eAaA", growth_paths: ["PP"], sequence_order: 62 },
  { title: "BeGreat Devotional – Manifesting Financial Greatness", youtube_id: "lpvXNcWpVMw", growth_paths: ["PP"], sequence_order: 63 },
  { title: "Pst Yemi Davids Session – Equip Conference 2026", youtube_id: "Xb388E2YxRo", growth_paths: ["PP"], sequence_order: 64 },
  { title: "God Has a Purpose for This Season of Your Life", youtube_id: "wN2---uyyIE", growth_paths: ["PP"], sequence_order: 65 },
  { title: "How To Know The Purpose Of Your Life: Find Direction", youtube_id: "gTgcGlnK1kk", growth_paths: ["PP"], sequence_order: 66 },
  { title: "Find Your True Purpose: The Power Of Understanding", youtube_id: "4E8HZZzSOVo", growth_paths: ["PP"], sequence_order: 67 },
  { title: "Discovering Your Personal Leadership", youtube_id: "ueA073Q6a88", growth_paths: ["PP"], sequence_order: 68 },
  { title: "How Prayer and Fasting Influence Earth", youtube_id: "Wis1u4i9cBI", growth_paths: ["PP"], sequence_order: 69 },
  { title: "The Priority of Community In Kingdoms", youtube_id: "-u7DAZykKrE", growth_paths: ["PP"], sequence_order: 70 },
  { title: "The Priority of Community In Kingdoms Part 2", youtube_id: "0pGFlYy_k7I", growth_paths: ["PP"], sequence_order: 71 },
  { title: "Understanding The Principles of The Kingdom", youtube_id: "jaqe5NL0hNU", growth_paths: ["PP"], sequence_order: 72 },
  { title: "The Kingdom Principle of Addition", youtube_id: "4DccWsI5rAs", growth_paths: ["PP"], sequence_order: 73 },
  { title: "The Keys To Accessing The Things of The Kingdom – Part 1", youtube_id: "4LIoz_IBeOs", growth_paths: ["PP"], sequence_order: 74 },
];
