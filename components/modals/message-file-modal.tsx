"use client"

import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import qs from "query-string"

import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form";  // useForm を正しくインポート
import FileUpload from "../file-upload"
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"

const formSchema = z.object({
    fileUrl: z.string().min(1, { message: "Attachment is required" }),
})

export const MessageFileModal = () => {

    const { isOpen, onClose, type, data} = useModal()    

    const { apiUrl, query } = data

    const router = useRouter()

    const isModalOpen = isOpen && type === "messageFile"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          const url = qs.stringifyUrl({
            url: apiUrl || "",
            query
          })
          await axios.post(url, {
            ...values,
            content: values.fileUrl,
          })

          form.reset()
          router.refresh()
          handleClose()
        } catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-center">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                  control={form.control} 
                                  name="fileUrl" 
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <FileUpload 
                                          endpoint="messageFile"
                                          value={field.value}
                                          onChange={field.onChange}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button type="submit" variant={"primary"} disabled={isLoading}>Send</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}