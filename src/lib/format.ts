export function getHandle(fullName: string): string {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0) return '';
    const first = parts[0];
    const last = parts[parts.length - 1];
    return `${last}.${first}`.toLowerCase();
}
