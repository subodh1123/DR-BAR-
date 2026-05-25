import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserSubscription, Review } from '../types';
import { productsList, bundleOffers } from '../data/products';
import { defaultReviewsList } from '../data/staticData';

interface ShopContextType {
  activePage: string;
  selectedProductId: string;
  selectedBlogId: string | null;
  cart: CartItem[];
  wishlist: string[];
  promoCode: string;
  discountPercent: number;
  promoError: string | null;
  userProfile: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    city: string;
    zipCode: string;
    country: string;
    orderHistory: Order[];
    activeSubscriptions: UserSubscription[];
  };
  reviews: Review[];
  showEmailPopup: boolean;
  setShowEmailPopup: (val: boolean) => void;
  showExitIntentPopup: boolean;
  setShowExitIntentPopup: (val: boolean) => void;
  emailSubmitted: boolean;
  setEmailSubmitted: (val: boolean) => void;
  contactSuccess: boolean;
  setContactSuccess: (val: boolean) => void;
  
  // Navigation & Actions
  navigateTo: (page: string, params?: { productId?: string; blogId?: string }) => void;
  addToCart: (product: Product, quantity: number, isSubscription: boolean, interval?: 'monthly' | 'biweekly' | 'weekly') => void;
  addBundleToCart: (bundleId: string, quantity: number, isSubscription: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, quantity: number) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  toggleWishlist: (productId: string) => void;
  checkout: (shippingInfo: any, paymentInfo: any) => Order | null;
  addNewReview: (productId: string, rating: number, title: string, comment: string, name: string) => void;
  cancelUserSubscription: (subId: string) => void;
  pauseUserSubscription: (subId: string) => void;
  resumeUserSubscription: (subId: string) => void;
  submitContactForm: (name: string, email: string, message: string) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page states
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('peanut-butter-caramel-salt');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dr_bar_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('dr_bar_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Promo Codes
  const [promoCode, setPromoCode] = useState<string>(() => {
    return localStorage.getItem('dr_bar_promo') || '';
  });
  const [discountPercent, setDiscountPercent] = useState<number>(() => {
    return Number(localStorage.getItem('dr_bar_discount') || '0');
  });
  const [promoError, setPromoError] = useState<string | null>(null);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('dr_bar_reviews');
    return saved ? JSON.parse(saved) : defaultReviewsList;
  });

  // Popups & Newsletter
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showExitIntentPopup, setShowExitIntentPopup] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(() => {
    return localStorage.getItem('dr_bar_subscribed') === 'true';
  });

  const [contactSuccess, setContactSuccess] = useState(false);

  // User Profile, orders, & subscriptions
  const [userProfile, setUserProfile] = useState(() => {
    const defaultProfile = {
      fullName: "Subodh Khadka",
      email: "subodhkhadka36@gmail.com",
      phone: "+1 (555) 345-6789",
      addressLine1: "124 Fitness Ridge Suite 4A",
      city: "Boulder",
      zipCode: "80301",
      country: "United States",
      orderHistory: [
        {
          id: "ORD-94821",
          date: "2026-04-12",
          items: [
            {
              productName: "Peanut Butter Caramel Salt",
              flavor: "Peanut Butter, Salted Caramel & Roasted Almonds",
              quantity: 2,
              price: 38.00,
              isSubscription: false
            }
          ],
          subtotal: 76.00,
          shipping: 0,
          tax: 5.32,
          discount: 0,
          total: 81.32,
          status: 'Delivered' as const,
          trackingNumber: "DRBAR-830219482",
          shippingAddress: {
            fullName: "Subodh Khadka",
            addressLine1: "124 Fitness Ridge Suite 4A",
            city: "Boulder",
            zipCode: "80301",
            country: "United States"
          }
        }
      ],
      activeSubscriptions: [] as UserSubscription[]
    };
    
    const saved = localStorage.getItem('dr_bar_user_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  // Synchronizers
  useEffect(() => {
    localStorage.setItem('dr_bar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dr_bar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('dr_bar_promo', promoCode);
    localStorage.setItem('dr_bar_discount', String(discountPercent));
  }, [promoCode, discountPercent]);

  useEffect(() => {
    localStorage.setItem('dr_bar_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('dr_bar_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Show exit-intent overlay after a tiny mouseout event from viewport top
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      const shownExit = sessionStorage.getItem('dr_bar_exit_shown');
      if (e.clientY < 20 && !shownExit && !emailSubmitted) {
        setShowExitIntentPopup(true);
        sessionStorage.setItem('dr_bar_exit_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Lazy trigger email capture after 8 seconds
    const timer = setTimeout(() => {
      const shownEmail = sessionStorage.getItem('dr_bar_email_shown');
      if (!shownEmail && !emailSubmitted) {
        setShowEmailPopup(true);
        sessionStorage.setItem('dr_bar_email_shown', 'true');
      }
    }, 8000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [emailSubmitted]);

  // Navigation controller
  const navigateTo = (page: string, params?: { productId?: string; blogId?: string }) => {
    setActivePage(page);
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.blogId) {
      setSelectedBlogId(params.blogId);
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number,
    isSubscription: boolean,
    interval: 'monthly' | 'biweekly' | 'weekly' = 'monthly'
  ) => {
    const cartItemId = `${product.id}-${isSubscription ? interval : 'once'}`;
    
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          quantity,
          isSubscription,
          subscriptionInterval: interval
        }
      ];
    });
  };

  const addBundleToCart = (bundleId: string, quantity: number, isSubscription: boolean) => {
    const bundle = bundleOffers.find(b => b.id === bundleId);
    if (!bundle) return;

    // Create a virtual product representing the bundle for e-commerce rendering
    const dummyProduct: Product = {
      id: bundle.id,
      name: bundle.name,
      flavor: bundle.customDescription,
      tagline: "Ultra Fitness Value Combo Pack",
      price: bundle.price,
      subscriptionPrice: bundle.price * 0.85, // Bundle gets double loyalty
      rating: 5.0,
      reviewsCount: 382,
      description: bundle.description,
      nutritionalFacts: { calories: 190, protein: 21, carbs: 4, fat: 5, sugar: 1, fiber: 9 },
      benefits: [{ title: "Covers All Flavors", description: "Experience premium options in one bundle" }],
      ingredients: ["Multiple ingredients listed on box headers"],
      color: "bg-lime-500/10 border-lime-500/30",
      accentColor: "text-lime-400 border-lime-400",
      badgeColor: "#84cc16",
      image: "/src/assets/images/dr_bar_hero_1779685408998.png",
      stock: 99
    };

    addToCart(dummyProduct, quantity, isSubscription, 'monthly');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQty = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Promo Codes System
  const applyPromoCode = (code: string) => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'SMARTFIT') {
      setPromoCode(formatted);
      setDiscountPercent(15);
      setPromoError(null);
      return true;
    } else if (formatted === 'DRGOLD') {
      setPromoCode(formatted);
      setDiscountPercent(25);
      setPromoError(null);
      return true;
    } else if (formatted === 'FREESHIP') {
      setPromoCode(formatted);
      // handled dynamically in pricing
      setPromoError(null);
      return true;
    } else {
      setPromoError("Invalid promo code. Try 'SMARTFIT' (15% off) or 'DRGOLD' (25% off)!");
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setPromoError(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Checkout Execution
  const checkout = (shippingInfo: any, paymentInfo: any) => {
    if (cart.length === 0) return null;

    // Calculations
    const subtotal = cart.reduce((acc, item) => {
      const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
      return acc + price * item.quantity;
    }, 0);
    const discount = subtotal * (discountPercent / 100);
    const shipping = subtotal - discount >= 60 || promoCode === 'FREESHIP' ? 0 : 5.99;
    const tax = (subtotal - discount) * 0.07;
    const total = subtotal - discount + shipping + tax;

    // Create unique order
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({
        productName: item.product.name,
        flavor: item.product.flavor,
        quantity: item.quantity,
        price: item.isSubscription ? item.product.subscriptionPrice : item.product.price,
        isSubscription: item.isSubscription
      })),
      subtotal,
      shipping,
      tax,
      discount,
      total,
      status: 'Processing',
      trackingNumber: `DRBAR-${Math.floor(100000000 + Math.random() * 900000000)}`,
      shippingAddress: {
        fullName: shippingInfo.fullName || userProfile.fullName,
        addressLine1: shippingInfo.addressLine1 || userProfile.addressLine1,
        city: shippingInfo.city || userProfile.city,
        zipCode: shippingInfo.zipCode || userProfile.zipCode,
        country: shippingInfo.country || userProfile.country
      }
    };

    // Grab new subscriptions to create
    const newSubs: UserSubscription[] = cart
      .filter(item => item.isSubscription)
      .map(item => {
        const nextDate = new Date();
        if (item.subscriptionInterval === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
        else if (item.subscriptionInterval === 'biweekly') nextDate.setDate(nextDate.getDate() + 14);
        else nextDate.setMonth(nextDate.getMonth() + 1);

        return {
          id: `SUB-${Math.floor(10000 + Math.random() * 90000)}`,
          product: item.product,
          interval: item.subscriptionInterval,
          nextDelivery: nextDate.toISOString().split('T')[0],
          status: 'Active' as const,
          price: item.product.subscriptionPrice,
          quantity: item.quantity
        };
      });

    // Update profile in state and localStorage
    setUserProfile((prev: any) => {
      return {
        ...prev,
        fullName: shippingInfo.fullName || prev.fullName,
        addressLine1: shippingInfo.addressLine1 || prev.addressLine1,
        city: shippingInfo.city || prev.city,
        zipCode: shippingInfo.zipCode || prev.zipCode,
        orderHistory: [newOrder, ...prev.orderHistory],
        activeSubscriptions: [...newSubs, ...prev.activeSubscriptions]
      };
    });

    // Clear cart
    setCart([]);
    removePromoCode();
    
    // Route to Account
    navigateTo('account');
    return newOrder;
  };

  // Reviews System
  const addNewReview = (productId: string, rating: number, title: string, comment: string, name: string) => {
    const product = productsList.find(p => p.id === productId);
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name || "Anonymous Athlete",
      rating,
      title,
      comment,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verified: true,
      flavor: product ? product.name : "Core Blend",
      likes: 0
    };

    setReviews(prev => [newReview, ...prev]);
  };

  // Subscription management inside dashboard
  const cancelUserSubscription = (subId: string) => {
    setUserProfile((prev: any) => ({
      ...prev,
      activeSubscriptions: prev.activeSubscriptions.map((sub: any) => 
        sub.id === subId ? { ...sub, status: 'Cancelled' } : sub
      )
    }));
  };

  const pauseUserSubscription = (subId: string) => {
    setUserProfile((prev: any) => ({
      ...prev,
      activeSubscriptions: prev.activeSubscriptions.map((sub: any) => 
        sub.id === subId ? { ...sub, status: 'Paused' } : sub
      )
    }));
  };

  const resumeUserSubscription = (subId: string) => {
    setUserProfile((prev: any) => ({
      ...prev,
      activeSubscriptions: prev.activeSubscriptions.map((sub: any) => 
        sub.id === subId ? { ...sub, status: 'Active' } : sub
      )
    }));
  };

  // Contact Form submit
  const submitContactForm = (name: string, email: string, message: string) => {
    console.log("Mock contact form submitted:", { name, email, message });
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        selectedProductId,
        selectedBlogId,
        cart,
        wishlist,
        promoCode,
        discountPercent,
        promoError,
        userProfile,
        reviews,
        showEmailPopup,
        setShowEmailPopup,
        showExitIntentPopup,
        setShowExitIntentPopup,
        emailSubmitted,
        setEmailSubmitted,
        contactSuccess,
        setContactSuccess,
        navigateTo,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateCartQty,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        checkout,
        addNewReview,
        cancelUserSubscription,
        pauseUserSubscription,
        resumeUserSubscription,
        submitContactForm,
        clearCart
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
