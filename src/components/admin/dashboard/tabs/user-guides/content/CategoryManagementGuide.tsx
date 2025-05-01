
import { InteractiveGuideModule } from './InteractiveGuideModule';

export const CategoryManagementGuide = () => {
  return (
    <div className="space-y-6">
      <h2 id="category-management" className="text-2xl font-bold">Category Management Guide</h2>
      <p className="text-base">This guide covers everything you need to know about organizing and managing marketplace categories and subcategories effectively.</p>
      
      <h3 id="category-structure" className="text-xl font-semibold mt-6">1. Category Structure</h3>
      <p className="text-base">GrandDuka uses a two-level category structure:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li><strong>Main Categories:</strong> Top-level groupings (e.g., Electronics, Fashion)</li>
        <li><strong>Subcategories:</strong> Specific product types within main categories</li>
      </ul>
      <div className="border-l-4 border-blue-400 pl-4 my-4 bg-blue-50 p-3 rounded">
        <p className="text-sm font-medium text-blue-900">Important Note</p>
        <p className="text-sm text-blue-800">All products must belong to a subcategory, not just a main category. This ensures proper organization and searchability.</p>
      </div>
      
      <h3 id="creating-categories" className="text-xl font-semibold mt-6">2. Creating Categories</h3>
      <p className="text-base">To create a new category:</p>
      
      <InteractiveGuideModule title="Creating a New Category">
        <ol className="list-decimal ml-6 mt-2 space-y-3">
          <li>Navigate to the <mark className="bg-yellow-100 px-1">Categories tab</mark> in the admin dashboard</li>
          <li>Click the <mark className="bg-yellow-100 px-1">Add Category</mark> button in the top right corner</li>
          <li>Fill in the following required information:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Category Name:</strong> A clear, descriptive name (e.g., "Electronics", "Fashion")</li>
              <li><strong>Display Order:</strong> Numeric value determining the order in which categories appear (lower numbers appear first)</li>
              <li><strong>Restriction Setting:</strong> Toggle switch to mark a category as restricted (requiring product approval)</li>
            </ul>
          </li>
          <li>To make the category visible to users, set the <mark className="bg-green-100 px-1">Published</mark> toggle switch to true</li>
          <li>Click <mark className="bg-yellow-100 px-1">Create Category</mark> to save</li>
        </ol>
        <div className="mt-4 border rounded p-3 bg-gray-50">
          <p className="text-sm font-medium">Visual Reference: Category Form</p>
          <img src="/lovable-uploads/0b777aba-cae6-43c6-9213-09489b620e68.png" alt="Category Management Interface" className="mt-2 rounded-md border shadow-sm w-full max-w-md mx-auto" />
        </div>
      </InteractiveGuideModule>
      
      <h3 id="managing-subcategories" className="text-xl font-semibold mt-6">3. Managing Subcategories</h3>
      <p className="text-base">For each main category, you can manage a set of subcategories:</p>
      
      <InteractiveGuideModule title="Subcategory Management Process">
        <ol className="list-decimal ml-6 mt-2 space-y-3">
          <li>Select a main category from the category list</li>
          <li>Click the <mark className="bg-yellow-100 px-1">Manage Subcategories</mark> button that appears</li>
          <li>Use the <mark className="bg-yellow-100 px-1">Add Subcategory</mark> button to create new subcategories</li>
          <li>Configure subcategory details:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Subcategory Name:</strong> Specific descriptive name (e.g., "Smartphones" under "Electronics")</li>
              <li><strong>Published Status:</strong> Toggle to control visibility</li>
            </ul>
          </li>
          <li>Click <mark className="bg-yellow-100 px-1">Create Subcategory</mark> to save</li>
        </ol>
        
        <div className="mt-4">
          <p className="font-medium text-gray-700">Important Visibility Rules:</p>
          <div className="border-l-4 border-amber-400 pl-4 my-3 bg-amber-50 p-3 rounded">
            <p className="text-sm"><strong>Parent Category Visibility Impact:</strong> If a parent category's <mark className="bg-yellow-100 px-1">Published</mark> toggle is set to false:</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>The category and ALL its subcategories will be hidden from users</li>
              <li>Subcategory visibility settings are ignored when the parent is hidden</li>
              <li>Products in these subcategories will not appear in search results</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 flex gap-4 border rounded p-3 bg-gray-50">
          <div className="flex-1">
            <p className="text-sm font-medium">Published Parent Category (✓)</p>
            <div className="border rounded mt-2 p-2 bg-white">
              <div className="text-xs text-green-700 flex items-center gap-1 mb-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> Visible to users
              </div>
              <p className="text-xs">Subcategories with "Published = true" will be visible</p>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Unpublished Parent Category (✗)</p>
            <div className="border rounded mt-2 p-2 bg-white">
              <div className="text-xs text-red-700 flex items-center gap-1 mb-1">
                <span className="h-2 w-2 rounded-full bg-red-500"></span> Hidden from users
              </div>
              <p className="text-xs">All subcategories will be hidden regardless of their published status</p>
            </div>
          </div>
        </div>
      </InteractiveGuideModule>
      
      <h3 id="category-attributes" className="text-xl font-semibold mt-6">4. Category Attributes</h3>
      <p className="text-base">Each category and subcategory can have specific attributes that control how products are listed and displayed:</p>
      
      <InteractiveGuideModule title="Setting Up Category Attributes">
        <ul className="list-disc ml-6 mt-2 space-y-3">
          <li>
            <strong>Required Fields:</strong> Information sellers must provide when listing products
            <div className="ml-6 mt-1 text-sm text-gray-600">
              Examples: dimensions for furniture, technical specifications for electronics
            </div>
          </li>
          <li>
            <strong>Optional Fields:</strong> Additional information that enhances product listings
            <div className="ml-6 mt-1 text-sm text-gray-600">
              Examples: manufacturing dates, special features, certifications
            </div>
          </li>
          <li>
            <strong>Filtering Attributes:</strong> Attributes that buyers can use to filter products when shopping
            <div className="ml-6 mt-1 text-sm text-gray-600">
              To add a filtering attribute:
              <ol className="list-decimal ml-6 mt-1">
                <li>Go to the category's attribute settings</li>
                <li>Add a new attribute and check the "Enable as filter" option</li>
                <li>Specify the attribute type (dropdown, range, checkbox, etc.)</li>
              </ol>
            </div>
          </li>
        </ul>
      </InteractiveGuideModule>
      
      <h3 id="category-restrictions" className="text-xl font-semibold mt-6">5. Category Restrictions</h3>
      <p className="text-base">You can set restrictions on categories to ensure quality control:</p>
      
      <InteractiveGuideModule title="Managing Category Restrictions">
        <div className="space-y-4">
          <div>
            <strong className="text-gray-800">Restricted Categories</strong>
            <p className="text-sm mt-1">Products in restricted categories require admin approval before they appear on the marketplace.</p>
            <div className="bg-gray-50 p-2 rounded mt-2 text-sm border">
              <strong>How to restrict a category:</strong>
              <ol className="list-decimal ml-6 mt-1">
                <li>Select the category in the categories list</li>
                <li>Click "Edit" or toggle the "Restricted" switch</li>
                <li>Save your changes</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t pt-3">
            <strong className="text-gray-800">Restriction Effects</strong>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>Products submitted to restricted categories enter a review queue</li>
              <li>Admins receive notifications for new products awaiting approval</li>
              <li>Products remain invisible to buyers until explicitly approved</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-3 rounded border mt-3">
            <p className="text-sm font-medium">Best practice:</p>
            <p className="text-sm">Use restrictions for categories containing high-value items, regulated products, or categories prone to policy violations.</p>
          </div>
        </div>
      </InteractiveGuideModule>
      
      <h3 id="category-analytics" className="text-xl font-semibold mt-6">6. Category Analytics</h3>
      <p className="text-base">Monitor category performance using built-in analytics:</p>
      
      <InteractiveGuideModule title="Accessing Category Analytics">
        <div className="space-y-3">
          <p>To view analytics for a specific category:</p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Go to the <mark className="bg-yellow-100 px-1">Data Analytics</mark> tab in your admin dashboard</li>
            <li>Select <mark className="bg-yellow-100 px-1">Category Analysis</mark> from the available reports</li>
            <li>Choose the specific category you want to analyze</li>
            <li>Set your desired date range</li>
          </ol>
          
          <p className="mt-3">Key metrics available for each category:</p>
          <ul className="list-disc ml-6 mt-1 grid grid-cols-2 gap-x-4 gap-y-2">
            <li>Total product count</li>
            <li>Category page views</li>
            <li>Conversion rate</li>
            <li>Average revenue per product</li>
            <li>Top-selling subcategories</li>
            <li>Traffic source analysis</li>
          </ul>
          
          <div className="bg-blue-50 p-3 rounded mt-3 text-sm">
            <p className="font-medium">Pro Tip:</p>
            <p>Compare performance across categories to identify which types of products are most popular with your user base, and use this information to guide marketplace growth strategies.</p>
          </div>
        </div>
      </InteractiveGuideModule>
      
      <h3 id="category-optimization" className="text-xl font-semibold mt-6">7. Category Optimization</h3>
      <p className="text-base">Best practices for optimizing your category structure:</p>
      
      <InteractiveGuideModule title="Category Structure Best Practices">
        <ul className="list-disc ml-6 mt-2 space-y-3">
          <li>
            <strong>Regular Review:</strong> Audit your category structure quarterly
            <div className="ml-6 mt-1 text-sm text-gray-600">
              Look for categories with few products (may need consolidation) or those with too many (may need subdivision)
            </div>
          </li>
          <li>
            <strong>SEO Optimization:</strong> Use relevant keywords in category names and descriptions
            <div className="ml-6 mt-1 text-sm text-gray-600">
              Example: "Wireless Bluetooth Headphones" rather than just "Headphones"
            </div>
          </li>
          <li>
            <strong>User-Centric Organization:</strong> Organize based on how users search and browse
            <div className="ml-6 mt-1 text-sm text-gray-600">
              Review search analytics to identify common user terminology and categorization expectations
            </div>
          </li>
        </ul>
        
        <div className="bg-gray-50 p-3 rounded mt-4 border">
          <p className="font-medium">Category Health Checklist:</p>
          <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
            <li>No category is too broad or too narrow</li>
            <li>Category names are clear and descriptive</li>
            <li>Similar products are grouped together</li>
            <li>Navigation is intuitive and consistent</li>
            <li>Category hierarchy is no more than 3 levels deep</li>
          </ul>
        </div>
      </InteractiveGuideModule>
      
      <h3 id="troubleshooting" className="text-xl font-semibold mt-6">8. Troubleshooting Common Issues</h3>
      
      <InteractiveGuideModule title="Common Category Management Issues">
        <div className="space-y-4">
          <div className="border p-3 rounded bg-gray-50">
            <p className="font-medium">Issue: Categories not appearing for users</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>Verify the category's <strong>Published</strong> status is set to true</li>
              <li>Check if the parent category (if applicable) is also published</li>
              <li>Confirm the category has at least one published subcategory</li>
              <li>Check for any active content restrictions that might be affecting visibility</li>
            </ul>
          </div>
          
          <div className="border p-3 rounded bg-gray-50">
            <p className="font-medium">Issue: Products not appearing in their category</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>Verify the product is assigned to the correct subcategory</li>
              <li>Check the product's publication status</li>
              <li>For restricted categories, confirm the product has been approved</li>
              <li>Verify the product hasn't expired or been automatically delisted</li>
            </ul>
          </div>
          
          <div className="border p-3 rounded bg-gray-50">
            <p className="font-medium">Issue: Unable to delete a category</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              <li>Categories with existing products cannot be deleted</li>
              <li>Move or delete all products in the category first</li>
              <li>Remove all subcategories before attempting to delete the parent category</li>
              <li>Consider unpublishing rather than deleting if historical data needs to be preserved</li>
            </ul>
          </div>
        </div>
      </InteractiveGuideModule>
      
      <h3 id="version-information" className="text-xl font-semibold mt-6">9. Version Information</h3>
      <p className="text-base">This guide applies to GrandDuka Category Management Module v2.3.1</p>
      <p className="text-base">Last updated: March 2025</p>
    </div>
  );
};
