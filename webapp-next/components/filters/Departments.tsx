import { useDepartments } from '@/utils/api';
import { Filters } from '@/utils/cm2d-provider';
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { MenuSubTitle } from '../layouts/MenuSubTitle';
import { departmentRefs } from '@/utils/tools';

type Departments = {
  id: number;
  label: string;
}[];

type Props = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const FiltersDepartments = (props: Props) => {
  const { filters, setFilters } = props;
  const { data } = useDepartments();

  if (!data) return <>...</>;

  const departments: Departments = data.result.hits.hits.map((d: any) => ({
    id: d._id,
    label: d._source.department.toString()
  }));

  return (
    <Box>
      <MenuSubTitle title="Département du décès" />
      <Flex gap={4} flexDirection="column" wrap="wrap">
        {departments.map(department => (
          <Checkbox
            key={department.id}
            borderColor="primary.500"
            colorScheme="primary"
            value={department.label}
            isChecked={filters.department.includes(department.label)}
            onChange={e => {
              if (e.target.checked) {
                setFilters({
                  ...filters,
                  department: [...filters.department, e.target.value]
                });
              } else {
                setFilters({
                  ...filters,
                  department: [
                    ...filters.department.filter(f => f !== e.target.value)
                  ]
                });
              }
            }}
          >
            <Text
              as={filters.department.includes(department.label) ? 'b' : 'span'}
              textTransform="capitalize"
            >
              {department.label in departmentRefs
                ? `${
                    departmentRefs[
                      department.label as keyof typeof departmentRefs
                    ]
                  } (${department.label})`
                : `Inconnu (${department.label})`}
            </Text>
          </Checkbox>
        ))}
      </Flex>
    </Box>
  );
};
