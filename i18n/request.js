import { getRequestConfig } from 'next-intl/server';
import { getTranslations } from '@/lib/translations/server';

export default getRequestConfig(async ({ locale }) => {
    // Ensure locale is defined, fallback to 'en' if undefined
    const validLocale = locale || 'en';

    // Fetch translations from Firestore with caching
    const messages = await getTranslations(validLocale);

    return {
        locale: validLocale,
        messages
    };
});
