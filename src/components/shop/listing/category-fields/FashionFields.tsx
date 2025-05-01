
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Baby, ShoppingBag, Shirt, Scissors, User, UserPlus, UserRound } from "lucide-react";

const FashionFields = () => {
  const [categoryType, setCategoryType] = useState('clothing');
  const [targetGroup, setTargetGroup] = useState('adults');
  const [gender, setGender] = useState('womens');

  return (
    <div className="space-y-6">
      {/* Target Group Selection */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Target Age Group</h3>
          <RadioGroup 
            defaultValue={targetGroup} 
            onValueChange={setTargetGroup}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="adults" id="adults" />
              <Label htmlFor="adults" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Adults
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kids" id="kids" />
              <Label htmlFor="kids" className="flex items-center">
                <Baby className="h-4 w-4 mr-2" />
                Kids
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Fashion Category Type */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Category Type</h3>
          <Tabs defaultValue="clothing" onValueChange={setCategoryType} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="clothing" className="flex items-center justify-center">
                <Shirt className="h-4 w-4 mr-2" />
                Clothing
              </TabsTrigger>
              <TabsTrigger value="shoes" className="flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shoes
              </TabsTrigger>
              <TabsTrigger value="accessories" className="flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Accessories
              </TabsTrigger>
              <TabsTrigger value="beauty" className="flex items-center justify-center">
                <Scissors className="h-4 w-4 mr-2" />
                Beauty
              </TabsTrigger>
            </TabsList>

            {targetGroup === 'adults' && (categoryType === 'clothing' || categoryType === 'shoes' || categoryType === 'accessories') && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Gender</h4>
                <RadioGroup 
                  defaultValue={gender} 
                  onValueChange={setGender}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="womens" id="womens" />
                    <Label htmlFor="womens" className="flex items-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Women's
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mens" id="mens" />
                    <Label htmlFor="mens" className="flex items-center">
                      <UserRound className="h-4 w-4 mr-2" />
                      Men's
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Clothing Fields */}
            <TabsContent value="clothing">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clothing-type">Type</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="clothing-type">
                      <SelectValue placeholder="Select clothing type" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetGroup === 'adults' && gender === 'womens' && (
                        <>
                          <SelectItem value="dresses">Dresses</SelectItem>
                          <SelectItem value="tops">Tops</SelectItem>
                          <SelectItem value="blouses">Blouses</SelectItem>
                          <SelectItem value="skirts">Skirts</SelectItem>
                          <SelectItem value="pants">Pants</SelectItem>
                          <SelectItem value="jeans">Jeans</SelectItem>
                          <SelectItem value="activewear">Activewear</SelectItem>
                        </>
                      )}
                      {targetGroup === 'adults' && gender === 'mens' && (
                        <>
                          <SelectItem value="shirts">Shirts</SelectItem>
                          <SelectItem value="t-shirts">T-Shirts</SelectItem>
                          <SelectItem value="pants">Pants</SelectItem>
                          <SelectItem value="jeans">Jeans</SelectItem>
                          <SelectItem value="suits">Suits</SelectItem>
                          <SelectItem value="activewear">Activewear</SelectItem>
                        </>
                      )}
                      {targetGroup === 'kids' && (
                        <>
                          <SelectItem value="tops">Tops</SelectItem>
                          <SelectItem value="bottoms">Bottoms</SelectItem>
                          <SelectItem value="dresses">Dresses</SelectItem>
                          <SelectItem value="outerwear">Outerwear</SelectItem>
                          <SelectItem value="sleepwear">Sleepwear</SelectItem>
                          <SelectItem value="school-uniforms">School Uniforms</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Input type="text" id="size" placeholder="Item size" />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input type="text" id="color" placeholder="Item color" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input type="text" id="material" placeholder="Main material" />
                </div>
              </div>
            </TabsContent>

            {/* Shoes Fields */}
            <TabsContent value="shoes">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="shoe-type">Type</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="shoe-type">
                      <SelectValue placeholder="Select shoe type" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetGroup === 'adults' && gender === 'womens' && (
                        <>
                          <SelectItem value="heels">Heels</SelectItem>
                          <SelectItem value="flats">Flats</SelectItem>
                          <SelectItem value="boots">Boots</SelectItem>
                          <SelectItem value="sneakers">Sneakers</SelectItem>
                          <SelectItem value="sandals">Sandals</SelectItem>
                        </>
                      )}
                      {targetGroup === 'adults' && gender === 'mens' && (
                        <>
                          <SelectItem value="dress-shoes">Dress Shoes</SelectItem>
                          <SelectItem value="sneakers">Sneakers</SelectItem>
                          <SelectItem value="boots">Boots</SelectItem>
                          <SelectItem value="loafers">Loafers</SelectItem>
                          <SelectItem value="sandals">Sandals</SelectItem>
                        </>
                      )}
                      {targetGroup === 'kids' && (
                        <>
                          <SelectItem value="sneakers">Sneakers</SelectItem>
                          <SelectItem value="school-shoes">School Shoes</SelectItem>
                          <SelectItem value="boots">Boots</SelectItem>
                          <SelectItem value="sandals">Sandals</SelectItem>
                          <SelectItem value="sport-shoes">Sport Shoes</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shoe-size">Size</Label>
                    <Input type="text" id="shoe-size" placeholder="Shoe size" />
                  </div>
                  <div>
                    <Label htmlFor="shoe-color">Color</Label>
                    <Input type="text" id="shoe-color" placeholder="Shoe color" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shoe-material">Material</Label>
                  <Input type="text" id="shoe-material" placeholder="Main material" />
                </div>
              </div>
            </TabsContent>

            {/* Accessories Fields */}
            <TabsContent value="accessories">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accessory-type">Type</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="accessory-type">
                      <SelectValue placeholder="Select accessory type" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetGroup === 'adults' && gender === 'womens' && (
                        <>
                          <SelectItem value="bags">Bags</SelectItem>
                          <SelectItem value="jewelry">Jewelry</SelectItem>
                          <SelectItem value="watches">Watches</SelectItem>
                          <SelectItem value="belts">Belts</SelectItem>
                          <SelectItem value="hats">Hats</SelectItem>
                          <SelectItem value="scarves">Scarves</SelectItem>
                        </>
                      )}
                      {targetGroup === 'adults' && gender === 'mens' && (
                        <>
                          <SelectItem value="watches">Watches</SelectItem>
                          <SelectItem value="wallets">Wallets</SelectItem>
                          <SelectItem value="belts">Belts</SelectItem>
                          <SelectItem value="ties">Ties</SelectItem>
                          <SelectItem value="hats">Hats</SelectItem>
                          <SelectItem value="bags">Bags</SelectItem>
                        </>
                      )}
                      {targetGroup === 'kids' && (
                        <>
                          <SelectItem value="backpacks">Backpacks</SelectItem>
                          <SelectItem value="hats">Hats</SelectItem>
                          <SelectItem value="belts">Belts</SelectItem>
                          <SelectItem value="hair-accessories">Hair Accessories</SelectItem>
                          <SelectItem value="jewelry">Jewelry</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input type="text" id="brand" placeholder="Brand name" />
                </div>
                <div>
                  <Label htmlFor="accessory-material">Material</Label>
                  <Input type="text" id="accessory-material" placeholder="Main material" />
                </div>
              </div>
            </TabsContent>

            {/* Beauty Fields (Makeup and Hair) */}
            <TabsContent value="beauty">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="beauty-category">Category</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="beauty-category">
                      <SelectValue placeholder="Select beauty category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makeup">Makeup</SelectItem>
                      <SelectItem value="hair-products">Hair Products</SelectItem>
                      <SelectItem value="skincare">Skincare</SelectItem>
                      <SelectItem value="fragrance">Fragrance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="beauty-type">Type</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="beauty-type">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Makeup Types */}
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="eyeshadow">Eyeshadow</SelectItem>
                      <SelectItem value="mascara">Mascara</SelectItem>
                      <SelectItem value="lipstick">Lipstick</SelectItem>
                      <SelectItem value="blush">Blush</SelectItem>
                      <SelectItem value="concealer">Concealer</SelectItem>
                      <SelectItem value="nail-polish">Nail Polish</SelectItem>
                      
                      {/* Hair Product Types */}
                      <SelectItem value="shampoo">Shampoo</SelectItem>
                      <SelectItem value="conditioner">Conditioner</SelectItem>
                      <SelectItem value="styling-products">Styling Products</SelectItem>
                      <SelectItem value="hair-color">Hair Color</SelectItem>
                      <SelectItem value="hair-tools">Hair Tools</SelectItem>
                      <SelectItem value="hair-treatment">Hair Treatment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="beauty-brand">Brand</Label>
                  <Input type="text" id="beauty-brand" placeholder="Brand name" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Common Fields */}
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" placeholder="Fashion brand" />
      </div>
    </div>
  );
};

export default FashionFields;
