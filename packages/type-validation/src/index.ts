import { z } from "zod";

const InputProps = z.object({
  username: z.string().min(1).max(20).email(),
  password: z.string().min(1).max(20),
});

type InputPropsType = z.infer<typeof InputProps>;

const CourseProps = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(100),
  price: z.number().min(0),
  imageLink: z.string().min(1),
  published: z.boolean(),
});

type CoursePropsType = z.infer<typeof CourseProps>;

export { InputProps, CourseProps, InputPropsType, CoursePropsType };
