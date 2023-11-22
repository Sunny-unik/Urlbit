export function escapeHTML(input: string) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}