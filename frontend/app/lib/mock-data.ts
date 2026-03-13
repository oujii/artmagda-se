// Denna fil simulerar datan som senare kommer från Sanity CMS

export const mockEvents = [
  {
    id: "1",
    title: "Kransbindning Workshop",
    date: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 dagar framåt
    image: "/images/event-wreath.jpg", // Placeholder path
    bookingUrl: "https://cal.com/TODO/kransbindning"
  },
  {
    id: "2",
    title: "Föreläsning: Jordhälsa",
    date: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 dagar framåt
    image: "/images/event-soil.jpg",
    bookingUrl: "https://cal.com/TODO/jordhalsa"
  },
  {
    id: "3",
    title: "Gammalt Event (Ska döljas)",
    date: new Date(Date.now() - 86400000).toISOString(), // Igår
    image: "/images/event-old.jpg",
    bookingUrl: "#"
  },
  {
    id: "4",
    title: "Vårmarknad",
    date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 dagar framåt
    image: "/images/event-market.jpg",
    bookingUrl: "https://cal.com/TODO/varmarknad"
  }
];

export const mockProducts = [
  {
    id: "p1",
    title: "Monstera Deliciosa",
    price: 249,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
    stripeUrl: "https://stripe.com/test-checkout/p1"
  },
  {
    id: "p2",
    title: "Terrakottakruka 'Roma'",
    price: 129,
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=800",
    stripeUrl: "https://stripe.com/test-checkout/p2"
  },
  {
    id: "p3",
    title: "Planteringsjord EKO",
    price: 89,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    stripeUrl: "https://stripe.com/test-checkout/p3"
  },
  {
    id: "p4",
    title: "Fikon",
    price: 399,
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800",
    stripeUrl: "https://stripe.com/test-checkout/p4"
  }
];
