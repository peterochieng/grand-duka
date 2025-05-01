// User role types for the application
export type RetailUserRole = 
  | 'buyer' 
  | 'sole-proprietor' 
  | 'shop-owner' 
  | 'shop-employee';

export type BulkUserRole = 
  | 'trader' 
  | 'broker' 
  | 'producer';

export type AdminRole = 
  | 'super-admin' 
  | 'user-admin' 
  | 'seller-admin' 
  | 'shop-admin' 
  | 'support-admin'
  | 'developer';

export type UserRole = RetailUserRole | BulkUserRole | AdminRole;

// User access type
export type UserAccessType = 
  | 'single' // Single-user account
  | 'multi'; // Multi-user account (for shop owners or bulk traders)

// User status type
export type UserStatus = 
  | 'active' 
  | 'pending' 
  | 'suspended' 
  | 'inactive';

// KYC status
export type KycStatus = 
  | 'not_started' 
  | 'pending' 
  | 'verified' 
  | 'rejected';

// Base user interface
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  kycStatus: KycStatus;
  createdAt: string;
  lastActive?: string;
}

// Interface for retail single user (sole proprietor)
export interface SoleProprietor extends BaseUser {
  role: 'sole-proprietor';
  businessName: string;
  productsCount: number;
  rating?: number;
  accessType: 'single';
}

// Interface for shop owner
export interface ShopOwner extends BaseUser {
  role: 'shop-owner';
  shopId: string;
  shopName: string;
  employeeCount: number;
  productsCount: number;
  accessType: 'multi';
}

// Interface for shop employee
export interface ShopEmployee extends BaseUser {
  role: 'shop-employee';
  shopId: string;
  shopName: string;
  permissions: string[]; // e.g., 'manage-inventory', 'view-orders', etc.
  addedBy: string; // Owner or admin who added this employee
}

// Interface for buyer
export interface Buyer extends BaseUser {
  role: 'buyer';
  wishlistCount?: number;
  purchaseCount?: number;
  accessType: 'single';
}

// Interface for bulk trader
export interface Trader extends BaseUser {
  role: 'trader';
  businessName: string;
  commoditiesCount: number;
  accessType: UserAccessType; // Can be single or multi
  teamMembers?: TeamMember[]; // Only present if accessType is 'multi'
  specialties: string[];
}

// Interface for broker
export interface Broker extends BaseUser {
  role: 'broker';
  businessName: string;
  clientsCount: number;
  dealsCount: number;
  accessType: UserAccessType; // Can be single or multi
  teamMembers?: TeamMember[]; // Only present if accessType is 'multi'
  specialties: string[];
}

// Interface for producer
export interface Producer extends BaseUser {
  role: 'producer';
  businessName: string;
  productsCount: number;
  productionCapacity: string;
  accessType: UserAccessType; // Can be single or multi
  teamMembers?: TeamMember[]; // Only present if accessType is 'multi'
  productTypes: string[];
}

// Admin interfaces
export interface SuperAdmin extends BaseUser {
  role: 'super-admin';
  permissions: string[]; // Full system access
}

export interface UserAdmin extends BaseUser {
  role: 'user-admin';
  permissions: string[]; // User management permissions
}

export interface SellerAdmin extends BaseUser {
  role: 'seller-admin';
  permissions: string[]; // Seller management permissions
}

export interface ShopAdmin extends BaseUser {
  role: 'shop-admin';
  permissions: string[]; // Shop management permissions
}

export interface SupportAdmin extends BaseUser {
  role: 'support-admin';
  permissions: string[]; // Support-related permissions
}

// Team member for multi-user accounts
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string; // e.g., 'Admin', 'Inventory Manager', 'Sales Agent', etc.
  status: 'active' | 'invited' | 'suspended';
  lastActive: string;
  permissions: string[];
}

// Type for any user in the system
export type User = 
  | SoleProprietor 
  | ShopOwner 
  | ShopEmployee 
  | Buyer 
  | Trader 
  | Broker 
  | Producer
  | SuperAdmin
  | UserAdmin
  | SellerAdmin
  | ShopAdmin
  | SupportAdmin;
