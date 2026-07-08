"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { DynamicInput } from "@/components/ui/custom/dynamicInput";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

const inputs = [
  {
    type: "text" as const,
    name: "username" as const,
    label: "Username",
    placeholder: "username123",
  },
  {
    type: "password" as const,
    name: "password" as const,
    label: "Password",
  },
];

export default function Login() {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(`Error: ${data.error}`);
      } else {
        redirect("/quiz");
      }
    },
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16  dark:bg-black sm:items-start">
        <Card className="w-full max-w-sm mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <CardHeader className="my-5 text-center">
              <CardTitle className="text-lg">
                <span className="font-bold">Login</span> to your account
              </CardTitle>
            </CardHeader>
            <CardContent className="mb-6">
              <FieldGroup>
                {inputs.map((item) => (
                  <form.Field name={item.name} key={item.name}>
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            {item.label}
                          </FieldLabel>
                          <DynamicInput
                            type={item.type}
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder={item.placeholder}
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                ))}
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button size="lg" type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
