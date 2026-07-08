"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const formSchema = z.object({
  Q1: z.string().min(1, "Answer is required").optional(),
  Q2: z.string().min(1, "Answer is required").optional(),
  Q3: z.string().min(1, "Answer is required").optional(),
  Q4: z.string().min(1, "Answer is required").optional(),
  Q5: z.string().min(1, "Answer is required").optional(),
  Q6: z.string().min(1, "Answer is required").optional(),
  Q7: z.string().min(1, "Answer is required").optional(),
  Q8: z.string().min(1, "Answer is required").optional(),
  Q9: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
  Q10: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
  Q11: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
  Q12: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Questions {
  data: Array<{
    id: keyof FormValues;
    type: string;
    question: string;
    choices?: string[];
  }>;
}

export default function QuizComponent({ data }: Questions) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      Q1: "",
      Q2: "",
      Q3: "",
      Q4: "",
      Q5: "",
      Q6: "",
      Q7: "",
      Q8: "",
      Q9: [],
      Q10: [],
      Q11: [],
      Q12: [],
    } as FormValues,

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await fetch("/api/grade", {
        method: "POST",
        body: JSON.stringify(value),
      });

      if (response.status !== 200) {
        toast.error(`Error ${response.status}`);
      }

      const resData = await response.json();
      const queryString = new URLSearchParams({
        data: JSON.stringify(resData),
      }).toString();
      router.push(`/grade?${queryString}`, { scroll: false });
    },
  });

  return (
    <div className="w-full">
      <form
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {data.map((item) => {
            return (
              /* FIX: Nesting the render function as proper JSX children */
              <form.Field key={item.id} name={item.id}>
                {(field) =>
                  inputType(item.type, field, item.question, item?.choices)
                }
              </form.Field>
            );
          })}
        </FieldGroup>
        <div className="w-full flex flex-row-reverse pt-8">
          <Button size="lg" type="submit" form="form">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

function inputType(
  type: string,
  field: any,
  question: string,
  choices: string[] | undefined,
) {
  const errors = field.state.meta.errors;
  const isInvalid = errors.length > 0;
  const mappedErrors = errors.map((err: any) => ({
    message: err?.message || err,
  }));

  if (type === "text") {
    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>{question}</FieldLabel>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value ?? ""}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder="Answer"
          autoComplete="off"
        />
        {isInvalid && <FieldError errors={mappedErrors} />}
      </Field>
    );
  }

  if (type === "radio") {
    return (
      <FieldSet>
        <FieldLegend variant="label">{question}</FieldLegend>
        <RadioGroup
          name={field.name}
          value={field.state.value ?? ""}
          onValueChange={(value) => field.handleChange(value)}
        >
          {choices!.map((item, index) => {
            return (
              <Field key={index} orientation="horizontal">
                <RadioGroupItem aria-invalid={isInvalid} value={item} />
                <FieldLabel htmlFor={item} className="font-normal">
                  {item}
                </FieldLabel>
              </Field>
            );
          })}
        </RadioGroup>
        {isInvalid && <FieldError errors={mappedErrors} />}
      </FieldSet>
    );
  }

  const currentValue = (field.state.value as string[]) || [];

  return (
    <FieldSet>
      <FieldLegend variant="label">
        {question}
        <i className="font-light"> (Select all that apply)</i>
      </FieldLegend>
      <FieldGroup data-slot="checkbox-group">
        {choices!.map((item, index) => {
          return (
            <Field
              key={index}
              orientation="horizontal"
              data-invalid={isInvalid}
            >
              <Checkbox
                id={`${field.name}-${index}`}
                name={field.name}
                aria-invalid={isInvalid}
                checked={currentValue.includes(item)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...currentValue, item]
                    : currentValue.filter((value) => value !== item);
                  field.handleChange(newValue);
                }}
              />
              <FieldLabel
                htmlFor={`${field.name}-${index}`}
                className="font-normal"
              >
                {item}
              </FieldLabel>
            </Field>
          );
        })}
      </FieldGroup>
      {isInvalid && <FieldError errors={mappedErrors} />}
    </FieldSet>
  );
}
