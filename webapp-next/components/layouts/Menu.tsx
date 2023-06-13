import { Box, Flex, Image, Spacer, Stack } from '@chakra-ui/react';
import { Cm2dContext, baseFilters } from '@/utils/cm2d-provider';
import { useContext } from 'react';
import { FiltersAges } from '../filters/Ages';
import { FilterCauses } from '../filters/Causes';
import { FiltersDeathLocations } from '../filters/DeathLocations';
import { FiltersSexes } from '../filters/Sexes';
import { MenuTitle } from './MenuTitle';
import { SubMenu } from './SubMenu';
import { MenuLinks } from './MenuLinks';
import { UserCard } from './UserCard';
import { FilterDates } from '../filters/Dates';
import { FiltersDepartments } from '../filters/Departments';
import cookie from 'js-cookie';
import { hasAtLeastOneFilter, ELASTIC_API_KEY_NAME } from '@/utils/tools';

export const ageRanges = [
  { from: 0, to: 10, key: '0-10 ans' },
  { from: 11, to: 20, key: '11-20 ans' },
  { from: 21, to: 30, key: '21-30 ans' },
  { from: 31, to: 40, key: '31-40 ans' },
  { from: 41, to: 50, key: '41-50 ans' },
  { from: 51, to: 60, key: '51-60 ans' },
  { from: 61, to: 70, key: '61-70 ans' },
  { from: 71, key: '71 ans et +' }
];

export function Menu() {
  const context = useContext(Cm2dContext);

  if (!context) {
    throw new Error('Menu must be used within a Cm2dProvider');
  }

  const { filters, setFilters, user } = context;

  return (
    <Flex
      flexDir={'column'}
      pt={8}
      borderRadius={16}
      bg="white"
      w={88}
      minH={'calc(100vh - 2.5rem)'}
      position="sticky"
      top={0}
      boxShadow="0px 8px 15px -4px rgba(36, 108, 249, 0.08), 0px 4px 6px -2px rgba(36, 108, 249, 0.08);"
    >
      <Box pl={4} px={6}>
        <Image src="/CM2D.svg" alt="CM2D Logo" w={24} />
      </Box>
      <Box mt={5} h="3px" w="full" bg="gray.50" />
      <Box mt={10} px={6}>
        <MenuTitle title="Cause de décès" />
        <FilterCauses />
      </Box>
      <Box mt={10} px={6}>
        <MenuTitle title="Période" />
        <FilterDates />
      </Box>
      <Box mt={10} px={6}>
        <MenuTitle
          title="Filtres"
          button={
            hasAtLeastOneFilter(filters)
              ? {
                  label: 'Réinitialiser',
                  onClick: () => {
                    setFilters({
                      ...baseFilters,
                      categories_level_1: filters.categories_level_1,
                      start_date: filters.start_date,
                      end_date: filters.end_date
                    });
                  }
                }
              : undefined
          }
        />
        <SubMenu
          title={
            <>
              Données
              <br />
              sociodémographiques
            </>
          }
          icon={{
            src: 'icons/user-search-blue.svg',
            srcOpen: 'icons/user-search.svg',
            alt: 'Onglet démographie'
          }}
        >
          <Stack dir="column" spacing={4}>
            <FiltersSexes />
            <FiltersAges ages={ageRanges} />
          </Stack>
        </SubMenu>
        <SubMenu
          title={
            <>
              Autres données
              <br />
              certifiées
            </>
          }
          icon={{
            src: 'icons/file-list-search-blue.svg',
            srcOpen: 'icons/file-list-search.svg',
            alt: 'Onglet données du décès'
          }}
        >
          <Stack dir="column" spacing={4}>
            <FiltersDeathLocations />
            <FiltersDepartments />
          </Stack>
        </SubMenu>
      </Box>
      <Box mt="auto">
        <Box px={6}>
          <MenuLinks
            links={[
              {
                label: 'Réglages',
                icon: '/icons/settings.svg',
                link: '/'
              },
              {
                label: 'Mentions légales',
                icon: '/icons/about-circle.svg',
                link: '/legals/mentions-legales'
              },
              {
                label: 'Déconnexion',
                icon: '/icons/log-out.svg',
                onClick: () => {
                  cookie.remove(ELASTIC_API_KEY_NAME);
                },
                link: '/'
              }
            ]}
          />
        </Box>
        <UserCard
          user={user}
        />
      </Box>
    </Flex>
  );
}
