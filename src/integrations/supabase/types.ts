export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bids: {
        Row: {
          amount: number
          bidder_id: string
          created_at: string
          currency: string
          id: string
          product_id: string
          seller_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          bidder_id: string
          created_at?: string
          currency?: string
          id?: string
          product_id: string
          seller_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          bidder_id?: string
          created_at?: string
          currency?: string
          id?: string
          product_id?: string
          seller_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      buying_options: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          max_counteroffers: number | null
          option_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          max_counteroffers?: number | null
          option_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          max_counteroffers?: number | null
          option_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          listing_type: string
          price: number
          product_id: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_type: string
          price: number
          product_id: string
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_type?: string
          price?: number
          product_id?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_available_to_sellers: boolean | null
          is_published: boolean | null
          name: string
          parent_id: string | null
          requires_review: boolean | null
          restricted: boolean | null
          template: Json | null
          trading_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_available_to_sellers?: boolean | null
          is_published?: boolean | null
          name: string
          parent_id?: string | null
          requires_review?: boolean | null
          restricted?: boolean | null
          template?: Json | null
          trading_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_available_to_sellers?: boolean | null
          is_published?: boolean | null
          name?: string
          parent_id?: string | null
          requires_review?: boolean | null
          restricted?: boolean | null
          template?: Json | null
          trading_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_requests: {
        Row: {
          created_at: string | null
          description: string | null
          feedback: string | null
          id: string
          name: string
          notify_sellers: boolean | null
          parent_category_id: string | null
          seller_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          feedback?: string | null
          id?: string
          name: string
          notify_sellers?: boolean | null
          parent_category_id?: string | null
          seller_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          feedback?: string | null
          id?: string
          name?: string
          notify_sellers?: boolean | null
          parent_category_id?: string | null
          seller_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_requests_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          buyer_id: string | null
          buyer_image: string | null
          buyer_name: string
          comment: string
          created_at: string
          helpful: number
          id: string
          product_id: string | null
          product_name: string | null
          rating: number
          seller_id: string
          seller_response: string | null
          verified_purchase: boolean
        }
        Insert: {
          buyer_id?: string | null
          buyer_image?: string | null
          buyer_name: string
          comment: string
          created_at?: string
          helpful?: number
          id?: string
          product_id?: string | null
          product_name?: string | null
          rating: number
          seller_id: string
          seller_response?: string | null
          verified_purchase?: boolean
        }
        Update: {
          buyer_id?: string | null
          buyer_image?: string | null
          buyer_name?: string
          comment?: string
          created_at?: string
          helpful?: number
          id?: string
          product_id?: string | null
          product_name?: string | null
          rating?: number
          seller_id?: string
          seller_response?: string | null
          verified_purchase?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "feedback_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_requirements: {
        Row: {
          created_at: string | null
          id: string
          is_required: boolean | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          amount: number
          buyer_id: string
          created_at: string
          currency: string
          expires_at: string
          id: string
          message: string | null
          product_id: string
          seller_id: string
          seller_response: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          buyer_id: string
          created_at?: string
          currency?: string
          expires_at: string
          id?: string
          message?: string | null
          product_id: string
          seller_id: string
          seller_response?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          buyer_id?: string
          created_at?: string
          currency?: string
          expires_at?: string
          id?: string
          message?: string | null
          product_id?: string
          seller_id?: string
          seller_response?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          buyer_id: string
          created_at: string
          currency: string
          delivery_method: string
          id: string
          notes: string | null
          payment_method: string
          payment_status: string
          product_id: string
          seller_id: string
          shipping_address: Json | null
          shipping_fee: number
          status: string
          tax: number
          total_amount: number
          tracking_number: string | null
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          buyer_id: string
          created_at?: string
          currency?: string
          delivery_method?: string
          id?: string
          notes?: string | null
          payment_method: string
          payment_status?: string
          product_id: string
          seller_id: string
          shipping_address?: Json | null
          shipping_fee?: number
          status?: string
          tax?: number
          total_amount: number
          tracking_number?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          buyer_id?: string
          created_at?: string
          currency?: string
          delivery_method?: string
          id?: string
          notes?: string | null
          payment_method?: string
          payment_status?: string
          product_id?: string
          seller_id?: string
          shipping_address?: Json | null
          shipping_fee?: number
          status?: string
          tax?: number
          total_amount?: number
          tracking_number?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          order_id: string
          payer_email: string | null
          payment_method: string
          provider: string
          provider_payment_id: string | null
          receipt_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          order_id: string
          payer_email?: string | null
          payment_method: string
          provider: string
          provider_payment_id?: string | null
          receipt_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          order_id?: string
          payer_email?: string | null
          payment_method?: string
          provider?: string
          provider_payment_id?: string | null
          receipt_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_details: {
        Row: {
          created_at: string
          detail_type: string
          details: Json
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          detail_type: string
          details: Json
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          detail_type?: string
          details?: Json
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          category: string | null
          condition: string | null
          created_at: string
          currency: string
          description: string | null
          featured: boolean
          id: string
          image: string | null
          location: string | null
          price: number
          seller_id: string
          shipping: number
          subcategory: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          category?: string | null
          condition?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          featured?: boolean
          id?: string
          image?: string | null
          location?: string | null
          price: number
          seller_id: string
          shipping?: number
          subcategory?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          category?: string | null
          condition?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          featured?: boolean
          id?: string
          image?: string | null
          location?: string | null
          price?: number
          seller_id?: string
          shipping?: number
          subcategory?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about: string | null
          avatar_url: string | null
          first_name: string | null
          id: string
          kyc_disabled_at: string | null
          kyc_disabled_by: string | null
          kyc_required: boolean | null
          kyc_status: string | null
          last_name: string | null
          location: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          first_name?: string | null
          id: string
          kyc_disabled_at?: string | null
          kyc_disabled_by?: string | null
          kyc_required?: boolean | null
          kyc_status?: string | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          kyc_disabled_at?: string | null
          kyc_disabled_by?: string | null
          kyc_required?: boolean | null
          kyc_status?: string | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sellers: {
        Row: {
          business_name: string
          business_type: string
          created_at: string
          email: string
          id: string
          location: string
          owner_name: string | null
          phone: string | null
          products_count: number
          rating: number
          revenue: number
          status: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          business_name: string
          business_type: string
          created_at?: string
          email: string
          id?: string
          location: string
          owner_name?: string | null
          phone?: string | null
          products_count?: number
          rating?: number
          revenue?: number
          status?: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          business_name?: string
          business_type?: string
          created_at?: string
          email?: string
          id?: string
          location?: string
          owner_name?: string | null
          phone?: string | null
          products_count?: number
          rating?: number
          revenue?: number
          status?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      shop_affiliations: {
        Row: {
          created_at: string | null
          id: string
          permissions: string[] | null
          role: string
          shop_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          permissions?: string[] | null
          role: string
          shop_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: string[] | null
          role?: string
          shop_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_affiliations_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_notifications: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_published: boolean | null
          message: string
          published_at: string | null
          shop_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          message: string
          published_at?: string | null
          shop_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          message?: string
          published_at?: string | null
          shop_id?: string
          title?: string
        }
        Relationships: []
      }
      shop_perk_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          perk_id: string | null
          shop_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          perk_id?: string | null
          shop_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          perk_id?: string | null
          shop_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shop_perk_assignments_perk_id_fkey"
            columns: ["perk_id"]
            isOneToOne: false
            referencedRelation: "shop_perks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_perk_assignments_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_perks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          perk_type: Database["public"]["Enums"]["perk_type"]
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          perk_type: Database["public"]["Enums"]["perk_type"]
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          perk_type?: Database["public"]["Enums"]["perk_type"]
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      shop_subscriptions: {
        Row: {
          created_at: string
          id: string
          shop_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          shop_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          shop_id?: string
          user_id?: string
        }
        Relationships: []
      }
      shops: {
        Row: {
          categories: string[]
          created_at: string
          description: string
          id: string
          image: string
          item_count: number
          location: string
          name: string
          owner_id: string | null
          rating: number
          revenue: number
          status: string
          type: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          categories: string[]
          created_at?: string
          description: string
          id?: string
          image: string
          item_count?: number
          location: string
          name: string
          owner_id?: string | null
          rating?: number
          revenue?: number
          status?: string
          type: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          categories?: string[]
          created_at?: string
          description?: string
          id?: string
          image?: string
          item_count?: number
          location?: string
          name?: string
          owner_id?: string | null
          rating?: number
          revenue?: number
          status?: string
          type?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          is_published: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          delivered_at: string | null
          id: string
          is_read: boolean | null
          notification_id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          delivered_at?: string | null
          id?: string
          is_read?: boolean | null
          notification_id: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          delivered_at?: string | null
          id?: string
          is_read?: boolean | null
          notification_id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "shop_notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          browsing_history: Json | null
          id: string
          last_updated: string | null
          preferred_categories: string[] | null
          preferred_shop_types: string[] | null
          user_id: string
        }
        Insert: {
          browsing_history?: Json | null
          id?: string
          last_updated?: string | null
          preferred_categories?: string[] | null
          preferred_shop_types?: string[] | null
          user_id: string
        }
        Update: {
          browsing_history?: Json | null
          id?: string
          last_updated?: string | null
          preferred_categories?: string[] | null
          preferred_shop_types?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_toggle_all_kyc: {
        Args: { admin_id: string; require_kyc: boolean }
        Returns: boolean
      }
      admin_toggle_user_kyc: {
        Args: { admin_id: string; target_user_id: string; require_kyc: boolean }
        Returns: boolean
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      has_user_role: {
        Args: { user_id: string; role: string }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_shop_member: {
        Args: { user_id: string; shop_id: string }
        Returns: boolean
      }
      migrate_existing_roles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      set_user_role: {
        Args: { admin_id: string; target_user_id: string; new_role: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "buyer"
        | "seller"
        | "sole-proprietor"
        | "shop-owner"
        | "shop-employee"
        | "trader"
        | "broker"
        | "producer"
        | "super-admin"
        | "user-admin"
        | "seller-admin"
        | "shop-admin"
        | "support-admin"
      perk_type:
        | "fee_discount"
        | "visibility_boost"
        | "featured_listing"
        | "priority_support"
        | "extended_listing_duration"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "buyer",
        "seller",
        "sole-proprietor",
        "shop-owner",
        "shop-employee",
        "trader",
        "broker",
        "producer",
        "super-admin",
        "user-admin",
        "seller-admin",
        "shop-admin",
        "support-admin",
      ],
      perk_type: [
        "fee_discount",
        "visibility_boost",
        "featured_listing",
        "priority_support",
        "extended_listing_duration",
      ],
    },
  },
} as const
