import '@fontsource/inter/600.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/400.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import theme from '@/utils/chakra-theme';
import '../utils/overrides.css';
import { Cm2dProvider } from '@/utils/cm2d-provider';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { PublicLayout } from '@/layouts/PublicLayout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const getLayout = (children: ReactNode) => {
    if (router.pathname.startsWith('/bo')) {
      return <DashboardLayout>{children}</DashboardLayout>;
    } else {
      return <PublicLayout>{children}</PublicLayout>;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Cm2dProvider>{getLayout(<Component {...pageProps} />)}</Cm2dProvider>
    </ChakraProvider>
  );
}
