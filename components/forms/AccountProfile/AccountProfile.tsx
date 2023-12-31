"use client"
import React, { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidation } from "@/lib/valodations/user"
import Image from "next/image"
import { User } from "@clerk/nextjs/server"
import { Textarea } from "@/components/ui/textarea"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { updateUser } from "@/lib/actions/user.actions"
import { usePathname, useRouter } from "next/navigation"

interface AccountProfileProps {
  user: User | null
  btnTitle: string
}
const AccountProfile: React.FC<AccountProfileProps> = ({ user, btnTitle }) => {
  console.log(user)

  const [files, setFiles] = useState<File[]>([]) //?
  const { startUpload } = useUploadThing("media")
  const fileReader = new FileReader()
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.imageUrl || "",
      name: user?.firstName || "",
      username: user?.username || "",
      bio: "",
      id: user?.id || "",
    },
  })

  //?
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))
      if (!file.type.includes("image")) return
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ""

        fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    }
  }
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo //?

    const hasImageChanged = isBase64Image(blob)
    if (hasImageChanged) {
      const imgRes = await startUpload(files)
      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl
      }
    }

    await updateUser({
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      userId: user?.id || "",
      path: pathname,
    })
    if (pathname === "/profile/edit") {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile photo'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile photo'
                    width={24}
                    height={24}
                    className=' object-contain '
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  placeholder='Upload a photo'
                  type='file'
                  accept='image/*'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col  w-full gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your name'
                  type='text'
                  className='account-form-input no-focus'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your username'
                  type='text'
                  className='account-form-input no-focus'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder='Bio'
                  className='account-form-input no-focus'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          onClick={() => onSubmit}
          type='submit'
          className='bg-primary-500 w-full'>
          {btnTitle}
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfile
