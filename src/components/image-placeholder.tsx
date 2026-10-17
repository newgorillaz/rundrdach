import Image, { type StaticImageData } from "next/image";

type ImagePlaceholderProps = {
  label?: string;
  number?: string;
  className?: string;
  /** Path string or static import from the gallery registry. */
  src?: string | StaticImageData;
  alt?: string;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  /** Preload LCP heroes (Next 16 replacement for priority). */
  preload?: boolean;
  /** CSS object-position for intentional cropping. */
  objectPosition?: string;
  /** Image quality; must be listed in next.config images.qualities. */
  quality?: number;
};

/**
 * Renders a real project photo when src is set; otherwise the branded placeholder drawing.
 * Static imports enable blur placeholders and correct intrinsic dimensions.
 */
export function ImagePlaceholder({
  label = "Dacharbeiten in Wien",
  number = "01",
  className = "",
  src,
  alt = "",
  sizes = "(max-width: 760px) 100vw, 50vw",
  preload = false,
  objectPosition,
  quality = 75,
}: ImagePlaceholderProps) {
  if (src) {
    const isStatic = typeof src !== "string";
    return (
      <div className={"image-placeholder has-image " + className}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          // preload only for above-the-fold heroes; below-the-fold stays lazy.
          preload={preload}
          placeholder={isStatic ? "blur" : undefined}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    );
  }

  return (
    <div className={"image-placeholder " + className} role="img" aria-label={"Bildplatzhalter: " + label}>
      <div className="placeholder-top">
        <span>BILDFLÄCHE</span>
        <span>{number} / RD</span>
      </div>
      <svg className="roof-drawing" viewBox="0 0 500 400" fill="none" aria-hidden="true">
        <path d="M25 239 226 96l249 166-202 98L25 239Z" stroke="currentColor" strokeWidth="1" />
        <path d="m226 96 47 264M25 239v39l248 108 202-94v-30M273 360v26" stroke="currentColor" strokeWidth="1" />
        <path d="m65 211 243 132m-202-161 240 142M146 153l239 153M186 124l238 164" stroke="currentColor" strokeWidth=".6" />
        <path d="m51 252 209-132M89 271 294 145M132 291l198-122M175 313l192-120M218 333l186-117" stroke="currentColor" strokeWidth=".6" />
        <path d="M11 302 225 150l270 178M11 302v10M495 328v10" stroke="currentColor" strokeWidth=".5" strokeDasharray="4 5" />
        <path d="M77 114h70M112 79v70M387 356h70M422 321v70" stroke="currentColor" strokeWidth=".5" />
      </svg>
      <div className="placeholder-bottom">
        <span>{label}</span>
        <span>
          FOTO ERGÄNZEN <span aria-hidden="true">↗</span>
        </span>
      </div>
    </div>
  );
}
