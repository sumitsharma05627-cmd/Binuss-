/**
 * WhatsApp Direct Dispatcher
 * Seamlessly opens WhatsApp directly without exposing phone numbers on intermediate web landing pages.
 */

export const WHATSAPP_DISPLAY_NAME = 'GWL WebLab';
export const WHATSAPP_PHONE_NUMBER = '917587939722';

export function getWhatsAppUrl(message: string = "Hello GWL WebLab, I would like to discuss a project."): string {
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;
}

export function openWhatsAppDirect(message: string = "Hello GWL WebLab, I would like to discuss a project."): void {
  const url = getWhatsAppUrl(message);
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Native mobile browser redirection to WhatsApp
    window.location.href = url;
  } else {
    // Desktop: opens WhatsApp Web / App directly in a clean tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
