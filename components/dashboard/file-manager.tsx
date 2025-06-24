"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, File, Download, Trash2, Search, FileText, ImageIcon, Archive, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileItem {
  id: string
  name: string
  type: "pdf" | "doc" | "image" | "archive"
  size: string
  uploadedBy: string
  uploadDate: string
  associatedUser: string
  downloadUrl?: string
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "company-profile.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "John Smith",
    uploadDate: "2024-01-20",
    associatedUser: "TechCorp Solutions",
    downloadUrl: "/files/company-profile.pdf",
  },
  {
    id: "2",
    name: "partnership-agreement.doc",
    type: "doc",
    size: "1.8 MB",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-01-18",
    associatedUser: "Digital Innovations Ltd",
    downloadUrl: "/files/partnership-agreement.doc",
  },
  {
    id: "3",
    name: "logo-assets.zip",
    type: "archive",
    size: "5.2 MB",
    uploadedBy: "Mike Chen",
    uploadDate: "2024-01-15",
    associatedUser: "StartupHub Inc",
    downloadUrl: "/files/logo-assets.zip",
  },
  {
    id: "4",
    name: "certification.pdf",
    type: "pdf",
    size: "1.1 MB",
    uploadedBy: "Lisa Brown",
    uploadDate: "2024-01-12",
    associatedUser: "Global Ventures",
    downloadUrl: "/files/certification.pdf",
  },
]

export function FileManager() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return

    Array.from(uploadedFiles).forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.includes("pdf")
          ? "pdf"
          : file.type.includes("doc")
            ? "doc"
            : file.type.includes("image")
              ? "image"
              : "archive",
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        uploadedBy: "Current User",
        uploadDate: new Date().toISOString().split("T")[0],
        associatedUser: "New Upload",
        downloadUrl: URL.createObjectURL(file),
      }

      setFiles((prev) => [newFile, ...prev])
    })

    toast({
      title: "Files uploaded successfully",
      description: `${uploadedFiles.length} file(s) have been uploaded.`,
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "doc":
        return FileText
      case "image":
        return ImageIcon
      case "archive":
        return Archive
      default:
        return File
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800"
      case "doc":
        return "bg-blue-100 text-blue-800"
      case "image":
        return "bg-green-100 text-green-800"
      case "archive":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDelete = (id: string) => {
    const fileName = files.find((f) => f.id === id)?.name
    setFiles((prev) => prev.filter((file) => file.id !== id))
    toast({
      title: "File deleted",
      description: `${fileName} has been removed from the system.`,
    })
  }

  const handleDownload = (file: FileItem) => {
    // Create a temporary download link
    const link = document.createElement("a")
    link.href = file.downloadUrl || "#"
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download started",
      description: `Downloading ${file.name}...`,
    })
  }

  const handleBulkDownload = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to download.",
        variant: "destructive",
      })
      return
    }

    selectedFiles.forEach((fileId) => {
      const file = files.find((f) => f.id === fileId)
      if (file) {
        handleDownload(file)
      }
    })

    toast({
      title: "Bulk download started",
      description: `Downloading ${selectedFiles.length} files...`,
    })
  }

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to delete.",
        variant: "destructive",
      })
      return
    }

    setFiles((prev) => prev.filter((file) => !selectedFiles.includes(file.id)))
    setSelectedFiles([])

    toast({
      title: "Files deleted",
      description: `${selectedFiles.length} files have been removed.`,
    })
  }

  const handleShare = (file: FileItem) => {
    navigator.clipboard.writeText(file.downloadUrl || "")
    toast({
      title: "Link copied",
      description: `Share link for ${file.name} copied to clipboard.`,
    })
  }

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map((f) => f.id))
    }
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.associatedUser.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>File Manager</CardTitle>
            <CardDescription>Manage uploaded files and documents</CardDescription>
          </div>
          <div className="flex space-x-2">
            {selectedFiles.length > 0 && (
              <>
                <Button variant="outline" onClick={handleBulkDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Selected ({selectedFiles.length})
                </Button>
                <Button variant="outline" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </>
            )}
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
            isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Files</h3>
          <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Choose Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
          />
        </div>

        {/* Files Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>File</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Associated User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <TableRow key={file.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <FileIcon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getFileTypeColor(file.type)}>{file.type.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.uploadedBy}</TableCell>
                    <TableCell>{file.associatedUser}</TableCell>
                    <TableCell>{new Date(file.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(file)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleShare(file)}>
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-8">
            <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-600">No files match your search criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
