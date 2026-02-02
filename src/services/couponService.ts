export interface Coupon {
 id: number;
 code: string;
 description: string;
 discountType: 'percentage' | 'fixed';
 discountValue: number;
 minPurchaseAmount: number;
 maxUses?: number;
 currentUses: number;
 validFrom: string;
 validUntil: string;
 isActive: boolean;
 createdAt: string;
 updatedAt: string;
}

export interface CouponValidation {
 isValid: boolean;
 message: string;
 discount?: number;
 coupon?: Coupon;
}

export interface CreateCouponData {
 code: string;
 description: string;
 discountType: 'percentage' | 'fixed';
 discountValue: number;
 minPurchaseAmount?: number;
 maxUses?: number;
 validFrom: string;
 validUntil: string;
}

const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to get auth headers
function getAuthHeaders() {
 const token =
  localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
 console.log('🔍 Debug Token:', {
  localStorage: localStorage.getItem('auth-token'),
  sessionStorage: sessionStorage.getItem('auth-token'),
  finalToken: token,
 });
 return {
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
 };
}

export const couponService = {
 // Validate coupon code
 async validateCoupon(
  code: string,
  totalAmount: number,
 ): Promise<CouponValidation> {
  try {
   const headers = getAuthHeaders();
   console.log('🚀 Sending coupon validation:', { code, totalAmount, headers });

   const response = await fetch(`${API_BASE_URL}/coupons/validate`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ code, totalAmount }),
   });

   console.log('📥 Response status:', response.status, response.statusText);
   const data = await response.json();
   console.log('📥 Response data:', data);

   if (!response.ok) {
    return {
     isValid: false,
     message: data.message || 'Invalid coupon code',
    };
   }

   return {
    isValid: true,
    message: 'Coupon applied successfully',
    discount: data.discount,
    coupon: data.coupon,
   };
  } catch (error) {
   console.error('Error validating coupon:', error);
   return {
    isValid: false,
    message: 'Failed to validate coupon',
   };
  }
 },

 // Get all coupons (admin only)
 async getAllCoupons(): Promise<Coupon[]> {
  try {
   const response = await fetch(`${API_BASE_URL}/admin/coupons`, {
    headers: getAuthHeaders(),
    credentials: 'include',
   });

   if (!response.ok) {
    throw new Error('Failed to fetch coupons');
   }

   return await response.json();
  } catch (error) {
   console.error('Error fetching coupons:', error);
   throw error;
  }
 },

 // Create new coupon (admin only)
 async createCoupon(couponData: CreateCouponData): Promise<Coupon> {
  try {
   const response = await fetch(`${API_BASE_URL}/admin/coupons`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(couponData),
   });

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create coupon');
   }

   return await response.json();
  } catch (error) {
   console.error('Error creating coupon:', error);
   throw error;
  }
 },

 // Update coupon (admin only)
 async updateCoupon(
  id: number,
  couponData: Partial<CreateCouponData>,
 ): Promise<Coupon> {
  try {
   const response = await fetch(`${API_BASE_URL}/admin/coupons/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(couponData),
   });

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update coupon');
   }

   return await response.json();
  } catch (error) {
   console.error('Error updating coupon:', error);
   throw error;
  }
 },

 // Delete coupon (admin only)
 async deleteCoupon(id: number): Promise<void> {
  try {
   const response = await fetch(`${API_BASE_URL}/admin/coupons/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include',
   });

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete coupon');
   }
  } catch (error) {
   console.error('Error deleting coupon:', error);
   throw error;
  }
 },

 // Toggle coupon active status (admin only)
 async toggleCouponStatus(id: number): Promise<Coupon> {
  try {
   const response = await fetch(`${API_BASE_URL}/admin/coupons/${id}/toggle`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    credentials: 'include',
   });

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to toggle coupon status');
   }

   return await response.json();
  } catch (error) {
   console.error('Error toggling coupon status:', error);
   throw error;
  }
 },

 // Calculate discount amount
 calculateDiscount(coupon: Coupon, totalAmount: number): number {
  if (coupon.discountType === 'percentage') {
   return Math.min((totalAmount * coupon.discountValue) / 100, totalAmount);
  } else {
   return Math.min(coupon.discountValue, totalAmount);
  }
 },
};
