import * as z from "zod"
export const UserValidation = z.object({
  id: z.string().nonempty(),
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "minimum 3 letters!" })
    .max(20, { message: "maximum 20 letters!" }),
  username: z
    .string()
    .min(3, { message: "minimum 3 letters!" })
    .max(20, { message: "maximum 20 letters!" }),
  bio: z
    .string()
    .min(3, { message: "minimum 3 letters!" })
    .max(500, { message: "maximum 500 letters!" }),
})
