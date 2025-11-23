export type LoyaltyTier = string;

export interface LoyaltyTierConfig {
  discountPercent?: number;
  freeShipping?: boolean;
}

export interface LoyaltyConfig {
  tiers?: Record<LoyaltyTier, LoyaltyTierConfig>;
}

export function getLoyaltyTierConfig(
  tier: LoyaltyTier,
  loyaltyConfig: LoyaltyConfig,
): LoyaltyTierConfig | undefined {
  return loyaltyConfig?.tiers?.[tier];
}

export function getLoyaltyDiscount(
  subtotal: number,
  tier: LoyaltyTier,
  loyaltyConfig: LoyaltyConfig,
): number {
  const tierConfig = getLoyaltyTierConfig(tier, loyaltyConfig);
  const discountPercent = tierConfig?.discountPercent ?? 0;

  if (!discountPercent || subtotal <= 0) {
    return 0;
  }

  return (subtotal * discountPercent) / 100;
}

export function hasLoyaltyFreeShipping(
  tier: LoyaltyTier,
  loyaltyConfig: LoyaltyConfig,
): boolean {
  const tierConfig = getLoyaltyTierConfig(tier, loyaltyConfig);
  return Boolean(tierConfig?.freeShipping);
}
