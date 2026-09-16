import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function Photo({ src, alt, position = "center", sizes = "100vw", priority, className = "" }: Props) {
  return (
    <div className={`overflow-hidden ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <Image
        src={`/photos/${src}`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
