
// ==========================================
// CONFIGURATION BOX
// Edit the values below to update text in the app
// ==========================================

export const CONFIG = {
  // The base URL for your images
  baseImageURL: "https://maddyleescorner.wordpress.com/wp-content/uploads/2025/11",
  
  // App Title & Description
  title: "Welcome, It's Maddy!",
  description: "get to know me real quick, and stay connected via IG or Linkedin, don't forget to leave some stamp at my note book",
  
  // Social Media & External Links
  socialUrls: {
    instagram: "https://www.instagram.com/maddy_da.techie/",
    linkedin: "https://www.linkedin.com/in/maddyl/",
    wordpress: "https://maddyleescorner.wordpress.com"
  },
  
  // Labels for the 5 Main Interactive Icons (shown on hover)
  mainIconLabels: {
    instagram: "Connect as a friend :)?",
    linkedin: "'let's connect'",
    smiley: "who's maddy",
    wordpress: "tmi blog page",
    notebook: "write me sth?"
  },

  // Tooltip text for the Stickers (IDs 1-9)
  // These show up when you click the stickers
  stickerTooltips: {
    1: "I cant believe 1 day i could live without this guy",
    2: "I hate Google analytics because the hard truth it shows",
    3: "Google AI studio sponsor me with this lil app",
    4: "currently working as a marketer of a crypto startup",
    5: "currently working as a marketer of a crypto startup",
    6: "I like coldplay, lana del rey, ngọt band, cá hồi hoang, drake, v-pop 2010s",
    7: "I hate google search console just like google analytics", 
    8: "I like arts & media, i capture good pics",
    9: "python is the only programing language i know, only use for data analysis"
  } as Record<number, string>,

  // Configuration for the Smiley Profile / About Page
  smileyProfile: {
    // Roles updated to Object format for Bubble Orbit
    roles: [
      { emoji: "🎨", text: "Creative Branding" },
      { emoji: "✏️", text: "Content Strategist" },
      { emoji: "🎧", text: "Podcast Host" },
      { emoji: "📈", text: "Tech Marketer" },
      { emoji: "🧩", text: "Product Enthusiast" }
    ],
    tags: [
      "Curious",
      "Creative",
      "Bubbly",
      "Kind",
      "Always Learning",
      "Loves to Yap"
    ],
    hero: {
      headline: "Hi, I’m Maddy.",
      subHeadline: "A part-time tech marketer, brand builder, storyteller, and full-time ADHD.",
      descriptor: "I turn dry features into juicy narrative, create brands people remember and products people talk about."
    },
    // Brands Scroller Section
    brands: {
        title: "Proudly worked and working with these brands and teams",
        logos: [
            { name: "SmartDev", src: "https://smartdev.com/wp-content/uploads/2025/04/SMD-Logo-New-White-Text-scaled.png", darkBg: true, url: "https://smartdev.com/" },
            { name: "ecommert", src: "https://ecommert.ai/wp-content/uploads/2024/10/logo_ecommert_ai.png", url: "https://ecommert.ai/" },
            { name: "BuddyTrading", src: "https://buddytrading.com/blog/assets/svgs/big-logo.svg", url: "https://buddytrading.com/" },
            { name: "FPT", src: "https://fpt.vn/frontend_layout_2025_vibecode/assets/images/logo-ftel.svg", url: "https://fpt.vn/" },
            { name: "Yellow", src: "https://www.yellow.org/images/footer/logo.svg", darkBg: true, url: "https://www.yellow.org/" }
        ]
    },
    // Contribution + Offer Section
    contribution: {
      title: "Đà Nẵng’s tech scene is evolving fast.",
      subText: "And I want to contribute to building something meaningful here.\nIf you’re building a business, product, or startup, I’d love to help.",
      branches: [
        { 
          label: "Make people remember your brand", 
          description: "Brand direction, visual identity, storytelling, creative concepts, brand-first thinking." 
        },
        { 
          label: "Make people like your product with juicy content", 
          description: "Short-form, long-form, podcast, TikTok, scripting, content frameworks, content design." 
        },
        { 
          label: "Define who will love your product and pay for it", 
          description: "Audience insight, positioning, user journeys, acquisition funnels, business strategy." 
        },
        { 
          label: "Build a cool product people talk about", 
          description: "Ideation, prototyping, UX thinking, validation loops, creative direction for product." 
        },
        { 
          label: "Anything on your tech career or something you’re building", 
          description: "Career advice, brainstorming, strategy chats — whatever helps you move forward." 
        }
      ],
      cta: {
        label: "Book a 1-Hour Discussion With Me",
        url: "https://calendar.app.google/vRt7drgL8qbkQY2s5",
        subCopy: "Let’s map out your brand, product, or content direction together"
      }
    }
  }
};
