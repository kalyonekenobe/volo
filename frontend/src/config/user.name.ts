export const formatUserName = (firstName: string | null, lastName: string | null): string =>
  `${firstName || ''} ${lastName || ''}`;
