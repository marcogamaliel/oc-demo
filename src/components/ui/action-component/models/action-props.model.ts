export type ActionProps = {
    key: string;
    label: string;
    icon?: string;
    onClick?: () => void;
    href?: string;
    color?: "primary" | "secondary" | "error" | "inherit" | "success" | "info" | "warning"
}
