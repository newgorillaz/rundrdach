import type { ReactNode } from "react";

/**
 * Wraps each line (split on existing <br>) in a mask for GSAP yPercent reveals.
 * Server Component — stable HTML, no client hydration of the walker itself.
 */
export function SplitLines({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // Flatten children into line chunks separated by <br>.
  const lines: ReactNode[] = [];
  const buffer: ReactNode[] = [];

  const flush = () => {
    if (!buffer.length) return;
    lines.push(
      <span className="line-mask" key={"line-" + lines.length}>
        <span className="line-inner">{buffer.splice(0)}</span>
      </span>,
    );
  };

  const walk = (node: ReactNode) => {
    if (node == null || typeof node === "boolean") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    // Detect <br /> elements by type string.
    if (
      typeof node === "object" &&
      "type" in node &&
      (node.type === "br" || (typeof node.type === "string" && node.type.toLowerCase() === "br"))
    ) {
      flush();
      return;
    }
    // Skip pure whitespace text nodes so SSR/client trees stay aligned.
    if (typeof node === "string" && !node.trim()) return;
    buffer.push(node);
  };

  walk(children);
  flush();

  return <span className={"split-lines" + (className ? " " + className : "")}>{lines}</span>;
}
