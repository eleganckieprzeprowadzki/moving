/**
 * Funkcje pomocnicze
 */

/**
 * Formatuj datę
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Formatuj datę i czas
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formatuj cenę
 */
export const formatPrice = (price) => {
  if (!price) return '0,00 zł';
  return `${parseFloat(price).toFixed(2).replace('.', ',')} zł`;
};

/**
 * Oblicz czas do deadline
 */
export const timeUntilDeadline = (deadline) => {
  if (!deadline) return '';
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate - now;

  if (diff < 0) {
    return 'Termin minął';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} dni ${hours} godz.`;
  } else if (hours > 0) {
    return `${hours} godz. ${minutes} min.`;
  } else {
    return `${minutes} min.`;
  }
};

/**
 * Walidacja email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Walidacja hasła (min. 8 znaków)
 */
export const validatePassword = (password) => {
  return password && password.length >= 8;
};

/**
 * Skróć tekst
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
