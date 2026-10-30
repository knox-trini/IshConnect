import mongoose from "mongoose";

export const contentTypes = {
  team: {
    collection: "cms_team",
    required: ["slug", "name", "role"],
    fields: ["slug", "name", "role", "bio", "image", "linkedin", "email", "leadership", "socialLinks", "order", "isPublished"],
  },
  testimonials: {
    collection: "cms_testimonials",
    required: ["slug", "name", "role", "org", "quote"],
    fields: ["slug", "name", "role", "org", "orgUrl", "category", "categoryLabel", "image", "initials", "location", "quote", "highlights", "verified", "rating", "order", "isPublished"],
  },
  partners: {
    collection: "cms_partners",
    required: ["slug", "name"],
    fields: ["slug", "name", "href", "channelUrl", "logo", "description", "socialLinks", "order", "isPublished"],
  },
  programs: {
    collection: "cms_programs",
    required: ["slug", "title", "duration", "summary"],
    fields: ["slug", "title", "duration", "summary", "tags", "category", "image", "detailsUrl", "applyUrl", "applicationEnabled", "applicationDeadline", "order", "isPublished"],
  },
  projects: {
    collection: "cms_projects",
    required: ["slug", "title", "category", "description", "heroSummary"],
    fields: ["slug", "title", "category", "description", "tech", "accent", "image", "heroSummary", "client", "problem", "solution", "features", "workflow", "uiDecisions", "challenges", "results", "impact", "stats", "timeline", "faqs", "liveUrl", "repoUrl", "seoTitle", "seoDescription", "seoKeywords", "order", "isPublished"],
  },
  websites: {
    collection: "cms_websites",
    required: ["slug", "name", "href"],
    fields: ["slug", "name", "href", "description", "image", "isFeatured", "order", "isPublished"],
  },
  settings: {
    collection: "cms_site_settings",
    required: ["slug"],
    fields: [
      "slug",
      "footerDescription",
      "copyrightText",
      "contactEmail",
      "contactPhone",
      "contactAddress",
      "socialLinks",
      "footerLinks",
      "applicationLinks",
      "heroBadge",
      "heroTitle",
      "heroHighlight",
      "heroDescription",
      "heroPrimaryLabel",
      "heroPrimaryUrl",
      "heroSecondaryLabel",
      "heroSecondaryUrl",
      "aboutTitle",
      "aboutHighlight",
      "aboutDescription",
      "aboutPageTitle",
      "aboutPageDescription",
      "missionTitle",
      "missionDescription",
      "missionDescriptionSecondary",
      "bootcampTitle",
      "bootcampHighlight",
      "bootcampDescription",
      "bootcampKickoffText",
      "bootcampStartDate",
      "bootcampFormat",
      "bootcampRegisterUrl",
      "bootcampWhatsappUrl",
      "bootcampInstagramUrl",
      "stats",
      "timeline",
      "faqs",
      "order",
      "isPublished",
    ],
  },
};

const contentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, trim: true, maxlength: 120 },
    order: { type: Number, default: 0, min: 0, max: 100000 },
    isPublished: { type: Boolean, default: false },
    data: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true, versionKey: "version", optimisticConcurrency: true },
);

contentSchema.index({ slug: 1 }, { unique: true, name: "unique_slug" });
contentSchema.index({ isPublished: 1, order: 1, slug: 1 });

export const contentModels = Object.fromEntries(
  Object.entries(contentTypes).map(([type, config]) => {
    const modelName = "Cms" + type[0].toUpperCase() + type.slice(1);
    const model = mongoose.models[modelName] || mongoose.model(modelName, contentSchema.clone(), config.collection);
    return [type, model];
  }),
);


