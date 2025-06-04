// CreateBookPage.jsx


import { CalendarIcon } from "lucide-react"
import Layout from "../../../component/Layout";

// Reusable UI Components
const Button = ({ children, className = "", variant = "", ...props }) => (
  <button className={`px-4 py-2 rounded ${variant === "outline" ? "border" : ""} ${className}`} {...props}>
    {children}
  </button>
);

const Input = ({ id, placeholder }) => (
  <input id={id} placeholder={placeholder} className="w-full p-2 border rounded" />
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
    {children}
  </label>
);

const Select = ({ defaultValue, children }) => (
  <div className="relative">
    <select defaultValue={defaultValue} className="w-full p-2 border rounded">
      {children}
    </select>
  </div>
);

const SelectTrigger = ({ children }) => <>{children}</>;
const SelectValue = ({ placeholder }) => <option disabled>{placeholder}</option>;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;




const FileUpload = ({ type }) => (
  <input type="file" accept={type === "image" ? "image/*" : ".pdf"} className="w-full" />
);

const TextEditor = () => (
  <textarea className="w-full p-2 border rounded h-40" placeholder="Enter book description..."></textarea>
);

export default function CreateBookPage() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col">



      <div className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Create Book</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="border rounded-md p-6 space-y-6">
              <h2 className="text-lg font-semibold">Book Information</h2>

              <div className="space-y-2">
                <Label htmlFor="cover">Cover Image</Label>
                <FileUpload type="image" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdf">Upload PDF</Label>
                <FileUpload type="pdf" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input id="title" placeholder="Enter book title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" placeholder="Enter ISBN" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Book Description</Label>
              <TextEditor />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="border rounded-md p-6 space-y-6">
              <h2 className="text-lg font-semibold">Writer</h2>

              <div className="space-y-2">
                <Label htmlFor="authors">Authors</Label>
                <div className="flex gap-2">
                  <Input id="authors" placeholder="Select authors" />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="translator">Translator</Label>
                <Input id="translator" placeholder="Select translator" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md p-6 space-y-6">
              <h2 className="text-lg font-semibold">Publishing Details</h2>

              <div className="space-y-2">
                <Label htmlFor="date">Publication Date</Label>
                <div className="relative">
                  <Input id="date" placeholder="yyyy / mm / dd" />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Input id="categories" placeholder="Select categories" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Delete Book
          </Button>
          <Button variant="outline">Cancel</Button>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            Save as Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Book
          </Button>
        </div>
      </div>
    </div>
    </Layout>
  );
}
