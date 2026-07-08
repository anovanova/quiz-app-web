import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

export interface DynamicInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  "type"
> {
  type: "text" | "password";
}

const DynamicInput = React.forwardRef<HTMLInputElement, DynamicInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    if (type === "password") {
      return (
        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn("pr-10", className)}
            ref={ref as React.Ref<HTMLInputElement>}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={props.disabled}
          >
            {showPassword ? (
              <EyeOff
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : (
              <Eye
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      );
    }

    return (
      <Input
        type={type}
        className={className}
        ref={ref as React.Ref<HTMLInputElement>}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  },
);

DynamicInput.displayName = "DynamicInput";

export { DynamicInput };
