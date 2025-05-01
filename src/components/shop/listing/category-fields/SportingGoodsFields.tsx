
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SportingGoodsFields = () => {
  const [sportingType, setSportingType] = React.useState<string>('');
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="sportingType">Category Type</Label>
        <Select value={sportingType} onValueChange={setSportingType}>
          <SelectTrigger id="sportingType">
            <SelectValue placeholder="Select sporting goods type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equipment">Sporting Equipment</SelectItem>
            <SelectItem value="clothes">Sporting Clothes</SelectItem>
            <SelectItem value="accessories">Sporting Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {sportingType === 'equipment' && (
        <div>
          <Label htmlFor="equipmentType">Equipment Type</Label>
          <Select>
            <SelectTrigger id="equipmentType">
              <SelectValue placeholder="Select equipment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team-sports">Team Sports</SelectItem>
              <SelectItem value="exercise-fitness">Exercise & Fitness</SelectItem>
              <SelectItem value="golf">Golf</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
              <SelectItem value="water-sports">Water Sports</SelectItem>
              <SelectItem value="winter-sports">Winter Sports</SelectItem>
              <SelectItem value="camping-hiking">Camping & Hiking</SelectItem>
              <SelectItem value="racquet-sports">Racquet Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {sportingType === 'clothes' && (
        <div>
          <Label htmlFor="clothingType">Clothing Type</Label>
          <Select>
            <SelectTrigger id="clothingType">
              <SelectValue placeholder="Select clothing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="athletic-shirts">Athletic Shirts</SelectItem>
              <SelectItem value="pants-shorts">Pants & Shorts</SelectItem>
              <SelectItem value="jackets">Jackets</SelectItem>
              <SelectItem value="swimwear">Swimwear</SelectItem>
              <SelectItem value="team-uniforms">Team Uniforms</SelectItem>
              <SelectItem value="athletic-shoes">Athletic Shoes</SelectItem>
              <SelectItem value="sports-bras">Sports Bras</SelectItem>
              <SelectItem value="athletic-socks">Athletic Socks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {sportingType === 'accessories' && (
        <div>
          <Label htmlFor="accessoryType">Accessory Type</Label>
          <Select>
            <SelectTrigger id="accessoryType">
              <SelectValue placeholder="Select accessory type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="water-bottles">Water Bottles</SelectItem>
              <SelectItem value="sports-bags">Sports Bags</SelectItem>
              <SelectItem value="fitness-trackers">Fitness Trackers</SelectItem>
              <SelectItem value="protective-gear">Protective Gear</SelectItem>
              <SelectItem value="training-aids">Training Aids</SelectItem>
              <SelectItem value="sports-sunglasses">Sports Sunglasses</SelectItem>
              <SelectItem value="hats-headwear">Hats & Headwear</SelectItem>
              <SelectItem value="sports-watches">Sports Watches</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" placeholder="Equipment brand" />
      </div>
      
      <div>
        <Label htmlFor="condition">Condition</Label>
        <Select>
          <SelectTrigger id="condition">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="used">Used</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SportingGoodsFields;
