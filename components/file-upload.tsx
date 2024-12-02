"use client"
import { FileIcon, X } from "lucide-react"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core"
import "@uploadthing/react/styles.css"

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}

const FileUpload: React.FC<FileUploadProps> = ({
    onChange,
    value,
    endpoint
}) => {

    const fileType = value?.split(".").pop()

    if(value && fileType !== "pdf"){
        return (
            <div className="relative h-20 w-20">
                <Image 
                    fill
                    src={value} 
                    alt="uploaded image" 
                    className="rounded-full"
                />
                <button onClick={() => onChange("")}
                     className="absolute top-0 right-0 bg-rose-500 test-white p-1 rounded-full"
                     type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    if(value && fileType === "pdf"){
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm font-medium text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {value}
                </a>
                <button onClick={() => onChange("")}
                     className="absolute -top-2 -right-2 bg-rose-500 test-white p-1 rounded-full"
                     type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res)=>{
        onChange(res?.[0].url)
      }}
      onUploadError={(err:Error) => {
        console.error(err)
        console.log("hoge")
      }}
    />
  )
}

export default FileUpload