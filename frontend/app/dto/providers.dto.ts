import { z } from 'zod'

const RateDTO = z.object({
  comment: z.string().min(10),
  rate: z.number().min(1, 'The minimum rating is a star'),
})

export { RateDTO }
