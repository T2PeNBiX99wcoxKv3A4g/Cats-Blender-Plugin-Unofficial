import { css, styled } from "styled-components";

/** Shared look of the two links in the hero. */
export const buttonBase = css`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1.1rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-weight: 600;
    font-size: 0.92rem;
    transition: transform var(--duration-fast) var(--ease-bounce),
        box-shadow var(--duration) var(--ease-out),
        background var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out);

    &:hover {
        text-decoration: none;
        background: var(--surface);
        transform: translateY(-2px);
        border-color: var(--accent);
    }

    &:active {
        transform: translateY(0) scale(0.97);
    }
`;

const primary = css`
    background: var(--accent);
    border-color: var(--accent);
    color: var(--text-on-accent);
    box-shadow: 0 4px 14px -6px rgba(245, 158, 11, 0.6);

    &:hover {
        background: var(--accent-strong);
        border-color: var(--accent-strong);
        box-shadow: 0 12px 26px -10px rgba(245, 158, 11, 0.9);
    }

    &:active {
        box-shadow: 0 4px 14px -6px rgba(245, 158, 11, 0.6);
    }
`;

// Transient prop (`$`) so styled-components does not forward it to the DOM.
export const ButtonLink = styled.a<{ $primary?: boolean }>`
    ${buttonBase}
    ${props => props.$primary && primary}
`;
