import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "medium",
    loading = false,
    disabled,
    children,
    ...props
}) =>
{
    return (
        <button
            className={`btn btn-${variant} btn-${size}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? "Chargement..." : children}
        </button>
    );
};
