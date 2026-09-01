// Growth Reading feature — seed data for the `books` table.
// Generated from research against the Open Library API (Google Books API's
// daily quota was exhausted for this environment, so it was not used).
// A few gaps are flagged inline below — review the "KNOWN GAPS" notes
// before running scripts/seed-books.js.

export default [
  // ─── SPIRITUAL GROWTH (SP) ───────────────────────────────────────────
  {
    title: "Man on Three Dimensions",
    author: "Kenneth E. Hagin",
    growth_path: "SP",
    sequence_order: 1,
    page_count: 31,
    // NOTE: sourced from Goodreads, not Open Library — this booklet has no cover on Open Library.
    cover_image_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1394337755i/6692980.jpg",
    retailer_url: "https://openlibrary.org/works/OL2368479W",
    description: "A short booklet explaining the biblical teaching that humans are spirit, soul, and body, and how the human spirit governs the whole person."
  },
  {
    title: "Growing in the Knowledge of Jesus Christ",
    author: "Mark A. Copeland",
    growth_path: "SP",
    sequence_order: 2,
    // KNOWN GAP: this is a free web-published Bible study outline, not a
    // commercially catalogued book — no ISBN/page count/cover exists anywhere.
    page_count: null,
    cover_image_url: "",
    retailer_url: "https://executableoutlines.com/topical_series/growing-knowledge-jesus-christ/",
    description: "A free Bible study outline series examining the character qualities believers are called to develop as they grow in the knowledge of Jesus Christ."
  },
  {
    title: "Spiritual Growth",
    author: "Mark A. Copeland",
    growth_path: "SP",
    sequence_order: 3,
    // KNOWN GAP: same as above — free outline, no page count/cover exists.
    page_count: null,
    cover_image_url: "",
    retailer_url: "https://executableoutlines.com/grow/grow_01.htm",
    description: "A free Bible study outline series on the choice and practice of spiritual growth, covering private devotion, prayer, and fellowship with other believers."
  },
  {
    title: "Discerning the Voice of God",
    author: "Priscilla Shirer",
    growth_path: "SP",
    sequence_order: 4,
    page_count: 192,
    cover_image_url: "https://covers.openlibrary.org/b/id/1511890-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL8399839W",
    description: "A guide that helps readers learn to recognize and follow God's voice through Scripture and prayer amid the distractions of everyday life."
  },
  {
    title: "Fervent",
    author: "Priscilla Shirer",
    growth_path: "SP",
    sequence_order: 5,
    page_count: 208,
    cover_image_url: "https://covers.openlibrary.org/b/id/7366561-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL17197894W",
    description: "A strategic guide to prayer that equips readers to identify and fight the specific spiritual battles in their lives."
  },
  {
    title: "The Well-Watered Woman",
    author: "Gretchen Saffles",
    growth_path: "SP",
    sequence_order: 6,
    page_count: 304,
    cover_image_url: "https://covers.openlibrary.org/b/id/13287093-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL25442807W",
    description: "An invitation for women to root their identity in Scripture and cultivate a flourishing spiritual life through consistent time in God's Word."
  },
  {
    title: "The Power of a Praying Woman",
    author: "Stormie Omartian",
    growth_path: "SP",
    sequence_order: 7,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/464037-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL1808889W",
    description: "A devotional guide encouraging women to bring every area of their lives, relationships, and struggles before God in prayer."
  },
  {
    title: "Get Out of That Pit",
    author: "Beth Moore",
    growth_path: "SP",
    sequence_order: 8,
    page_count: 160,
    cover_image_url: "https://covers.openlibrary.org/b/id/1600058-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL103582W",
    description: "Encouragement for readers who feel trapped by discouragement, shame, or crisis, pointing them toward the deliverance available through faith in God."
  },
  {
    title: "The Knowledge of the Holy",
    author: "A.W. Tozer",
    growth_path: "SP",
    sequence_order: 9,
    page_count: 188,
    cover_image_url: "https://covers.openlibrary.org/b/id/32629-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL544651W",
    description: "A classic exploration of God's attributes and character, written to restore reverence and deepen the reader's understanding of who God is."
  },
  {
    title: "The Practice of the Presence of God",
    author: "Brother Lawrence",
    growth_path: "SP",
    sequence_order: 10,
    page_count: 194,
    cover_image_url: "https://covers.openlibrary.org/b/id/713834-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL8253858W",
    description: "A classic collection of letters and conversations describing how to cultivate continual awareness of and communion with God amid everyday tasks."
  },
  {
    title: "Emotionally Healthy Spirituality",
    author: "Peter Scazzero",
    growth_path: "SP",
    sequence_order: 11,
    page_count: 240,
    cover_image_url: "https://covers.openlibrary.org/b/id/12019920-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20941336W",
    description: "Argues that true spiritual maturity is impossible without emotional health, and offers practices for integrating the two for lasting transformation."
  },

  // ─── LIFE & RELATIONSHIPS (LR) ───────────────────────────────────────
  {
    title: "The Meaning of Marriage",
    author: "Timothy Keller & Kathy Keller",
    growth_path: "LR",
    sequence_order: 1,
    page_count: 283,
    cover_image_url: "https://covers.openlibrary.org/b/id/6895683-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL16079742W",
    description: "Based on Timothy Keller's acclaimed sermon series, this book presents the Bible's vision of marriage for Christians, skeptics, singles, and married couples alike."
  },
  {
    title: "The Five Love Languages",
    author: "Gary Chapman",
    growth_path: "LR",
    sequence_order: 2,
    page_count: 204,
    cover_image_url: "https://covers.openlibrary.org/b/id/12602983-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL1680319W",
    description: "Gary Chapman identifies five ways people express and experience love and shows readers how to discover their own love language and their partner's."
  },
  {
    title: "Love & Respect",
    author: "Emerson Eggerichs",
    growth_path: "LR",
    sequence_order: 3,
    page_count: 336,
    cover_image_url: "https://covers.openlibrary.org/b/id/1975459-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL8966593W",
    description: "Dr. Emerson Eggerichs reveals that unconditional respect is as vital to husbands as unconditional love is to wives, based on Ephesians 5:33."
  },
  {
    title: "Sacred Marriage",
    author: "Gary Thomas",
    growth_path: "LR",
    sequence_order: 4,
    page_count: 288,
    cover_image_url: "https://covers.openlibrary.org/b/id/2364195-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL8549139W",
    description: "Gary Thomas explores the idea that God's primary intent for marriage may not be to make us happy but to make us holy."
  },
  {
    title: "What Did You Expect?",
    author: "Paul David Tripp",
    growth_path: "LR",
    sequence_order: 5,
    page_count: 287,
    cover_image_url: "https://covers.openlibrary.org/b/id/6713354-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL15531161W",
    description: "Paul Tripp offers six practical, gospel-centered commitments — rooted in honest confession and grace — that can transform ordinary marriages."
  },
  {
    title: "How to Act Right When Your Spouse Acts Wrong",
    author: "Leslie Vernick",
    growth_path: "LR",
    sequence_order: 6,
    page_count: 224,
    cover_image_url: "https://covers.openlibrary.org/b/id/835082-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL5719244W",
    description: "Leslie Vernick shows that responding wisely to a difficult spouse can become a means God uses to shape you into greater Christlikeness."
  },
  {
    title: "Things I Wish I'd Known Before We Got Married",
    author: "Gary Chapman",
    growth_path: "LR",
    sequence_order: 7,
    page_count: 189,
    cover_image_url: "https://covers.openlibrary.org/b/id/7131610-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL15507177W",
    description: "Drawing on decades of marriage counseling, Gary Chapman shares practical wisdom for engaged and newly married couples."
  },
  {
    title: "The Power of a Praying Wife",
    author: "Stormie Omartian",
    growth_path: "LR",
    sequence_order: 8,
    page_count: 203,
    cover_image_url: "https://covers.openlibrary.org/b/id/463947-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL1808871W",
    description: "Stormie Omartian shares how praying for your husband in every area of life can transform a marriage, with focused prayers for each topic."
  },
  {
    title: "The Power of a Praying Parent",
    author: "Stormie Omartian",
    growth_path: "LR",
    sequence_order: 9,
    page_count: 224,
    cover_image_url: "https://covers.openlibrary.org/b/id/1368356-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL1808802W",
    description: "Stormie Omartian shares how parents can pray for their children through every stage of life, from early childhood to adulthood."
  },
  {
    title: "Parenting: 14 Gospel Principles That Can Radically Change Your Family",
    author: "Paul David Tripp",
    growth_path: "LR",
    sequence_order: 10,
    page_count: 216,
    cover_image_url: "https://covers.openlibrary.org/b/id/7881198-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL17594122W",
    description: "Paul David Tripp offers 14 gospel-centered principles that reframe parenting as an outworking of God's transforming grace."
  },
  {
    title: "The Faithful Parent",
    author: "Martha Peace & Stuart Scott",
    growth_path: "LR",
    sequence_order: 11,
    page_count: 240,
    cover_image_url: "https://covers.openlibrary.org/b/id/6455429-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL15270998W",
    description: "A biblically grounded, practical guide for Christian parents, emphasizing faithfulness to God as the true measure of parenting success."
  },
  {
    title: "Gospel-Powered Parenting",
    author: "William P. Farley",
    growth_path: "LR",
    sequence_order: 12,
    page_count: 233,
    cover_image_url: "https://covers.openlibrary.org/b/id/7266218-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL13820116W",
    description: "William Farley argues that the gospel — not merely techniques or rules — must shape how Christian parents relate to their children."
  },
  {
    title: "Instructing a Child's Heart",
    author: "Tedd Tripp & Margy Tripp",
    growth_path: "LR",
    sequence_order: 13,
    page_count: 188,
    // NOTE: Open Library only indexes a video/seminar edition of this title;
    // page count sourced from retailer listings for the paperback edition.
    cover_image_url: "https://covers.openlibrary.org/b/id/7256673-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL16803815W",
    description: "Tedd and Margy Tripp teach parents to disciple their children's thinking and worldview rather than simply managing outward behavior."
  },
  {
    title: "Boundaries",
    author: "Henry Cloud & John Townsend",
    growth_path: "LR",
    sequence_order: 14,
    page_count: 352,
    cover_image_url: "https://covers.openlibrary.org/b/id/8227168-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL15134775W",
    description: "Henry Cloud and John Townsend offer biblical and psychological guidance for setting healthy boundaries in relationships."
  },
  {
    title: "Boundaries with Kids",
    author: "Henry Cloud & John Townsend",
    growth_path: "LR",
    sequence_order: 15,
    page_count: 223,
    cover_image_url: "https://covers.openlibrary.org/b/id/169782-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL14934877W",
    description: "Henry Cloud and John Townsend apply the biblical boundaries principles to parenting, helping parents foster responsibility and character."
  },
  {
    title: "The Sacred Search",
    author: "Gary Thomas",
    growth_path: "LR",
    sequence_order: 16,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/7358909-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL17183271W",
    description: "Gary Thomas challenges singles to look beyond finding a 'soul mate' and instead search for a 'sole mate' who will walk with them spiritually."
  },
  {
    title: "A Lifelong Love",
    author: "Gary Thomas",
    growth_path: "LR",
    sequence_order: 17,
    page_count: 334,
    cover_image_url: "https://covers.openlibrary.org/b/id/12211270-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL19751126W",
    description: "Gary Thomas focuses on three keys to a lasting marriage — pursuing God together, growing in deeper love, and intentionally building oneness."
  },
  {
    title: "The Mingling of Souls",
    author: "Matt Chandler",
    growth_path: "LR",
    sequence_order: 18,
    page_count: 224,
    cover_image_url: "https://covers.openlibrary.org/b/id/8970298-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20309888W",
    description: "Drawing on the Song of Solomon, Matt Chandler offers a candid look at attraction, dating, marriage, sex, and conflict."
  },
  {
    title: "For Women Only",
    author: "Shaunti Feldhahn",
    growth_path: "LR",
    sequence_order: 19,
    page_count: 189,
    cover_image_url: "https://covers.openlibrary.org/b/id/860418-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL1929431W",
    description: "Based on a national survey of over a thousand men, Shaunti Feldhahn reveals what men wish women understood about their inner lives."
  },
  {
    title: "The Best Yes",
    author: "Lysa TerKeurst",
    growth_path: "LR",
    sequence_order: 20,
    page_count: 260,
    cover_image_url: "https://covers.openlibrary.org/b/id/11595330-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL19987835W",
    description: "Lysa TerKeurst offers a biblical framework for wisely deciding what to say yes to, helping readers escape the guilt of disappointing others."
  },

  // ─── PERSONAL GROWTH (PG) ────────────────────────────────────────────
  {
    title: "No Excuses!",
    author: "Brian Tracy",
    growth_path: "PG",
    sequence_order: 1,
    page_count: 304,
    cover_image_url: "https://covers.openlibrary.org/b/id/7984635-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL17710018W",
    description: "Brian Tracy argues that self-discipline, not luck or talent, is the key to success in every area of life."
  },
  {
    title: "Battlefield of the Mind",
    author: "Joyce Meyer",
    growth_path: "PG",
    sequence_order: 2,
    page_count: 288,
    cover_image_url: "https://covers.openlibrary.org/b/id/288414-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL803597W",
    description: "Joyce Meyer's bestselling guide to overcoming worry, doubt, and negative thinking by learning to think the way God thinks."
  },
  {
    title: "Power Thoughts",
    author: "Joyce Meyer",
    growth_path: "PG",
    sequence_order: 3,
    page_count: 288,
    cover_image_url: "https://covers.openlibrary.org/b/id/9052114-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL15043440W",
    description: "A follow-up to Battlefield of the Mind, offering twelve practical strategies for replacing negative thinking with 'power thoughts.'"
  },
  {
    title: "The Confident Woman",
    author: "Joyce Meyer",
    growth_path: "PG",
    sequence_order: 4,
    page_count: 339,
    cover_image_url: "https://covers.openlibrary.org/b/id/286389-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL803575W",
    description: "Joyce Meyer identifies seven characteristics of confident women, helping readers root their confidence in God's love rather than comparison."
  },
  {
    title: "Approval Addiction",
    author: "Joyce Meyer",
    growth_path: "PG",
    sequence_order: 5,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/1235121-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL803596W",
    description: "Joyce Meyer addresses the unhealthy need for others' approval and shows readers how to find security and self-worth in God instead."
  },
  {
    title: "Beauty for Ashes",
    author: "Joyce Meyer",
    growth_path: "PG",
    sequence_order: 6,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/690878-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL803594W",
    description: "Drawing on her own history of abuse, Joyce Meyer outlines a path to emotional healing for survivors of trauma."
  },
  {
    title: "Get Out of Your Head",
    author: "Jennie Allen",
    growth_path: "PG",
    sequence_order: 7,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/9297045-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20652743W",
    description: "Jennie Allen examines the spiral of toxic, self-focused thoughts and offers a biblical process for capturing thoughts and replacing them with truth."
  },
  {
    title: "Restless",
    author: "Jennie Allen",
    growth_path: "PG",
    sequence_order: 8,
    page_count: 240,
    // KNOWN GAP: no cover image indexed on Open Library for this edition (confirmed empty).
    cover_image_url: "",
    retailer_url: "https://openlibrary.org/works/OL25371809W",
    description: "Jennie Allen explores the restlessness many believers feel about their purpose and walks readers through discovering their unique calling."
  },
  {
    title: "Woman Evolve",
    author: "Sarah Jakes Roberts",
    growth_path: "PG",
    sequence_order: 9,
    page_count: 224,
    cover_image_url: "https://covers.openlibrary.org/b/id/11380036-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL21950549W",
    description: "Reimagining the biblical story of Eve, Sarah Jakes Roberts shows women how to use past mistakes as fuel to break through into who they're called to become."
  },
  {
    title: "Power Moves",
    author: "Sarah Jakes Roberts",
    growth_path: "PG",
    sequence_order: 10,
    page_count: 224,
    cover_image_url: "https://covers.openlibrary.org/b/id/14745177-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL38027987W",
    description: "Sarah Jakes Roberts offers a guide to intentional personal growth, encouraging deliberate 'power moves' in faith, mindset, and purpose."
  },
  {
    title: "Uninvited",
    author: "Lysa TerKeurst",
    growth_path: "PG",
    sequence_order: 11,
    page_count: 288,
    cover_image_url: "https://covers.openlibrary.org/b/id/10206837-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20881803W",
    description: "Lysa TerKeurst draws on her own experiences of rejection to help readers find security in being handpicked by God."
  },
  {
    title: "Forgiving What You Can't Forget",
    author: "Lysa TerKeurst",
    growth_path: "PG",
    sequence_order: 12,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/10528527-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL21910087W",
    description: "Lysa TerKeurst offers a step-by-step process for letting go of resentment and forgiving people who have deeply hurt you."
  },
  {
    title: "Good Boundaries and Goodbyes",
    author: "Lysa TerKeurst",
    growth_path: "PG",
    sequence_order: 13,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/13261973-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL34319619W",
    description: "Lysa TerKeurst shows readers how to set healthy boundaries and recognize when it's time to walk away from harmful relationships."
  },
  {
    title: "Unashamed",
    author: "Christine Caine",
    growth_path: "PG",
    sequence_order: 14,
    page_count: 224,
    cover_image_url: "https://covers.openlibrary.org/b/id/8227166-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL17908462W",
    description: "Christine Caine shares her personal story of shame and secrecy to help readers break free from guilt and condemnation."
  },
  {
    title: "The Circle Maker",
    author: "Mark Batterson",
    growth_path: "PG",
    sequence_order: 15,
    page_count: 238,
    cover_image_url: "https://covers.openlibrary.org/b/id/8840742-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20191536W",
    description: "Inspired by the true story of Honi the circle maker, Mark Batterson challenges readers to pursue audacious, faith-filled prayer."
  },
  {
    title: "Present Over Perfect",
    author: "Shauna Niequist",
    growth_path: "PG",
    sequence_order: 16,
    page_count: 240,
    cover_image_url: "https://covers.openlibrary.org/b/id/9138574-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20473826W",
    description: "Shauna Niequist reflects on trading a frantic, performance-driven life for one centered on presence, rest, and authentic relationships."
  },
  {
    title: "Switch On Your Brain",
    author: "Caroline Leaf",
    growth_path: "PG",
    sequence_order: 17,
    page_count: 241,
    cover_image_url: "https://covers.openlibrary.org/b/id/7272162-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL16812791W",
    description: "Neuroscientist Dr. Caroline Leaf presents a faith-based approach to rewiring negative thought patterns for better mental and physical health."
  },
  {
    title: "Becoming the Woman God Wants Me to Be",
    author: "Donna Partow",
    growth_path: "PG",
    sequence_order: 18,
    page_count: 343,
    cover_image_url: "https://covers.openlibrary.org/b/id/2638652-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL1840517W",
    description: "Donna Partow offers a 90-day guided study through Proverbs, helping women apply the qualities of the Proverbs 31 woman to their own lives."
  },
  {
    title: "The Total Money Makeover",
    author: "Dave Ramsey",
    growth_path: "PG",
    sequence_order: 19,
    page_count: 240,
    cover_image_url: "https://covers.openlibrary.org/b/id/6873839-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL16027047W",
    description: "Dave Ramsey lays out a seven-step, no-nonsense plan for getting out of debt and achieving long-term financial health."
  },
  {
    title: "Financial Peace Revisited",
    author: "Dave Ramsey",
    growth_path: "PG",
    sequence_order: 20,
    page_count: 352,
    cover_image_url: "https://covers.openlibrary.org/b/id/400343-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL1932226W",
    description: "An updated edition of Dave Ramsey's original financial guide, combining his personal story with practical budgeting and debt advice."
  },
  {
    title: "Money, Possessions, and Eternity",
    author: "Randy Alcorn",
    growth_path: "PG",
    sequence_order: 21,
    page_count: 470,
    cover_image_url: "https://covers.openlibrary.org/b/id/639925-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL3335337W",
    description: "Randy Alcorn offers a comprehensive, Bible-based examination of money, possessions, materialism, and stewardship."
  },
  {
    title: "The Treasure Principle",
    author: "Randy Alcorn",
    growth_path: "PG",
    sequence_order: 22,
    page_count: 111,
    cover_image_url: "https://covers.openlibrary.org/b/id/876711-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL3335331W",
    description: "In this concise classic, Randy Alcorn unpacks Jesus's teaching on giving, showing how generosity unlocks lasting joy."
  },

  // ─── PURPOSE & PROGRESS (PP) ─────────────────────────────────────────
  {
    title: "Plans, Purposes and Pursuits",
    // NOTE: verified title is plural "Purposes" (your list had "Purpose").
    author: "Kenneth E. Hagin",
    growth_path: "PP",
    sequence_order: 1,
    page_count: 150,
    cover_image_url: "https://covers.openlibrary.org/b/id/690928-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL2368494W",
    description: "Kenneth Hagin examines how God gives each believer a plan and purpose, and how to pursue it faithfully."
  },
  {
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    growth_path: "PP",
    sequence_order: 2,
    page_count: 334,
    cover_image_url: "https://covers.openlibrary.org/b/id/1166287-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL16335306W",
    description: "This book helps readers understand why they are alive and God's plan for them, both here and now and for eternity."
  },
  {
    title: "In Pursuit of Purpose",
    author: "Myles Munroe",
    growth_path: "PP",
    sequence_order: 3,
    page_count: 150,
    cover_image_url: "https://covers.openlibrary.org/b/id/790183-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL15057996W",
    // KNOWN GAP: Open Library's work record has no description field for this title.
    description: null
  },
  {
    title: "The Principles and Power of Vision",
    author: "Myles Munroe",
    growth_path: "PP",
    sequence_order: 4,
    page_count: 142,
    cover_image_url: "https://covers.openlibrary.org/b/id/681494-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL159053W",
    description: null
  },
  {
    title: "Understanding Your Potential",
    author: "Myles Munroe",
    growth_path: "PP",
    sequence_order: 5,
    page_count: 152,
    cover_image_url: "https://covers.openlibrary.org/b/id/790173-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL159047W",
    description: null
  },
  {
    title: "The Spirit of Leadership",
    author: "Myles Munroe",
    growth_path: "PP",
    sequence_order: 6,
    page_count: 300,
    cover_image_url: "https://covers.openlibrary.org/b/id/681778-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL159046W",
    description: "Defines the unique attitudes that all effective leaders exhibit and how to fulfill your particular calling in life."
  },
  {
    title: "Developing the Leader Within You 2.0",
    author: "John C. Maxwell",
    growth_path: "PP",
    sequence_order: 7,
    // KNOWN GAP: every edition Open Library has on file is Audio CD only — no print page count exists in their catalog.
    page_count: null,
    cover_image_url: "https://covers.openlibrary.org/b/id/12016603-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL25351522W",
    description: null
  },
  {
    title: "The 15 Invaluable Laws of Growth",
    author: "John C. Maxwell",
    growth_path: "PP",
    sequence_order: 8,
    page_count: 288,
    cover_image_url: "https://covers.openlibrary.org/b/id/8994074-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20331108W",
    description: null
  },
  {
    title: "Today Matters",
    author: "John C. Maxwell",
    growth_path: "PP",
    sequence_order: 9,
    page_count: 312,
    cover_image_url: "https://covers.openlibrary.org/b/id/5406818-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL28130W",
    description: "John Maxwell argues that most people misjudge their days — exaggerating yesterday, overestimating tomorrow, and underestimating today."
  },
  {
    title: "Intentional Living",
    author: "John C. Maxwell",
    growth_path: "PP",
    sequence_order: 10,
    // KNOWN GAP: same as #7 — only Audio CD editions on file, no print page count.
    page_count: null,
    cover_image_url: "https://covers.openlibrary.org/b/id/7366829-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL17198309W",
    description: null
  },
  {
    title: "Good Leaders Ask Great Questions",
    author: "John C. Maxwell",
    growth_path: "PP",
    sequence_order: 11,
    page_count: 302,
    cover_image_url: "https://covers.openlibrary.org/b/id/7423191-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL17344524W",
    description: null
  },
  {
    title: "The 21 Irrefutable Laws of Leadership",
    author: "John C. Maxwell",
    growth_path: "PP",
    sequence_order: 12,
    page_count: 336,
    cover_image_url: "https://covers.openlibrary.org/b/id/1465659-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL28124W",
    description: null
  },
  {
    title: "Dream Big",
    author: "Bob Goff",
    growth_path: "PP",
    sequence_order: 13,
    page_count: 256,
    cover_image_url: "https://covers.openlibrary.org/b/id/10223476-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL20892056W",
    description: null
  },
  {
    title: "Undaunted",
    author: "Christine Caine",
    growth_path: "PP",
    sequence_order: 14,
    page_count: 240,
    cover_image_url: "https://covers.openlibrary.org/b/id/7352823-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL16664249W",
    description: null
  },
  {
    title: "Chase the Lion",
    author: "Mark Batterson",
    growth_path: "PP",
    sequence_order: 15,
    page_count: 224,
    cover_image_url: "https://covers.openlibrary.org/b/id/12051700-L.jpg",
    retailer_url: "https://openlibrary.org/works/OL25817425W",
    description: null
  }
];
