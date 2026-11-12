import Image from "next/image";

// Brand logo
export default function Logo({ light = false, className = "h-11" }: { light?: boolean; className?: string }) {
  return <Image src={light ? "/logo-light.png" : "/logo.png"} alt="Aura Interior Studio" width={1600} height={547} priority className={`w-auto ${className}`} />;
}
