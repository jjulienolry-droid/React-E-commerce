import React from "react";

export const Loader: React.FC<{ size?: "small" | "medium" | "large" }> = ({
    size = "medium",
}) =>
{
    return (
        <div className={`loader loader-${size}`}>
            <div className="spinner"></div>
        </div>
    );
};
