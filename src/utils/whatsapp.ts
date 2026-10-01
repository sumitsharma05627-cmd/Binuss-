/**
 * WhatsApp Direct Dispatcher
 * Seamlessly opens WhatsApp directly without exposing phone numbers on intermediate web landing pages.
 */

export const WHATSAPP_DISPLAY_NAME = 'GWL WebLab';
export const WHATSAPP_PHONE_NUMBER = '919755061139';

export function openWhatsAppDirect(message: string = "Hello GWL WebLab, I would like to discuss a project."): void {
  const encodedText = encodeURIComponent(message);
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Deep-link into native WhatsApp application.
    // This directly opens the conversation inside WhatsApp without displaying
    // the intermediate wa.me web screen that displays raw phone numbers.
    window.location.href = `whatsapp://send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodedText}`;

    // Graceful fallback if native app is not detected
    setTimeout(() => {
      window.open(
        `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodedText}`,
        '_blank',
        'noopener,noreferrer'
      );
    }, 1200);
  } else {
    // On desktop, launch WhatsApp Web directly into the chat session
    window.open(
      `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodedText}`,
      '_blank',
      'noopener,noreferrer'
    );
  }
}
