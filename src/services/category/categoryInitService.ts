import { supabase } from '@/integrations/supabase/client';
import { addSubcategoriesToCategory } from './categoryService';

/**
 * Initializes the database with default categories and subcategories
 */
export const initializeDefaultCategories = async (): Promise<boolean> => {
  try {
    // Check if categories already exist
    const { count: categoryCount, error: countError } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking category count:', countError);
      return false;
    }
    
    // If categories already exist, no need to create defaults
    if (categoryCount && categoryCount > 0) {
      console.log('Categories already exist, skipping default initialization');
      return true;
    }
    
    // Define default categories
    const defaultCategories = [
      {
        name: 'Electronics',
        description: 'All electronics products',
        is_published: true,
        restricted: false,
        trading_type: 'retail',
        icon: 'DeviceDesktop'
      },
      {
        name: 'Fashion',
        description: 'All fashion products',
        is_published: true,
        restricted: false,
        trading_type: 'retail',
        icon: 'Shirt'
      },
      {
        name: 'Home & Garden',
        description: 'All home and garden products',
        is_published: true,
        restricted: false,
        trading_type: 'retail',
        icon: 'Sofa'
      },
      {
        name: 'Sports & Outdoors',
        description: 'All sports and outdoor products',
        is_published: true,
        restricted: false,
        trading_type: 'retail',
        icon: 'Dumbbell'
      },
      {
        name: 'Vehicles',
        description: 'All vehicle products',
        is_published: true,
        restricted: false,
        trading_type: 'retail',
        icon: 'Car'
      },
      {
        name: 'Business Supplies',
        description: 'All business supply products',
        is_published: true,
        restricted: false,
        trading_type: 'wholesale',
        icon: 'Briefcase'
      }
    ];
    
    // Create categories
    for (const category of defaultCategories) {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select();
      
      if (error) {
        console.error(`Error creating category ${category.name}:`, error);
        continue;
      }
      
      const categoryId = data[0].id;
      
      // Create some example subcategories
      const subcats = ['Popular', 'New Arrivals', 'Premium', 'Sale'];
      
      for (const subName of subcats) {
        const { error: subcatError } = await supabase
          .from('subcategories')
          .insert({
            name: `${subName} ${category.name}`,
            category_id: categoryId,
            is_published: true
          });
        
        if (subcatError) {
          console.error(`Error creating subcategory ${subName} for ${category.name}:`, subcatError);
        }
      }
    }
    
    return true;
  } catch (err) {
    console.error('Error initializing default categories:', err);
    return false;
  }
};

/**
 * Adds the missing subcategories for Baby Essentials, Antiques, and Books Movies & Music
 */
export const initializeSpecificSubcategories = async (): Promise<{
  babyEssentials: boolean;
  antiques: boolean;
  booksMoviesMusic: boolean;
}> => {
  try {
    const results = {
      babyEssentials: false,
      antiques: false,
      booksMoviesMusic: false
    };

    // Find the Baby Essentials category
    const { data: babyCategory, error: babyError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Baby Essentials')
      .single();
    
    if (babyError) {
      console.error('Error finding Baby Essentials category:', babyError);
    } else if (babyCategory) {
      // Baby Essentials subcategories
      const babySubcategories = [
        'Baby Clothing',
        'Baby Safety',
        'Diapers & Potty Training',
        'Feeding',
        'Nursery Furniture',
        'Strollers & Car Seats',
        'Toys & Activities'
      ];
      
      results.babyEssentials = await addSubcategoriesToCategory(babyCategory.id, babySubcategories, true);
    }

    // Find the Antiques category
    const { data: antiquesCategory, error: antiquesError } = await supabase
      .from('categories')
      .select('id, is_published')
      .eq('name', 'Antiques')
      .single();
    
    if (antiquesError) {
      console.error('Error finding Antiques category:', antiquesError);
    } else if (antiquesCategory) {
      // Antiques subcategories
      const antiquesSubcategories = [
        'Ceramics & Glass',
        'Decorative Arts',
        'Furniture',
        'Maps & Prints',
        'Silver & Metal',
        'Textiles & Rugs'
      ];
      
      // Use the parent category's published state
      results.antiques = await addSubcategoriesToCategory(
        antiquesCategory.id, 
        antiquesSubcategories, 
        antiquesCategory.is_published
      );
    }

    // Find the Books, Movies & Music category
    const { data: mediaCategory, error: mediaError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Books, Movies & Music')
      .single();
    
    if (mediaError) {
      console.error('Error finding Books, Movies & Music category:', mediaError);
    } else if (mediaCategory) {
      // Books, Movies & Music subcategories
      const mediaSubcategories = [
        'Audiobooks',
        'Books',
        'Magazines',
        'Movies & TV Shows',
        'Music CDs',
        'Vinyl Records'
      ];
      
      results.booksMoviesMusic = await addSubcategoriesToCategory(mediaCategory.id, mediaSubcategories, true);
    }

    console.log('Subcategory initialization results:', results);
    return results;
  } catch (err) {
    console.error('Error initializing specific subcategories:', err);
    return {
      babyEssentials: false,
      antiques: false,
      booksMoviesMusic: false
    };
  }
};
