import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const BooksMoviesFields = () => {
  const [mediaType, setMediaType] = React.useState<string>('');
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="mediaType">Media Type</Label>
        <Select value={mediaType} onValueChange={setMediaType}>
          <SelectTrigger id="mediaType">
            <SelectValue placeholder="Select media type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="movies">Movies</SelectItem>
            <SelectItem value="music">Music</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {mediaType === 'movies' && (
        <>
          <div>
            <Label htmlFor="title">Movie Title</Label>
            <Input type="text" id="title" placeholder="Movie title" />
          </div>
          
          <div>
            <Label htmlFor="genre">Genre</Label>
            <Select>
              <SelectTrigger id="genre">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="horror">Horror</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
                <SelectItem value="animation">Animation</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="releaseYear">Release Year</Label>
            <Select>
              <SelectTrigger id="releaseYear">
                <SelectValue placeholder="Select release year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pre-1980">Before 1980</SelectItem>
                <SelectItem value="1980-1989">1980-1989</SelectItem>
                <SelectItem value="1990-1999">1990-1999</SelectItem>
                <SelectItem value="2000-2009">2000-2009</SelectItem>
                <SelectItem value="2010-2019">2010-2019</SelectItem>
                <SelectItem value="2020-present">2020-Present</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="format">Format</Label>
            <Select>
              <SelectTrigger id="format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dvd">DVD</SelectItem>
                <SelectItem value="blu-ray">Blu-ray</SelectItem>
                <SelectItem value="4k-uhd">4K UHD</SelectItem>
                <SelectItem value="digital">Digital Code</SelectItem>
                <SelectItem value="vhs">VHS</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="collectors" />
            <Label htmlFor="collectors" className="text-sm font-normal">Collector's Edition</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="boxset" />
            <Label htmlFor="boxset" className="text-sm font-normal">Box Set / Collection</Label>
          </div>
        </>
      )}
      
      {mediaType === 'books' && (
        // Existing book fields or placeholder
        <div>
          <Label htmlFor="bookTitle">Book Title</Label>
          <Input type="text" id="bookTitle" placeholder="Book title" />
        </div>
      )}
      
      {mediaType === 'music' && (
        // Existing music fields or placeholder
        <div>
          <Label htmlFor="albumTitle">Album Title</Label>
          <Input type="text" id="albumTitle" placeholder="Album title" />
        </div>
      )}
      
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
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BooksMoviesFields;
