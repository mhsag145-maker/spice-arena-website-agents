import { BUSINESS } from "@/data/menu";

export function waLink(text: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppButton() {
  return (
    <a
      href={waLink("Hello Spice Arena! I would like to ask about a reservation / order.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-whatsapp-foreground shadow-plate transition-all duration-300 hover:-translate-y-1 hover:px-5 hover:shadow-glow"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.47-1.87-.15-.3-.02-.47.13-.62.15-.15.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.06 4.37 2.47.97 2.97.78 3.51.73.54-.05 1.74-.71 1.98-1.4.25-.69.25-1.28.18-1.4-.08-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.02c0-5.19 4.23-9.41 9.42-9.41 2.52 0 4.88.98 6.65 2.76a9.34 9.34 0 0 1 2.76 6.66c0 5.19-4.23 9.42-9.42 9.42ZM20.5 3.49A11.8 11.8 0 0 0 12.04 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.59 5.96L0 24l6.3-1.65a11.87 11.87 0 0 0 5.74 1.46h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.17-3.45-8.41Z" />
      </svg>
      <span className="hidden text-xs font-semibold tracking-widest uppercase sm:inline">WhatsApp</span>
    </a>
  );
}
