export const site = {
  name: "Papa's Woodshop",
  tagline: "Built to gather. Built to last.",
  phoneDisplay: "(914) 282-1270",
  phoneHref: "tel:9142821270",
  smsHref: "sms:9142821270",
  email: "mike.ryan50@gmail.com",
  emailHref: "mailto:mike.ryan50@gmail.com",
  // TODO: replace with Papa's actual Marketplace listing URL
  marketplaceUrl: "https://www.facebook.com/marketplace/",
  location: "Westchester County, NY",
  showPrices: true,
  // Sample quotes only; flip on once real reviews are in
  showTestimonials: false,
};

export const navLinks = [
  ["/tables", "Tables"],
  ["/build", "Build yours"],
  ["/story", "Our Story"],
  ["/pricing", "Pricing & FAQ"],
  ["/contact", "Contact"],
] as const;
