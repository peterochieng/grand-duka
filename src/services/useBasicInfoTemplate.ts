import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type TemplateField = {
    id?: string;
    label: string;
    type: string;
    options?: string;
    required?: boolean;
};

export const useBasicInfoTemplate = (categoryId?: string, subcategoryId?: string) => {
    const [basicInfoTemplate, setBasicInfoTemplate] = useState<TemplateField[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTemplate = async () => {
            setLoading(true);

            let query = supabase
                .from('subcategory_templates' as any)
                .select('basic_info_template')
                .eq('is_active', true);

            if (subcategoryId) {
                query = query.eq('subcategory_id', subcategoryId);
            } else if (categoryId) {
                query = query.eq('category_id', categoryId);
            }

            const { data, error } = await query;
            if (error) {
                console.error('Error fetching basic info template:', error);
                setBasicInfoTemplate(null);
            } else if (data && data.length > 0) {
                // Look for the first row with a non-null basic_info_template.
                const validRow = data.find((row: any) => row.basic_info_template !== null);
                setBasicInfoTemplate(validRow ? validRow.basic_info_template : null);
            } else {
                setBasicInfoTemplate(null);
            }
            setLoading(false);
        };

        fetchTemplate();
    }, [categoryId, subcategoryId]);

    return { basicInfoTemplate, loading };
};